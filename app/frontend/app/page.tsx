"use client"

import { useEffect, useState } from "react"
import { ArchitectureDiagram } from "@/components/architecture-diagram"
import { TerraformViewer } from "@/components/terraform-viewer"
import { ProjectDocs } from "@/components/project-docs"
import { ScreenshotsGallery } from "@/components/screenshots-gallery"
import { GettingStarted } from "@/components/getting-started"
import { Button } from "@/components/ui/button"
import { Terminal, CheckCircle2, AlertCircle } from "lucide-react"
import { Icons } from "@/components/icons"
import { motion } from "framer-motion"

export default function Home() {
  const [backendStatus, setBackendStatus] = useState<{ message: string; ip: string; status: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkBackend = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/hello")
      if (!res.ok) throw new Error("Failed to connect to backend")
      const data = await res.json()
      setBackendStatus(data)
    } catch (err) {
      setError("Could not reach backend. Is the private instance running?")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800/60 pb-8 p-8"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono border border-blue-500/20 shadow-[0_0_10px_-3px_rgba(59,130,246,0.3)]">
                DevOps Project 5
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono border border-purple-500/20 shadow-[0_0_10px_-3px_rgba(168,85,247,0.3)]">
                Terraform + AWS
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
              VPC Architecture Demo
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
              A full-stack demonstration of a secure 2-tier architecture on AWS.
              Frontend in Public Subnet communicating with Backend in Private Subnet.
            </p>
          </div>

          <Button
            variant="secondary"
            className="gap-2 bg-white text-slate-950 hover:bg-slate-200 h-12 px-6 rounded-full transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] font-medium"
            onClick={() => window.open("https://github.com/HimanM/DevOps-Project-5", "_blank")}
          >
            <Icons.GitHub className="w-5 h-5" />
            View Repository
          </Button>
        </motion.header>

        {/* Live Demo Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Terminal className="text-green-400" /> Live Connectivity Test
            </h2>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-6">
                <p className="text-slate-300 text-lg">
                  Click the button below to send a request from this <span className="text-green-400 font-semibold">Frontend Server (Public)</span>
                  to the <span className="text-red-400 font-semibold">Backend Server (Private IP: 10.0.2.20)</span>.
                </p>
                <Button
                  onClick={checkBackend}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white min-w-[180px] h-12 text-lg shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] border-0"
                >
                  {loading ? "Connecting..." : "Ping Backend"}
                </Button>
              </div>

              <div className="flex-1 w-full">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-950/30 border border-red-900/50 rounded-lg p-6 flex items-start gap-4"
                  >
                    <AlertCircle className="text-red-500 w-6 h-6 mt-0.5" />
                    <div>
                      <h4 className="text-red-400 font-medium text-lg">Connection Failed</h4>
                      <p className="text-red-300/70">{error}</p>
                    </div>
                  </motion.div>
                )}

                {backendStatus && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-950/30 border border-green-900/50 rounded-lg p-6 shadow-[0_0_30px_-10px_rgba(34,197,94,0.2)]"
                  >
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="text-green-500 w-6 h-6 mt-0.5" />
                      <div className="space-y-3 w-full">
                        <h4 className="text-green-400 font-medium text-lg">Response Received!</h4>
                        <div className="font-mono text-sm bg-black/60 p-4 rounded-lg border border-green-900/30 text-green-200 space-y-1 shadow-inner">
                          <p><span className="text-green-500/70">Message:</span> "{backendStatus.message}"</p>
                          <p><span className="text-green-500/70">Backend IP:</span> {backendStatus.ip}</p>
                          <p><span className="text-green-500/70">Status:</span> {backendStatus.status}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Visualization */}
        <section>
          <ArchitectureDiagram />
        </section>

        {/* Terraform Explanation */}
        <section>
          <TerraformViewer />
        </section>

        {/* Documentation */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            Key Concepts
          </h2>
          <ProjectDocs />
        </section>

        {/* Getting Started Guide */}
        <GettingStarted />

        {/* Screenshots Gallery */}
        <section>
          <ScreenshotsGallery />
        </section>

      </div>
    </main>
  )
}
