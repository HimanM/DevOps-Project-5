"use client"

import { motion } from "framer-motion"
import { Server, Globe, Database, Lock, ArrowRight, Cloud } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ArchitectureDiagram() {
    return (
        <div className="hidden md:block w-full p-6 bg-slate-950 rounded-xl border border-slate-800 mt-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Cloud className="text-blue-400" /> AWS VPC Architecture
            </h3>

            <div className="relative h-auto md:h-[600px] w-full bg-slate-900 rounded-lg border-2 border-dashed border-slate-700 p-6 md:p-10 overflow-hidden">
                {/* VPC Label */}
                <div className="absolute top-6 right-6 text-slate-500 font-mono text-sm border border-slate-700 px-3 py-1.5 rounded bg-slate-950/50">
                    VPC: 10.0.0.0/16
                </div>

                {/* Internet Gateway */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-6 left-12 flex flex-col items-center z-20"
                >
                    <Globe className="w-12 h-12 text-blue-500 mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    <Badge variant="outline" className="bg-slate-950 text-blue-400 border-blue-900 shadow-lg">Internet Gateway</Badge>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 px-4 pb-12 md:pb-0">
                    {/* Public Subnet */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative bg-slate-800/30 rounded-xl border border-green-900/30 px-4 pb-4 pt-14 flex flex-col items-center"
                    >
                        <div className="absolute top-4 left-4 text-green-400 font-mono text-sm font-semibold tracking-wide">
                            Public Subnet (10.0.1.0/24)
                        </div>

                        <div className="flex flex-col items-center justify-center gap-3 w-full max-w-sm">
                            <div className="relative group w-full">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                                <Card className="relative bg-slate-950 border-slate-800 w-full shadow-xl">
                                    <CardHeader className="pb-2 border-b border-slate-900">
                                        <CardTitle className="text-lg text-white flex items-center gap-3">
                                            <div className="p-2 bg-green-500/10 rounded-lg">
                                                <Server className="text-green-500 w-5 h-5" />
                                            </div>
                                            Frontend EC2
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-2">
                                        <div className="space-y-2 text-sm text-slate-400">
                                            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                                                <span>IP Address</span> <span className="text-white font-mono bg-slate-900 px-2 py-0.5 rounded">Public IP</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                                                <span>Ports</span> <span className="text-green-400 font-mono font-bold">80 / 443</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span>Stack</span> <span className="text-white">Next.js</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="text-center">
                                <Badge className="bg-green-950 text-green-400 border-green-900 hover:bg-green-900 px-4 py-1">SG-Frontend</Badge>
                                <p className="text-xs text-slate-500 mt-2">Inbound: 0.0.0.0/0</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Private Subnet */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="relative bg-slate-800/30 rounded-xl border border-red-900/30 px-4 pb-4 pt-14 flex flex-col items-center"
                    >
                        <div className="absolute top-4 left-4 text-red-400 font-mono text-sm font-semibold tracking-wide">
                            Private Subnet (10.0.2.0/24)
                        </div>

                        <div className="flex flex-col items-center justify-center gap-3 w-full max-w-sm">
                            <div className="relative group w-full">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                                <Card className="relative bg-slate-950 border-slate-800 w-full shadow-xl">
                                    <CardHeader className="pb-2 border-b border-slate-900">
                                        <CardTitle className="text-lg text-white flex items-center gap-3">
                                            <div className="p-2 bg-red-500/10 rounded-lg">
                                                <Database className="text-red-500 w-5 h-5" />
                                            </div>
                                            Backend EC2
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-2">
                                        <div className="space-y-2 text-sm text-slate-400">
                                            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                                                <span>Private IP</span> <span className="text-white font-mono bg-slate-900 px-2 py-0.5 rounded">10.0.2.20</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                                                <span>Port</span> <span className="text-red-400 font-mono font-bold">8000</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span>Stack</span> <span className="text-white">FastAPI</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="text-center">
                                <Badge className="bg-red-950 text-red-400 border-red-900 hover:bg-red-900 px-4 py-1">SG-Backend</Badge>
                                <p className="text-xs text-slate-500 mt-2">Inbound: Frontend SG Only</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Traffic Flow Animation */}
                <motion.div
                    className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    animate={{
                        x: [-10, 10, -10],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                    }}
                >
                    <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-full border border-slate-700 shadow-xl rotate-90 md:rotate-0">
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Internal Traffic</span>
                        <ArrowRight className="w-4 h-4 text-yellow-500" />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
