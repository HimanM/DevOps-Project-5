#!/bin/bash
sudo apt-get update -y
sudo apt-get install -y git python3 python3-pip

# Clone repo
cd /home/ubuntu
git clone https://github.com/HimanM/aws-secure-two-tier-architecture.git
# Fix permissions
sudo chown -R ubuntu:ubuntu /home/ubuntu/aws-secure-two-tier-architecture
cd aws-secure-two-tier-architecture/app/backend

# Install FastAPI & Uvicorn
pip3 install fastapi uvicorn

# Install other dependencies if you have a requirements file
if [ -f "requirements.txt" ]; then
    pip3 install -r requirements.txt
fi

# Create a systemd service for FastAPI
cat <<EOF | sudo tee /etc/systemd/system/fastapi.service
[Unit]
Description=FastAPI App
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/aws-secure-two-tier-architecture/app/backend
ExecStart=/usr/bin/python3 -m uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Enable + start service
sudo systemctl daemon-reload
sudo systemctl enable fastapi
sudo systemctl start fastapi
