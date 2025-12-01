# AWS VPC 2-Tier Architecture with Terraform

A comprehensive Infrastructure as Code (IaC) project demonstrating the deployment of a secure 2-tier AWS VPC architecture using Terraform. This project features a Next.js frontend hosted in a public subnet and a FastAPI backend deployed in a private subnet, showcasing modern cloud networking patterns and security best practices.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Infrastructure Components](#infrastructure-components)
- [Deployment Process](#deployment-process)
- [Verification](#verification)
- [Security Features](#security-features)
- [Application Stack](#application-stack)
- [Screenshots](#screenshots)
- [Learning Outcomes](#learning-outcomes)
- [Cleanup](#cleanup)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project demonstrates the implementation of a production-ready AWS VPC architecture with proper network segmentation, routing, and security controls. The infrastructure is entirely managed through Terraform, enabling repeatable and version-controlled deployments.

**Live Demo:** [devops5.himanmanduja.fun](https://devops5.himanmanduja.fun)

### Key Features

- Fully automated infrastructure provisioning with Terraform
- 2-tier architecture with public and private subnets
- Secure network traffic control using Security Groups
- Internet connectivity through Internet Gateway and NAT Gateway
- Production-ready routing configuration
- Interactive frontend documentation and visualization

## Architecture

The infrastructure implements a classic 2-tier VPC architecture pattern, separating the presentation layer (frontend) from the application layer (backend):

![AWS VPC Architecture](docs/architecture.png)

![AWS VPC Dashboard](docs/aws%20vpc.png)

### Network Topology

- **VPC CIDR Block:** 10.0.0.0/16 (65,536 IP addresses)
- **Public Subnet:** 10.0.1.0/24 (256 IP addresses)
  - Hosts the frontend Next.js application
  - Direct internet access via Internet Gateway
- **Private Subnet:** 10.0.2.0/24 (256 IP addresses)
  - Hosts the backend FastAPI application
  - Outbound internet access via NAT Gateway
  - No direct inbound access from the internet

### Traffic Flow

1. **Inbound Traffic:** Internet → Internet Gateway → Public Subnet → Frontend EC2
2. **Internal Traffic:** Frontend EC2 → Private Subnet → Backend EC2
3. **Outbound Traffic:** Private Subnet → NAT Gateway → Internet Gateway → Internet

## Prerequisites

Before deploying this infrastructure, ensure you have the following installed and configured:

- **Terraform** (v1.0.0 or later)
  ```bash
  # Installation
  # macOS
  brew install terraform
  
  # Linux
  wget https://releases.hashicorp.com/terraform/1.x.x/terraform_1.x.x_linux_amd64.zip
  unzip terraform_1.x.x_linux_amd64.zip
  sudo mv terraform /usr/local/bin/
  ```

- **AWS CLI** (v2.0 or later)
  ```bash
  # macOS
  brew install awscli
  
  # Linux
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
  unzip awscliv2.zip
  sudo ./aws/install
  ```

- **AWS Account** with programmatic access
- **IAM User** with appropriate permissions for VPC, EC2, and networking resources

### AWS Credentials Configuration

Configure your AWS credentials:

```bash
aws configure
```

You will need to provide:
- AWS Access Key ID
- AWS Secret Access Key
- Default region name (e.g., us-west-2)
- Default output format (json)

## Project Structure

```
DevOps-Project-5/
├── terraform/
│   ├── main.tf                    # Core infrastructure definition
│   ├── user_data_frontend.sh     # Frontend instance bootstrap script
│   └── user_data_backend.sh      # Backend instance bootstrap script
├── app/
│   ├── frontend/                  # Next.js frontend application
│   │   ├── app/
│   │   ├── components/
│   │   └── public/
│   └── backend/                   # FastAPI backend application
│       └── main.py
├── docs/                          # Documentation and screenshots
└── .github/
    └── workflows/
        └── deploy.yml             # GitHub Actions deployment workflow
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HimanM/DevOps-Project-5.git
cd DevOps-Project-5
```

### 2. Review and Customize Configuration

Review the `terraform/main.tf` file and adjust the following variables if needed:
- AWS region
- VPC CIDR blocks
- Instance types
- AMI IDs (ensure they match your region)

### 3. Initialize Terraform

```bash
cd terraform
terraform init
```

![Terraform Init](docs/terraform%20init.png)

This command downloads the necessary provider plugins and prepares the working directory.

### 4. Preview Infrastructure Changes

```bash
terraform plan
```

![Terraform Plan](docs/terraform%20plan.png)

Review the execution plan to understand what resources will be created.

### 5. Deploy Infrastructure

```bash
terraform apply
```

![Terraform Apply](docs/terraform%20apply.png)

Type `yes` when prompted to confirm the deployment.

## Infrastructure Components

### Virtual Private Cloud (VPC)

The VPC provides an isolated network environment with complete control over the networking configuration.

**Configuration:**
- CIDR Block: 10.0.0.0/16
- DNS Support: Enabled
- DNS Hostnames: Enabled

```hcl
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  
  tags = {
    Name = "devops-project-5"
  }
}
```

### Subnets

#### Public Subnet
- **CIDR:** 10.0.1.0/24
- **Purpose:** Hosts internet-facing resources
- **Auto-assign Public IP:** Enabled
- **Availability Zone:** us-west-2a

#### Private Subnet
- **CIDR:** 10.0.2.0/24
- **Purpose:** Hosts backend services
- **Auto-assign Public IP:** Disabled
- **Availability Zone:** us-west-2a

### Internet Gateway

Enables communication between the VPC and the internet for resources in public subnets.

### NAT Gateway

Allows instances in private subnets to initiate outbound connections to the internet while preventing unsolicited inbound connections.

**Configuration:**
- Located in the public subnet
- Associated with an Elastic IP address
- Enables outbound internet access for private subnet resources

### Route Tables

#### Public Route Table
- Default route (0.0.0.0/0) → Internet Gateway
- Associated with the public subnet

#### Private Route Table
- Default route (0.0.0.0/0) → NAT Gateway
- Associated with the private subnet

### Security Groups

#### Frontend Security Group
- **Inbound Rules:**
  - HTTP (Port 80) from 0.0.0.0/0
  - HTTPS (Port 443) from 0.0.0.0/0
  - SSH (Port 22) from 0.0.0.0/0
- **Outbound Rules:** All traffic allowed

![Security Groups](docs/aws%20sequirity groups.png)

#### Backend Security Group
- **Inbound Rules:**
  - Port 8000 from Frontend Security Group only
- **Outbound Rules:** All traffic allowed

### EC2 Instances

#### Frontend Instance
- **AMI:** Ubuntu 22.04 LTS
- **Instance Type:** t2.micro
- **Subnet:** Public subnet
- **Public IP:** Auto-assigned
- **Application:** Next.js (Port 80/443)
- **Bootstrap:** Automated via user_data script

![Frontend EC2 Instance](docs/aws%20ec2%20frontend.png)

#### Backend Instance
- **AMI:** Ubuntu 22.04 LTS
- **Instance Type:** t2.micro
- **Subnet:** Private subnet
- **Private IP:** 10.0.2.20 (static)
- **Application:** FastAPI (Port 8000)
- **Bootstrap:** Automated via user_data script

![EC2 Instances Dashboard](docs/aws%20ec2%20instances%20dashboard.png)

## Deployment Process

### Terraform Workflow

1. **Initialization:** Download providers and modules
2. **Planning:** Generate execution plan
3. **Application:** Create/modify infrastructure
4. **State Management:** Track resource state

### User Data Scripts

Both instances are automatically configured using user_data scripts:

**Frontend (`user_data_frontend.sh`):**
- Updates system packages
- Installs Node.js and npm
- Clones the application repository
- Installs dependencies
- Builds and starts the Next.js application

**Backend (`user_data_backend.sh`):**
- Updates system packages
- Installs Python and pip
- Clones the application repository
- Installs FastAPI and dependencies
- Starts the FastAPI server

## Verification

After successful deployment, verify the infrastructure:

### 1. Check VPC Creation

Navigate to the VPC Dashboard in AWS Console and verify:
- VPC is created with correct CIDR block
- Subnets are properly configured
- Route tables are associated correctly

### 2. Verify Instance Connectivity

![NAT Gateway](docs/aws%20NAT%20gateways.png)

### 3. Test Application

1. Retrieve the frontend instance public IP from the EC2 dashboard
2. Access the application via browser: `http://<frontend-public-ip>`:3000
3. Use the Live Connectivity Test feature to verify backend communication

![Application Success](docs/aws%20ec2%20frontend%20public%20ip%20port%203000%20backend%20ping%20success.png)

The green success message confirms:
- Frontend is running and accessible
- Backend is running in the private subnet
- Network routing is configured correctly
- Security groups are properly configured

## Security Features

### Network Isolation

- Private subnet instances have no direct internet access
- Backend only accepts traffic from the frontend security group
- Principle of least privilege applied to all security group rules

### Security Group Configuration

- Implements defense in depth
- Restricts backend access to authorized sources only
- Separate security groups for different application tiers

### Infrastructure as Code Benefits

- Version-controlled security configurations
- Reproducible security settings
- Audit trail of infrastructure changes
- Reduced human error in configuration

## Application Stack

### Frontend (Next.js)

- **Framework:** Next.js 16.0.6
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Features:**
  - Interactive architecture visualization
  - Live backend connectivity testing
  - Comprehensive documentation
  - Responsive design for mobile and desktop

### Backend (FastAPI)

- **Framework:** FastAPI
- **Language:** Python 3.x
- **Features:**
  - RESTful API endpoint
  - CORS configuration
  - Instance metadata retrieval

## Screenshots

### Terraform Execution

| Terraform Init | Terraform Plan | Terraform Apply |
|----------------|----------------|-----------------|
| ![Init](docs/terraform%20init.png) | ![Plan](docs/terraform%20plan.png) | ![Apply](docs/terraform%20apply.png) |

### AWS Console Views

| VPC Dashboard | EC2 Instances | Security Groups |
|---------------|---------------|-----------------|
| ![VPC](docs/aws%20vpc.png) | ![EC2](docs/aws%20ec2%20instances%20dashboard.png) | ![SG](docs/aws%20sequirity%20groups.png) |

## Learning Outcomes

This project provides hands-on experience with:

1. **Infrastructure as Code (IaC)**
   - Terraform syntax and structure
   - Resource dependencies and relationships
   - State management

2. **AWS Networking**
   - VPC architecture and design
   - Subnet configuration and segmentation
   - Routing and gateway management
   - Network ACLs and Security Groups

3. **Cloud Security**
   - Security group configuration
   - Public vs private subnet isolation
   - NAT Gateway for secure outbound access

4. **EC2 Management**
   - Instance provisioning
   - User data scripts for automation
   - Instance networking and IP addressing

5. **DevOps Practices**
   - Automation and repeatability
   - Configuration management
   - Documentation as code

## Cleanup

To avoid ongoing AWS charges, destroy the infrastructure when no longer needed:

```bash
cd terraform
terraform destroy
```

Type `yes` when prompted. This will:
- Terminate all EC2 instances
- Delete the NAT Gateway and release Elastic IP
- Remove the Internet Gateway
- Delete route tables
- Remove subnets
- Delete the VPC

**Note:** Ensure you backup any important data before destroying the infrastructure.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This is an educational project created for learning purposes. Feel free to:
- Fork this repository
- Make modifications and improvements
- Use it for your own learning
- Share it with others
- Create derivative works

**No restrictions.** This project is completely open for educational use. If you learn something from it or build upon it, that's exactly what it's meant for.

---

**Author:** Himan Manduja  
**Project:** DevOps Learning Series - Project 5  
**Focus:** AWS VPC Architecture with Terraform

For questions or feedback, please open an issue in the repository.
