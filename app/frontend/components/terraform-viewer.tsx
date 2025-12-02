"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Code2, FileCode } from "lucide-react"

type TerraformBlock = {
  id: string
  title: string
  code: string
  explanation: string
}

const terraformBlocks: TerraformBlock[] = [
  {
    id: "provider",
    title: "AWS Provider",
    code: `provider "aws" {
  region = "us-west-2"
}`,
    explanation: "Configures the AWS provider to deploy resources in the US West (Oregon) region. This tells Terraform which cloud provider to use and where to create the infrastructure."
  },
  {
    id: "vpc",
    title: "VPC Resource",
    code: `resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "devops-project-5"
  }
}`,
    explanation: "Creates the Virtual Private Cloud (VPC) with a CIDR block of 10.0.0.0/16, providing 65,536 IP addresses. DNS support and hostnames are enabled to allow instances to resolve domain names and be assigned DNS hostnames within the VPC."
  },
  {
    id: "subnets",
    title: "Public and Private Subnets",
    code: `resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-west-2a"

  tags = {
    Name = "devops-project-5-public-subnet"
  }
}

resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-west-2a"

  tags = {
    Name = "devops-project-5-private-subnet"
  }
}`,
    explanation: "Creates two subnets in the same Availability Zone (us-west-2a). The Public subnet (10.0.1.0/24) automatically assigns public IPs to instances launched in it. The Private subnet (10.0.2.0/24) does not assign public IPs, keeping instances isolated from direct internet access."
  },
  {
    id: "igw",
    title: "Internet Gateway",
    code: `resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "devops-project-5-igw"
  }
}`,
    explanation: "Attaches an Internet Gateway to the VPC. This allows resources in public subnets to communicate with the internet, enabling both inbound and outbound internet traffic for publicly accessible instances."
  },
  {
    id: "nat",
    title: "NAT Gateway & Elastic IP",
    code: `resource "aws_eip" "nat_ip" {
  domain = "vpc"
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_ip.id
  subnet_id     = aws_subnet.public.id

  tags = {
    Name = "devops-project-5-nat"
  }
}`,
    explanation: "Creates an Elastic IP and a NAT Gateway in the public subnet. This allows instances in the private subnet to initiate outbound connections to the internet (e.g., for software updates) while preventing unsolicited inbound connections, maintaining security."
  },
  {
    id: "route_tables",
    title: "Route Tables",
    code: `resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "devops-project-5-public-rt"
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }

  tags = {
    Name = "devops-project-5-private-rt"
  }
}`,
    explanation: "Configures routing tables for both subnets. The public route table directs all internet-bound traffic (0.0.0.0/0) to the Internet Gateway. The private route table routes internet-bound traffic through the NAT Gateway, enabling outbound access while maintaining security."
  },
  {
    id: "route_associations",
    title: "Route Table Associations",
    code: `resource "aws_route_table_association" "public_assoc" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private_assoc" {
  subnet_id      = aws_subnet.private.id
  route_table_id = aws_route_table.private.id
}`,
    explanation: "Associates the route tables with their respective subnets. This ensures that traffic from the public subnet uses the public route table (via Internet Gateway) and traffic from the private subnet uses the private route table (via NAT Gateway)."
  },
  {
    id: "frontend_sg",
    title: "Frontend Security Group",
    code: `resource "aws_security_group" "frontend_sg" {
  name   = "frontend-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow Next.js"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "frontend-sg"
  }
}`,
    explanation: "Defines firewall rules for the frontend instance. Allows inbound HTTP (80), HTTPS (443), Next.js (3000), and SSH (22) from anywhere on the internet. Allows all outbound traffic. This makes the frontend publicly accessible while maintaining control over which ports are open."
  },
  {
    id: "backend_sg",
    title: "Backend Security Group",
    code: `resource "aws_security_group" "backend_sg" {
  name   = "backend-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    description     = "Allow backend requests from frontend SG"
    from_port       = 8000
    to_port         = 8000
    protocol        = "tcp"
    security_groups = [aws_security_group.frontend_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "backend-sg"
  }
}`,
    explanation: "Defines strict firewall rules for the backend instance. ONLY accepts traffic on port 8000 from instances in the frontend security group. This implements the principle of least privilege - the backend is completely isolated from the internet and can only be accessed by the frontend, ensuring maximum security."
  },
  {
    id: "backend_instance",
    title: "Backend EC2 Instance",
    code: `resource "aws_instance" "backend" {
  ami                    = "ami-0892d3c7ee96c0bf7"
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.private.id
  private_ip             = "10.0.2.20"
  vpc_security_group_ids = [aws_security_group.backend_sg.id]

  user_data = file("user_data_backend.sh")

  tags = {
    Name = "backend-server"
  }
}`,
    explanation: "Launches the backend EC2 instance in the private subnet with a static private IP (10.0.2.20). Has no public IP address, making it completely isolated from direct internet access. The user_data script automatically installs Python, FastAPI dependencies, and starts the backend API on boot. Only accessible from the frontend instance via port 8000."
  },
  {
    id: "frontend_instance",
    title: "Frontend EC2 Instance",
    code: `resource "aws_instance" "frontend" {
  depends_on = [
    aws_instance.backend
  ]

  ami                    = "ami-0892d3c7ee96c0bf7"
  instance_type          = "t2.small"
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.frontend_sg.id]

  user_data = file("user_data_frontend.sh")

  tags = {
    Name = "frontend-server"
  }
}`,
    explanation: "Launches the frontend EC2 instance in the public subnet using Amazon Linux 2023 AMI. Uses t2.small instance type for better performance. Explicitly depends on the backend instance ensuring the backend is ready before the frontend starts. The user_data script automatically installs Node.js, clones the repository, and starts the Next.js application on boot."
  }
]

