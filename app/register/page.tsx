import Image from 'next/image'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                            <span className="text-gray-800 font-bold text-xl">A</span>
                        </div>
                        <span className="font-bold text-xl">ASICDE</span>
                    </div>
                    <nav>
                        <ul className="flex space-x-6">
                            <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                            <li><Link href="/about" className="hover:text-gray-300">About Us</Link></li>
                            <li><Link href="/features" className="hover:text-gray-300">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-gray-300">Pricing</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="flex-grow container mx-auto my-8 p-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
                    <div className="w-1/2 bg-gray-200">
                        <Image
                            src="/placeholder.svg?height=600&width=600"
                            alt="Placeholder"
                            width={600}
                            height={600}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="w-1/2 p-8">
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to ASICDE</h1>
                        <p className="mb-6 text-gray-600">Web IDE for ASIC development and collaboration</p>
                        <form className="space-y-4">
                            <div className="flex space-x-4">
                                <Input type="text" placeholder="First name *" className="w-1/2" />
                                <Input type="text" placeholder="Last name *" className="w-1/2" />
                            </div>
                            <Input type="email" placeholder="Email *" />
                            <Input type="text" placeholder="Username *" />
                            <Input type="password" placeholder="Password *" />
                            <div className="flex justify-between items-center">
                                <Button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700">
                                    Register
                                </Button>
                                <Link href="/login" className="text-gray-600 hover:underline">
                                    Back to login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}