"use client"

import { useEffect, useState } from "react"
import { ArchitectureDiagram } from "@/components/architecture-diagram"
import { TerraformViewer } from "@/components/terraform-viewer"
import { ProjectDocs } from "@/components/project-docs"
import { ScreenshotsGallery } from "@/components/screenshots-gallery"
import { Button } from "@/components/ui/button"
import { Github, Terminal, CheckCircle2, AlertCircle } from "lucide-react"
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
    <main className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono border border-blue-500/20">
                DevOps Project 5
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono border border-purple-500/20">
                Terraform + AWS
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              VPC Architecture Demo
            </h1>
            <p className="text-slate-400 mt-2 max-w-2xl">
              A full-stack demonstration of a secure 2-tier architecture on AWS.
              Frontend in Public Subnet communicating with Backend in Private Subnet.
            </p>
          </div>

          <Button
            variant="outline"
            className="gap-2 border-slate-700 hover:bg-slate-800 text-white"
            onClick={() => window.open("https://github.com/HimanM/DevOps-Project-5", "_blank")}
          >
            <Github className="w-4 h-4" />
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

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-4">
                <p className="text-slate-300">
                  Click the button below to send a request from this Frontend Server (Public)
                  to the Backend Server (Private IP: 10.0.2.20).
                </p>
                <Button
                  onClick={checkBackend}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-500 text-white min-w-[150px]"
                >
                  {loading ? "Connecting..." : "Ping Backend"}
                </Button>
              </div>

              <div className="flex-1 w-full">
                {error && (
                  <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="text-red-500 w-5 h-5 mt-0.5" />
                    <div>
                      <h4 className="text-red-400 font-medium">Connection Failed</h4>
                      <p className="text-red-300/70 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {backendStatus && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-950/30 border border-green-900/50 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-500 w-5 h-5 mt-0.5" />
                      <div className="space-y-2">
                        <h4 className="text-green-400 font-medium">Response Received!</h4>
                        <div className="font-mono text-sm bg-black/40 p-3 rounded border border-green-900/30 text-green-200">
                          <p>Message: "{backendStatus.message}"</p>
                          <p>Backend IP: {backendStatus.ip}</p>
                          <p>Status: {backendStatus.status}</p>
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
          <h2 className="text-2xl font-bold text-white mb-6">Key Concepts</h2>
          <ProjectDocs />
        </section>

        {/* Screenshots Gallery */}
        <section>
          <ScreenshotsGallery />
        </section>

      </div>
    </main>
  )
}
