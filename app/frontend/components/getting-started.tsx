"use client"

import { motion } from "framer-motion"
import { ExternalLink, BookOpen, Key, Terminal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function GettingStarted() {
    return (
        <section className="w-full my-16">
            <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600 mb-8 flex items-center gap-3"
            >
                <BookOpen className="text-blue-400 w-8 h-8" /> Getting Started
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Terraform Setup */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="bg-slate-950/40 backdrop-blur-sm border-slate-800/60 hover:border-purple-500/50 transition-all duration-300 group h-full">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-3">
                                <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                                    <Icons.Terraform className="w-6 h-6 text-purple-400" />
                                </div>
                                Configure Terraform
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-slate-400 text-sm">
                                Learn how to install Terraform and configure it to manage your AWS infrastructure as code.
                            </p>
                            <div className="flex flex-col gap-3">
                                <Button
                                    variant="secondary"
                                    className="w-full justify-between bg-slate-800 text-white hover:bg-purple-600 hover:text-white transition-all duration-300 border border-slate-700"
                                    onClick={() => window.open("https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli", "_blank")}
                                >
                                    <span className="flex items-center gap-2"><Terminal className="w-4 h-4" /> Install Terraform CLI</span>
                                    <ExternalLink className="w-4 h-4 opacity-70" />
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-full justify-between bg-slate-800 text-white hover:bg-purple-600 hover:text-white transition-all duration-300 border border-slate-700"
                                    onClick={() => window.open("https://developer.hashicorp.com/terraform/tutorials/aws-get-started/aws-build", "_blank")}
                                >
                                    <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Build Infrastructure</span>
                                    <ExternalLink className="w-4 h-4 opacity-70" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* AWS Credentials */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="bg-slate-950/40 backdrop-blur-sm border-slate-800/60 hover:border-orange-500/50 transition-all duration-300 group h-full">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-3">
                                <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                                    <Icons.AWS className="w-6 h-6 text-orange-400" />
                                </div>
                                AWS Credentials
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-slate-400 text-sm">
                                Set up your AWS credentials to allow Terraform and the CLI to interact with your account.
                            </p>
                            <div className="flex flex-col gap-3">
                                <Button
                                    variant="secondary"
                                    className="w-full justify-between bg-slate-800 text-white hover:bg-orange-600 hover:text-white transition-all duration-300 border border-slate-700"
                                    onClick={() => window.open("https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html", "_blank")}
                                >
                                    <span className="flex items-center gap-2"><Key className="w-4 h-4" /> Configure AWS CLI</span>
                                    <ExternalLink className="w-4 h-4 opacity-70" />
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-full justify-between bg-slate-800 text-white hover:bg-orange-600 hover:text-white transition-all duration-300 border border-slate-700"
                                    onClick={() => window.open("https://us-east-1.console.aws.amazon.com/iam/home#/security_credentials", "_blank")}
                                >
                                    <span className="flex items-center gap-2"><Icons.AWS className="w-4 h-4" /> Manage Access Keys</span>
                                    <ExternalLink className="w-4 h-4 opacity-70" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
