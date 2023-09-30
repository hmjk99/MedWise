'use client'
import { signIn } from "next-auth/react"
import Image from "next/image"
import Logo from "../public/logo.png"

const Login = () => {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
        <Image
        src={Logo}
        width={200}
        height={200}
        alt="logo"
        />
        <button onClick={() => signIn('google')} className="text-white font-bold text-3xl animate-pulse mt-12">
            Sign In to use MedWise
        </button>
    </div>
  )
}

export default Login