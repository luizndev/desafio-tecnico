"use client"

import React from 'react'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { handleRegister } from '@/lib/form'

const page = () => {
  return (
    <div className='px-7 flex flex-col h-screen items-center justify-center'>
        <div className='w-full  h-20 w-full rounded-md flex items-center justify-center'>
            <Image src="/logo-contrast.svg" alt="alt" width={125} height={0} />
        </div>
        <div className='w-full max-w-md flex flex-col gap-4  shadow-2xl rounded-lg p-6'>

            <div>
                <span className='text-gray-600 text-[14px]'>Preencha para</span>
                <h1 className='text-xl  text-[#030712] font-bold'>Registrar sua conta</h1>
            </div>

            <form onSubmit={(e) => handleRegister(e)} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor="email">Nome</Label>
                    <Input id="name" type="text" name='name' placeholder="Digite seu nome" />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name='email' placeholder="Digite seu email" />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor="email">Senha</Label>
                    <Input id="senha" type="password" name='password' placeholder="Digite seu email" />
                </div>

                <Button className='bg-[#FF8000] hover:bg-[rgb(255,160,36)] hover:cursor-pointer'>Entrar</Button>
            </form>
            <span>Você possui uma conta? <span className='font-semibold cursor-pointer' onClick={() => window.location.href = "/login"}>Clique aqui</span></span>

            
        </div>
    </div>
  )
}

export default page