'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from 'react'

export default function Register() {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onRegister = () => {
    /* TODO: Register logic here */
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <main className="container mx-auto my-0 py-10 px-10 h-[500px] w-[1000px]">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex h-full">
          <div className="w-1/2 bg-gray-200">
            <Image
              src={"/images/duotone.png"}
              alt="Placeholder Image"
              width={600}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-1/2 p-8 overflow-y-auto">
            <form className="space-y-4">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome to ASICDE</h1>
              <p className="mb-4 text-sm text-gray-600">Web IDE for ASIC development and collaboration</p>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First name *"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Last name *"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <Input
                type="email"
                placeholder="Email *"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Username *"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password *"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-between items-center pt-2">
                <Button
                  type="submit"
                  className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700"
                  onClick={onRegister}
                >
                  Register
                </Button>
                <Link href="/login" className="text-sm text-gray-600 hover:text-gray-500">
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