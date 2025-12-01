from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socket

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, this should be restricted to the frontend IP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_private_ip():
    try:
        # Connect to a public DNS server to determine the local IP used for routing
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

@app.get("/api/hello")
def read_root():
    backend_ip = get_private_ip()
    return {
        "message": "Hello from Backend!",
        "ip": backend_ip,
        "status": "success"
    }

@app.get("/")
def health_check():
    return {"status": "ok"}
