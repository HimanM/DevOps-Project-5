###############################################
# EC2 Instance Outputs
###############################################

output "frontend_public_ip" {
  description = "Public IPv4 address of the Frontend EC2 instance"
  value       = aws_instance.frontend.public_ip
}

output "frontend_public_dns" {
  description = "Public DNS of the Frontend EC2 instance"
  value       = aws_instance.frontend.public_dns
}

output "frontend_url" {
  description = "Full URL to access the frontend (port 3000)"
  value       = "http://${aws_instance.frontend.public_ip}:3000"
}

output "backend_private_ip" {
  description = "Private IPv4 address of the Backend EC2 instance"
  value       = aws_instance.backend.private_ip
}

output "backend_url" {
  description = "Backend FastAPI URL inside VPC (port 8000)"
  value       = "http://${aws_instance.backend.private_ip}:8000"
}


###############################################
# Network Outputs
###############################################

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "public_subnet_id" {
  description = "Public subnet ID (Frontend)"
  value       = aws_subnet.public.id
}

output "private_subnet_id" {
  description = "Private subnet ID (Backend)"
  value       = aws_subnet.private.id
}

output "internet_gateway_id" {
  description = "Internet Gateway ID"
  value       = aws_internet_gateway.igw.id
}

output "nat_gateway_id" {
  description = "NAT Gateway ID"
  value       = aws_nat_gateway.nat.id
}


###############################################
# Security Groups
###############################################

output "frontend_sg_id" {
  description = "Frontend EC2 Security Group ID"
  value       = aws_security_group.frontend_sg.id
}

output "backend_sg_id" {
  description = "Backend EC2 Security Group ID"
  value       = aws_security_group.backend_sg.id
}
