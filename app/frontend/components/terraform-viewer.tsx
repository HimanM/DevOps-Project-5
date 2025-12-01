"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Info } from "lucide-react"

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
        explanation: "Configures the AWS provider to deploy resources in the US West (Oregon) region."
    },
    {
        id: "vpc",
        title: "VPC Resource",
        code: `resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "devops-project-5"
  }
}`,
        explanation: "Creates the Virtual Private Cloud (VPC) with a CIDR block of 10.0.0.0/16, providing 65,536 IP addresses. DNS support is enabled for hostname resolution."
    },
    {
        id: "subnets",
        title: "Subnets",
        code: `resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone = "us-west-2a"
  tags = { Name = "devops-project-5-public-subnet" }
}

resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-west-2a"
  tags = { Name = "devops-project-5-private-subnet" }
}`,
        explanation: "Defines two subnets in the same Availability Zone. The Public subnet (10.0.1.0/24) assigns public IPs automatically. The Private subnet (10.0.2.0/24) does not."
    },
    {
        id: "igw",
        title: "Internet Gateway",
        code: `resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
  tags = { Name = "devops-project-5-igw" }
}`,
        explanation: "Attaches an Internet Gateway to the VPC, allowing communication between instances in public subnets and the internet."
    },
    {
        id: "nat",
        title: "NAT Gateway",
        code: `resource "aws_eip" "nat_ip" {
  domain = "vpc"
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_ip.id
  subnet_id     = aws_subnet.public.id
  tags = { Name = "devops-project-5-nat" }
}`,
        explanation: "Sets up a NAT Gateway in the Public Subnet with an Elastic IP. This allows instances in the Private Subnet to initiate outbound traffic (e.g., for updates) without accepting inbound connections."
    },
    {
        id: "routes",
        title: "Route Tables",
        code: `resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }
}`,
        explanation: "Configures routing. Public subnet traffic goes to the Internet Gateway. Private subnet traffic goes to the NAT Gateway."
    },
    {
        id: "security_groups",
        title: "Security Groups",
        code: `resource "aws_security_group" "frontend_sg" {
  name        = "frontend-sg"
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # ... (443 and 22 also allowed)
}

resource "aws_security_group" "backend_sg" {
  name   = "backend-sg"
  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    security_groups = [aws_security_group.frontend_sg.id]
  }
}`,
        explanation: "Defines firewall rules. Frontend accepts HTTP/HTTPS from anywhere. Backend ONLY accepts traffic on port 8000 from the Frontend Security Group."
    },
    {
        id: "instances",
        title: "EC2 Instances",
        code: `resource "aws_instance" "frontend" {
  ami                    = "ami-0892d3c7ee96c0bf7"
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.frontend_sg.id]
  user_data              = file("user_data_frontend.sh")

  tags = { Name = "frontend-server" }
}

resource "aws_instance" "backend" {
  ami                    = "ami-0892d3c7ee96c0bf7"
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.private.id
  private_ip             = "10.0.2.20"
  vpc_security_group_ids = [aws_security_group.backend_sg.id]
  user_data              = file("user_data_backend.sh")

  tags = { Name = "backend-server" }
}`,
        explanation: "Launches EC2 instances with specific Security Groups and User Data scripts. 'user_data' scripts automatically install dependencies (Node.js, Python/FastAPI) and start the applications on boot."
    }
]

export function TerraformViewer() {
    const [hoveredBlock, setHoveredBlock] = useState<string | null>(null)

    return (
        <div className="w-full my-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card className="bg-slate-950 border-slate-800 h-[600px] flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <span className="text-purple-400">main.tf</span> Code Viewer
                        </CardTitle>
                        <CardDescription>Hover over code blocks to understand their purpose.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-hidden p-0">
                        <ScrollArea className="h-full w-full">
                            <div className="p-4 space-y-4 font-mono text-sm">
                                {terraformBlocks.map((block) => (
                                    <div
                                        key={block.id}
                                        onMouseEnter={() => setHoveredBlock(block.id)}
                                        onMouseLeave={() => setHoveredBlock(null)}
                                        className={`
                      p-4 rounded-md border transition-all duration-200 cursor-help
                      ${hoveredBlock === block.id
                                                ? "bg-slate-900 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                                                : "bg-slate-950 border-transparent hover:bg-slate-900/50 hover:border-slate-800"}
                    `}
                                    >
                                        <div className="text-slate-500 mb-1 text-xs select-none"># {block.title}</div>
                                        <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap">
                                            {block.code}
                                        </pre>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-1">
                <div className="sticky top-8">
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
                                    <CardHeader>
                                        <CardTitle className="text-blue-400 flex items-center gap-2">
                                            <Info className="w-5 h-5" />
                                            {terraformBlocks.find(b => b.id === hoveredBlock)?.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-300 leading-relaxed">
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
                                className="h-full flex items-center justify-center p-8 text-slate-600 border-2 border-dashed border-slate-800 rounded-lg"
                            >
                                <div className="text-center">
                                    <p>Hover over the code blocks to see detailed explanations here.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
