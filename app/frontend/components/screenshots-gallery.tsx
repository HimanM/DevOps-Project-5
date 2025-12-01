"use client"

import { Terminal, Cloud, CheckCircle2, Image as ImageIcon, X, Maximize2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Icons } from "@/components/icons"
import { useState } from "react"

export function ScreenshotsGallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    return (
        <div className="w-full my-16">
            <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 flex items-center gap-3"
            >
                <ImageIcon className="text-purple-400 w-8 h-8" /> Project Screenshots
            </motion.h3>

            <Tabs defaultValue="terraform" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-1.5 rounded-xl h-auto gap-2">
                    <TabsTrigger
                        value="terraform"
                        className="h-12 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-900/20 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-300 rounded-lg border border-transparent data-[state=active]:border-purple-500/50"
                    >
                        <Icons.Terraform className="w-5 h-5 mr-2" />
                        <span className="text-base font-medium">Terraform</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="aws"
                        className="h-12 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-900/20 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-300 rounded-lg border border-transparent data-[state=active]:border-blue-500/50"
                    >
                        <Icons.AWS className="w-5 h-5 mr-2" />
                        <span className="text-base font-medium">AWS Console</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="verify"
                        className="h-12 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-green-900/20 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-300 rounded-lg border border-transparent data-[state=active]:border-green-500/50"
                    >
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        <span className="text-base font-medium">Verification</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="terraform" className="mt-8 space-y-8">
                    <ScreenshotCard
                        title="1. Terraform Init"
                        description="Initializing the Terraform working directory and downloading providers."
                        src="/screenshots/terraform init.png"
                        color="purple"
                        onClick={() => setSelectedImage("/screenshots/terraform init.png")}
                    />
                    <ScreenshotCard
                        title="2. Terraform Plan"
                        description="Previewing the changes that Terraform will make to the infrastructure."
                        src="/screenshots/terraform plan.png"
                        color="purple"
                        onClick={() => setSelectedImage("/screenshots/terraform plan.png")}
                    />
                    <ScreenshotCard
                        title="3. Terraform Apply"
                        description="Applying the configuration to create resources in AWS."
                        src="/screenshots/terraform apply.png"
                        color="purple"
                        onClick={() => setSelectedImage("/screenshots/terraform apply.png")}
                    />
                </TabsContent>

                <TabsContent value="aws" className="mt-8 space-y-8">
                    <ScreenshotCard
                        title="VPC Dashboard"
                        description="The created VPC with its ID and state."
                        src="/screenshots/aws vpc.png"
                        color="blue"
                        onClick={() => setSelectedImage("/screenshots/aws vpc.png")}
                    />
                    <ScreenshotCard
                        title="EC2 Instances"
                        description="Frontend (Public) and Backend (Private) instances running."
                        src="/screenshots/aws ec2 instances dashboard.png"
                        color="blue"
                        onClick={() => setSelectedImage("/screenshots/aws ec2 instances dashboard.png")}
                    />
                    <ScreenshotCard
                        title="Security Groups"
                        description="Configured security groups for Frontend and Backend access control."
                        src="/screenshots/aws sequirity groups.png"
                        color="blue"
                        onClick={() => setSelectedImage("/screenshots/aws sequirity groups.png")}
                    />
                    <ScreenshotCard
                        title="NAT Gateway"
                        description="NAT Gateway allowing private instances to access the internet."
                        src="/screenshots/aws NAT gateways.png"
                        color="blue"
                        onClick={() => setSelectedImage("/screenshots/aws NAT gateways.png")}
                    />
                </TabsContent>

                <TabsContent value="verify" className="mt-8 space-y-8">
                    <ScreenshotCard
                        title="Frontend Instance Summary"
                        description="View the Public IPv4 address of the Frontend instance to access the application."
                        src="/screenshots/aws ec2 frontend.png"
                        color="green"
                        onClick={() => setSelectedImage("/screenshots/aws ec2 frontend.png")}
                    />
                    <ScreenshotCard
                        title="Frontend Access & Backend Connectivity"
                        description="Accessing the Frontend via Public IP and successfully pinging the Private Backend."
                        src="/screenshots/aws ec2 frontend public ip port 3000 backend ping success.png"
                        color="green"
                        onClick={() => setSelectedImage("/screenshots/aws ec2 frontend public ip port 3000 backend ping success.png")}
                    />
                </TabsContent>
            </Tabs>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 md:top-4 md:right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>
                            <div className="relative w-full h-full">
                                <Image
                                    src={selectedImage}
                                    alt="Fullscreen view"
                                    fill
                                    className="object-contain"
                                    quality={100}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function ScreenshotCard({ title, description, src, color = "purple", onClick }: { title: string, description: string, src: string, color?: "purple" | "blue" | "green", onClick?: () => void }) {
    const borderColors = {
        purple: "group-hover:border-purple-500/50",
        blue: "group-hover:border-blue-500/50",
        green: "group-hover:border-green-500/50"
    }

    const glowColors = {
        purple: "group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]",
        blue: "group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
        green: "group-hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]"
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
        >
            <Card
                className={`bg-slate-950/40 backdrop-blur-sm border-slate-800/60 overflow-hidden group transition-all duration-500 ${borderColors[color]} ${glowColors[color]} cursor-pointer`}
                onClick={onClick}
            >
                <CardHeader className="border-b border-slate-800/60 bg-slate-900/20 p-6">
                    <CardTitle className="text-white text-xl font-medium tracking-wide flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-8 rounded-full bg-gradient-to-b from-${color}-400 to-${color}-600`} />
                            {title}
                        </div>
                        <Maximize2 className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                    </CardTitle>
                    <p className="text-sm text-slate-400 pl-4">{description}</p>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="relative w-full h-[300px] md:h-[500px] bg-slate-950/80">
                        <Image
                            src={src}
                            alt={title}
                            fill
                            className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-20" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                            <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-white/10 flex items-center gap-2">
                                <Maximize2 className="w-4 h-4" /> Click to expand
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
