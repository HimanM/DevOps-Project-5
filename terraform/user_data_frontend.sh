#!/bin/bash
# Update package list
sudo apt-get update -y

# Install Node.js 20 (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git

# Clone your repo
cd /home/ubuntu
git clone https://github.com/HimanM/DevOps-Project-5.git
# Fix permissions just in case
sudo chown -R ubuntu:ubuntu /home/ubuntu/DevOps-Project-5
cd DevOps-Project-5/app/frontend

# Create .env.production
echo "NEXT_PUBLIC_BACKEND_URL=http://10.0.2.20:8000" | sudo tee .env.production > /dev/null

# Install dependencies
npm install

# Build Next.js app
npm run build

# Install PM2 to keep Next.js running
sudo npm install -g pm2

# Start Next.js
pm2 start "npm start"
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