export function TerraformViewer() {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null)

  return (
    <motion.div
      className="w-full my-6 md:my-8 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="lg:col-span-2">
        <Card className="bg-slate-950 border-slate-800 h-[400px] md:h-[600px] flex flex-col">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="text-white flex items-center gap-2 text-base md:text-lg">
              <FileCode className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
              <span className="text-purple-400">main.tf</span> Code Viewer
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">Hover over code blocks to understand their purpose.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full w-full">
              <div className="p-3 md:p-4 space-y-3 md:space-y-4 font-mono text-[10px] md:text-sm">
                {terraformBlocks.map((block) => (
                  <motion.div
                    key={block.id}
                    onMouseEnter={() => setHoveredBlock(block.id)}
                    onMouseLeave={() => setHoveredBlock(null)}
                    className={`
                      p-3 md:p-4 rounded-md border transition-all duration-200 cursor-help
                      ${hoveredBlock === block.id
                        ? "bg-slate-900 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                        : "bg-slate-950 border-transparent hover:bg-slate-900/50 hover:border-slate-800"}
                    `}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-slate-500 mb-1 text-[9px] md:text-xs select-none"># {block.title}</div>
                    <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap text-[10px] md:text-sm leading-relaxed">
                      {block.code}
                    </pre>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-4 md:top-8">
          <AnimatePresence mode="wait">
            {hoveredBlock ? (
              <motion.div
                key={hoveredBlock}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-slate-900 border-blue-500/50 shadow-lg">
                  <CardHeader className="pb-3 md:pb-4">
                    <CardTitle className="text-blue-400 flex items-center gap-2 text-sm md:text-base">
                      <Code2 className="w-4 h-4 md:w-5 md:h-5" />
                      {terraformBlocks.find(b => b.id === hoveredBlock)?.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 leading-relaxed text-xs md:text-sm">
                      {terraformBlocks.find(b => b.id === hoveredBlock)?.explanation}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center p-6 md:p-8 text-slate-600 border-2 border-dashed border-slate-800 rounded-lg"
              >
                <div className="text-center">
                  <p className="text-xs md:text-sm">Hover over the code blocks to see detailed explanations here.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
