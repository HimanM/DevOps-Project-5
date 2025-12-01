"use client"

import { motion } from "framer-motion"
import { Server, Database, ArrowDown, Cloud, Network, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ArchitectureDiagram() {
    return (
        <motion.div
            className="w-full p-3 md:p-6 bg-slate-950 rounded-xl border border-slate-800 mt-6 md:mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 px-2">
                <Cloud className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
                <span>AWS VPC Architecture</span>
            </h3>

            {/* Mobile View - Vertical Flow */}
            <div className="md:hidden relative w-full bg-slate-900 rounded-lg border-2 border-dashed border-slate-700 p-4 overflow-hidden">
                <div className="flex flex-col items-center gap-4 py-4">
                    {/* VPC Label */}
                    <motion.div
                        className="text-slate-500 font-mono text-[10px] border border-slate-700 px-2 py-1 rounded bg-slate-950/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        VPC: 10.0.0.0/16
                    </motion.div>

                    {/* Internet Gateway */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="flex flex-col items-center"
                    >
                        <Network className="w-10 h-10 text-blue-500 mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                        <Badge variant="outline" className="bg-slate-950 text-blue-400 border-blue-900 shadow-lg text-[9px] px-2 py-0.5">
                            Internet Gateway
                        </Badge>
                    </motion.div>

                    {/* Arrow Down */}
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        <ArrowDown className="w-5 h-5 text-blue-400" />
                    </motion.div>

                    {/* Public Subnet Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="w-full bg-slate-800/30 rounded-xl border border-green-900/30 p-3"
                    >
                        <div className="text-green-400 font-mono text-[10px] font-semibold mb-3 text-center">
                            Public Subnet (10.0.1.0/24)
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                            <Card className="bg-slate-950 border-slate-800 shadow-xl">
                                <CardHeader className="pb-2 border-b border-slate-900 px-3 py-2">
                                    <CardTitle className="text-sm text-white flex items-center gap-2">
                                        <div className="p-1.5 bg-green-500/10 rounded-lg">
                                            <Server className="text-green-500 w-4 h-4" />
                                        </div>
                                        <span className="text-sm">Frontend EC2</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-2 px-3 pb-3">
                                    <div className="space-y-1.5 text-xs text-slate-400">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px]">IP</span>
                                            <span className="text-white font-mono bg-slate-900 px-1.5 py-0.5 rounded text-[10px]">Public</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px]">Ports</span>
                                            <span className="text-green-400 font-mono font-bold text-[10px]">80/443</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px]">Stack</span>
                                            <span className="text-white text-[10px]">Next.js</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <div className="text-center mt-2">
                            <Badge className="bg-green-950 text-green-400 border-green-900 px-2 py-0.5 text-[9px]">SG-Frontend</Badge>
                        </div>
                    </motion.div>

                    {/* Arrow Down with Traffic Label */}
                    <motion.div
                        className="flex flex-col items-center gap-1"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1 }}
                    >
                        <div className="bg-slate-950 px-2 py-1 rounded-full border border-slate-700">
                            <span className="text-[8px] text-yellow-400 font-medium uppercase">Traffic</span>
                        </div>
                        <ArrowDown className="w-5 h-5 text-yellow-400" />
                    </motion.div>

                    {/* Private Subnet Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        className="w-full bg-slate-800/30 rounded-xl border border-red-900/30 p-3"
                    >
                        <div className="text-red-400 font-mono text-[10px] font-semibold mb-3 text-center">
                            Private Subnet (10.0.2.0/24)
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                            <Card className="bg-slate-950 border-slate-800 shadow-xl">
                                <CardHeader className="pb-2 border-b border-slate-900 px-3 py-2">
                                    <CardTitle className="text-sm text-white flex items-center gap-2">
                                        <div className="p-1.5 bg-red-500/10 rounded-lg">
                                            <Database className="text-red-500 w-4 h-4" />
                                        </div>
                                        <span className="text-sm">Backend EC2</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-2 px-3 pb-3">
                                    <div className="space-y-1.5 text-xs text-slate-400">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px]">IP</span>
                                            <span className="text-white font-mono bg-slate-900 px-1.5 py-0.5 rounded text-[10px]">10.0.2.20</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px]">Port</span>
                                            <span className="text-red-400 font-mono font-bold text-[10px]">8000</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px]">Stack</span>
                                            <span className="text-white text-[10px]">FastAPI</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <div className="text-center mt-2">
                            <Badge className="bg-red-950 text-red-400 border-red-900 px-2 py-0.5 text-[9px]">SG-Backend</Badge>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Desktop View - Horizontal Layout */}
            <div className="hidden md:block relative h-[600px] w-full bg-slate-900 rounded-lg border-2 border-dashed border-slate-700 p-6 lg:p-10 overflow-hidden">
                {/* VPC Label */}
                <motion.div
                    className="absolute top-6 right-6 text-slate-500 font-mono text-sm border border-slate-700 px-3 py-1.5 rounded bg-slate-950/50"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    VPC: 10.0.0.0/16
                </motion.div>

                {/* Internet Gateway */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="absolute top-6 left-12 flex flex-col items-center z-20"
                >
                    <Network className="w-12 h-12 text-blue-500 mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    <Badge variant="outline" className="bg-slate-950 text-blue-400 border-blue-900 shadow-lg text-xs px-2.5 py-0.5">Internet Gateway</Badge>
                </motion.div>

                <div className="grid grid-cols-2 gap-8 mt-12 px-4 pb-12">
                    {/* Public Subnet */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="relative bg-slate-800/30 rounded-xl border border-green-900/30 px-4 pb-4 pt-14 flex flex-col items-center"
                    >
                        <div className="absolute top-4 left-4 text-green-400 font-mono text-sm font-semibold tracking-wide">
                            Public Subnet (10.0.1.0/24)
                        </div>

                        <div className="flex flex-col items-center justify-center gap-3 w-full max-w-sm">
                            <motion.div
                                className="relative group w-full"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                                <Card className="relative bg-slate-950 border-slate-800 w-full shadow-xl">
                                    <CardHeader className="pb-2 border-b border-slate-900 px-4 py-3">
                                        <CardTitle className="text-lg text-white flex items-center gap-3">
                                            <div className="p-2 bg-green-500/10 rounded-lg">
                                                <Server className="text-green-500 w-5 h-5" />
                                            </div>
                                            <span>Frontend EC2</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-2 px-4 pb-4">
                                        <div className="space-y-2 text-sm text-slate-400">
                                            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                                                <span>IP Address</span>
                                                <span className="text-white font-mono bg-slate-900 px-2 py-0.5 rounded text-xs">Public IP</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                                                <span>Ports</span>
                                                <span className="text-green-400 font-mono font-bold text-xs">80 / 443</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span>Stack</span>
                                                <span className="text-white">Next.js</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <div className="text-center">
                                <Badge className="bg-green-950 text-green-400 border-green-900 hover:bg-green-900 px-4 py-1 text-xs">SG-Frontend</Badge>
                                <p className="text-xs text-slate-500 mt-2">Inbound: 0.0.0.0/0</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Private Subnet */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="relative bg-slate-800/30 rounded-xl border border-red-900/30 px-4 pb-4 pt-14 flex flex-col items-center"
                    >
                        <div className="absolute top-4 left-4 text-red-400 font-mono text-sm font-semibold tracking-wide">
                            Private Subnet (10.0.2.0/24)
                        </div>

                        <div className="flex flex-col items-center justify-center gap-3 w-full max-w-sm">
                            <motion.div
                                className="relative group w-full"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                                <Card className="relative bg-slate-950 border-slate-800 w-full shadow-xl">
                                    <CardHeader className="pb-2 border-b border-slate-900 px-4 py-3">
                                        <CardTitle className="text-lg text-white flex items-center gap-3">
                                            <div className="p-2 bg-red-500/10 rounded-lg">
                                                <Database className="text-red-500 w-5 h-5" />
                                            </div>
                                            <span>Backend EC2</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-2 px-4 pb-4">
                                        <div className="space-y-2 text-sm text-slate-400">
                                            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                                                <span>Private IP</span>
                                                <span className="text-white font-mono bg-slate-900 px-2 py-0.5 rounded text-xs">10.0.2.20</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                                                <span>Port</span>
                                                <span className="text-red-400 font-mono font-bold text-xs">8000</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span>Stack</span>
                                                <span className="text-white">FastAPI</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <div className="text-center">
                                <Badge className="bg-red-950 text-red-400 border-red-900 hover:bg-red-900 px-4 py-1 text-xs">SG-Backend</Badge>
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
                    <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-full border border-slate-700 shadow-xl">
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Internal Traffic</span>
                        <ArrowRight className="w-4 h-4 text-yellow-500" />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
