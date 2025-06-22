#!/bin/bash

echo "Starting development server..."
echo ""
echo "If you're using WSL2 and can't access the site, try these URLs:"
echo ""

# Get WSL2 IP
WSL_IP=$(hostname -I | awk '{print $1}')
echo "1. WSL2 IP: http://$WSL_IP:5173"

# Get Windows host IP (if in WSL2)
if grep -qi microsoft /proc/version; then
    WIN_IP=$(ip route | grep default | awk '{print $3}')
    echo "2. Windows Host IP: Access WSL2 from Windows PowerShell:"
    echo "   Run: wsl hostname -I"
    echo "   Then use: http://<that-ip>:5173"
fi

echo ""
echo "3. Alternative: Use VS Code's port forwarding feature"
echo "   - In VS Code, go to Ports panel (View -> Terminal -> Ports)"
echo "   - Forward port 5173"
echo ""
echo "Starting Vite..."
npm run dev -- --host 0.0.0.0