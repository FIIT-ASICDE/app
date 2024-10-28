'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const passwordValidation = {
  upperCase: new RegExp(/[A-Z]/),
  lowerCase: new RegExp(/[a-z]/),
  number: new RegExp(/[0-9]/),
  special: new RegExp(/[!@#$%^&*(),.?":{}|<>]/)
}

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" }),
  email: z
    .string()
    .email()
    .min(1, { message: "Email is required" }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(passwordValidation.upperCase, {
      message: 'Password must contain an uppercase character',
    })
    .regex(passwordValidation.lowerCase, {
      message: 'Password must contain a lowercase character',
    })
    .regex(passwordValidation.number, {
      message: 'Password must contain a number',
    })
    .regex(passwordValidation.special, {
      message: 'Password must contain a special character',
    })
})

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // client-side validated, TODO: server-side validation
    console.log(values);
  }

  return (
    <div className="flex flex-col bg-gray-100">
      <main className="container mx-auto my-0 py-10 px-10 w-[1000px]">
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome to ASICDE</h1>
                <p className="mb-4 text-sm text-gray-600">Web IDE for ASIC development and collaboration</p>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="First name *" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Last name *" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Username *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" placeholder="Password *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between items-center pt-2">
                  <Button
                    type="submit"
                    className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700"
                  >
                    Register
                  </Button>
                  <Link href="/login" className="text-sm text-gray-600 hover:text-gray-500">
                    Back to login
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  )
}