import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookMarked } from "lucide-react"

export function ProjectDocs() {
    const terms = [
        {
            term: "VPC (Virtual Private Cloud)",
            desc: "A logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define.",
            link: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html"
        },
        {
            term: "CIDR Block",
            desc: "Classless Inter-Domain Routing. A method for allocating IP addresses and for IP routing.",
            link: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html"
        },
        {
            term: "Subnet",
            desc: "A range of IP addresses in your VPC. You can launch AWS resources into a specified subnet.",
            link: "https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html"
        },
        {
            term: "Internet Gateway",
            desc: "A horizontally scaled, redundant, and highly available VPC component that allows communication between your VPC and the internet.",
            link: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html"
        },
        {
            term: "NAT Gateway",
            desc: "A Network Address Translation (NAT) service. You can use a NAT gateway so that instances in a private subnet can connect to services outside your VPC but external services cannot initiate a connection with those instances.",
            link: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html"
        },
        {
            term: "Security Group",
            desc: "Acts as a virtual firewall for your EC2 instances to control incoming and outgoing traffic.",
            link: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html"
        }
    ]

    return (
        <div className="flex overflow-x-auto pb-4 md:pb-6 gap-3 md:gap-4 my-6 md:my-8 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible px-2 md:px-0">
            {terms.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="min-w-[260px] md:min-w-0 snap-center"
                >
                    <Card className="bg-slate-900 border-slate-800 hover:border-blue-500 transition-all duration-300 group h-full">
                        <CardHeader className="pb-2 md:pb-3">
                            <CardTitle className="text-sm md:text-base lg:text-lg text-white flex items-center justify-between gap-2">
                                <span className="flex-1">{item.term}</span>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-500 hover:text-blue-400 transition-colors flex-shrink-0"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <BookMarked className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </a>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[11px] md:text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                                {item.desc}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}
