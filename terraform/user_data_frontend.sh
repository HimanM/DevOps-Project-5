#!/bin/bash
yum update -y

# Install Node.js 20 (Amazon Linux 2023)
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs git

# Clone your repo
cd /home/ubuntu
git clone https://github.com/HimanM/DevOps-Project-5.git
cd DevOps-Project-5/app/frontend

# Create .env.production
echo "NEXT_PUBLIC_BACKEND_URL=http://10.0.2.20:8000" > .env.production

# Install dependencies
npm install

# Build Next.js app
npm run build

# Install PM2 to keep Next.js running
npm install -g pm2

# Start Next.js
pm2 start "npm start"
pm2 save
pm2 startup systemd
