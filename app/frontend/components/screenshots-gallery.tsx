"use client"

import { motion } from "framer-motion"
import { Terminal, Key, Shield, Image as ImageIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ScreenshotsGallery() {
    return (
        <div className="w-full my-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <ImageIcon className="text-purple-400" /> Project Screenshots & Setup
            </h3>

            <Tabs defaultValue="cli" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-900 border border-slate-800">
                    <TabsTrigger value="cli" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                        <Terminal className="w-4 h-4 mr-2" /> AWS CLI Setup
                    </TabsTrigger>
                    <TabsTrigger value="credentials" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                        <Key className="w-4 h-4 mr-2" /> Credentials
                    </TabsTrigger>
                    <TabsTrigger value="deployment" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                        <Shield className="w-4 h-4 mr-2" /> Deployment
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="cli" className="mt-6">
                    <Card className="bg-slate-950 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white">Installing AWS CLI</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video w-full bg-slate-900 rounded-lg border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500">
                                <Terminal className="w-16 h-16 mb-4 opacity-50" />
                                <p>Screenshot Placeholder: AWS CLI Installation</p>
                                <p className="text-xs mt-2">Show `aws --version` output here</p>
                            </div>
                            <div className="mt-4 p-4 bg-slate-900 rounded-md font-mono text-sm text-green-400">
                                $ aws --version<br />
                                aws-cli/2.15.0 Python/3.11.6 Windows/10 exe/AMD64 prompt/off
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="credentials" className="mt-6">
                    <Card className="bg-slate-950 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white">Configuring Credentials</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video w-full bg-slate-900 rounded-lg border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500">
                                <Key className="w-16 h-16 mb-4 opacity-50" />
                                <p>Screenshot Placeholder: AWS Configure</p>
                                <p className="text-xs mt-2">Show `aws configure` process (mask secrets!)</p>
                            </div>
                            <div className="mt-4 p-4 bg-slate-900 rounded-md font-mono text-sm text-blue-400">
                                $ aws configure<br />
                                AWS Access Key ID [****************ABCD]:<br />
                                AWS Secret Access Key [****************EFGH]:<br />
                                Default region name [us-west-2]:<br />
                                Default output format [json]:
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="deployment" className="mt-6">
                    <Card className="bg-slate-950 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white">Terraform Deployment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video w-full bg-slate-900 rounded-lg border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500">
                                <Shield className="w-16 h-16 mb-4 opacity-50" />
                                <p>Screenshot Placeholder: Terraform Apply</p>
                                <p className="text-xs mt-2">Show successful `terraform apply` output</p>
                            </div>
                            <div className="mt-4 p-4 bg-slate-900 rounded-md font-mono text-sm text-yellow-400">
                                Apply complete! Resources: 9 added, 0 changed, 0 destroyed.<br />
                                <br />
                                Outputs:<br />
                                backend_private_ip = "10.0.2.20"<br />
                                frontend_public_ip = "54.x.x.x"
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
