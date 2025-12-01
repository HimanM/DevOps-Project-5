#!/bin/bash
yum update -y
yum install -y git python3 python3-pip

# Clone repo
cd /home/ubuntu
git clone https://github.com/HimanM/DevOps-Project-5.git
cd DevOps-Project-5/app/backend

# Install FastAPI & Uvicorn
pip3 install fastapi uvicorn

# Install other dependencies if you have a requirements file
if [ -f "requirements.txt" ]; then
    pip3 install -r requirements.txt
fi

# Create a systemd service for FastAPI
cat <<EOF > /etc/systemd/system/fastapi.service
[Unit]
Description=FastAPI App
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/DevOps-Project-5/app/backend
ExecStart=/usr/bin/python3 -m uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Enable + start service
systemctl daemon-reload
systemctl enable fastapi
systemctl start fastapi
