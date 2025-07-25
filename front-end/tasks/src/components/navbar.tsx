import React from 'react'
import Image from 'next/image'
import { LogOut } from 'lucide-react';
import Cookies from "js-cookie";

const navbar = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-[#FF8000] shadow-md">
            <Image src="logo.svg" alt="alt" width={150} height={0} />
            <button className='flex items-center text-white gap-2' onClick={() => {
                "use client"
                Cookies.remove("auth_token")
                Cookies.remove("auth_id")
                sessionStorage.clear()
                location.href = "/login"
            }}><LogOut size={18} /> Logout</button>
        </header>
    )
}

export default navbar
