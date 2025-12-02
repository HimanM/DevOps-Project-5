"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function TerraformExplainer() {
    return (
        <div className="w-full my-8">
            <h3 className="text-2xl font-bold text-white mb-6">Infrastructure as Code</h3>

            <Tabs defaultValue="vpc" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-slate-900">
                    <TabsTrigger value="vpc">VPC & Network</TabsTrigger>
                    <TabsTrigger value="security">Security Groups</TabsTrigger>
                    <TabsTrigger value="compute">EC2 Instances</TabsTrigger>
                    <TabsTrigger value="userdata">User Data</TabsTrigger>
                </TabsList>

                <TabsContent value="vpc">
                    <Card className="bg-slate-950 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white">VPC Configuration</CardTitle>
                            <CardDescription>The networking foundation</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-900 p-4 rounded-md border border-slate-800">
                                    <h4 className="font-bold text-blue-400 mb-2">VPC Resource</h4>
                                    <p className="text-sm text-slate-400 mb-2">
                                        Defines the virtual network with CIDR <code className="bg-slate-800 px-1 rounded">10.0.0.0/16</code>.
                                        Enables DNS support and hostnames for internal resolution.
                                    </p>
                                </div>
                                <div className="bg-slate-900 p-4 rounded-md border border-slate-800">
                                    <h4 className="font-bold text-blue-400 mb-2">Subnets</h4>
                                    <p className="text-sm text-slate-400 mb-2">
                                        <span className="text-green-400">Public:</span> 10.0.1.0/24 (Has Internet Gateway route)<br />
                                        <span className="text-red-400">Private:</span> 10.0.2.0/24 (Route via NAT Gateway)
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card className="bg-slate-950 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white">Security Groups</CardTitle>
                            <CardDescription>Firewall rules for instances</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="border-l-4 border-green-500 pl-4">
                                    <h4 className="font-bold text-white">Frontend SG</h4>
                                    <p className="text-sm text-slate-400">
                                        Allows Inbound HTTP (80), HTTPS (443), and SSH (22) from <code className="text-yellow-500">0.0.0.0/0</code> (Anywhere).
                                    </p>
                                </div>
                                <div className="border-l-4 border-red-500 pl-4">
                                    <h4 className="font-bold text-white">Backend SG</h4>
                                    <p className="text-sm text-slate-400">
                                        Allows Inbound TCP (8000) ONLY from <span className="text-green-400">Frontend SG ID</span>.
                                        This ensures the backend is not directly accessible from the internet.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="compute">
                    <Card className="bg-slate-950 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white">EC2 Instances</CardTitle>
                            <CardDescription>Virtual servers running the applications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-slate-900 p-4 rounded-md border border-slate-800">
                                    <h4 className="font-bold text-white mb-2">Backend Instance</h4>
                                    <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                                        <li>AMI: Amazon Linux 2023</li>
                                        <li>Type: t2.micro</li>
                                        <li>Subnet: Private</li>
                                        <li>Private IP: Fixed at <code className="text-yellow-500">10.0.2.20</code></li>
                                        <li>User Data: Installs Python, FastAPI, and runs Uvicorn</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-900 p-4 rounded-md border border-slate-800">
                                    <h4 className="font-bold text-white mb-2">Frontend Instance</h4>
                                    <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                                        <li>AMI: Amazon Linux 2023</li>
                                        <li>Type: t2.small</li>
                                        <li>Subnet: Public</li>
                                        <li>User Data: Installs Node.js, PM2, and clones repo</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="userdata">
                    <Card className="bg-slate-950 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white">User Data Scripts</CardTitle>
                            <CardDescription>Bootstrapping scripts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[200px] w-full rounded-md border border-slate-800 bg-slate-900 p-4">
                                <pre className="text-xs text-slate-300 font-mono">
                                    {`#!/bin/bash
# Frontend Setup
yum update -y
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs git
git clone https://github.com/HimanM/DevOps-Project-5.git app
cd app/frontend
echo "NEXT_PUBLIC_BACKEND_URL=http://10.0.2.20:8000" > .env.production
npm install
npm run build
pm2 start "npm start"`}
                                </pre>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
