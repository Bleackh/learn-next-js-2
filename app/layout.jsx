import Link from 'next/link'
import React from 'react'
import Navbar from '@/components/Navbar'
import './global.css'
import { roboto } from './fonts'
import { Metadata } from "next"

export const metadata = {
    title: 'Situ Next.JS',
    description: 'Kumpulan Tutorial Framwork Javascript',
}

export default function Layout({ children }) {
    return (
        <html lang="en" className={roboto.variable}>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Learn Next JS</title>
            </head>
            <body className='bg-gray-100 flex flex-col p-6 min-h-screen'>
                <header>
                    <Navbar />
                </header>
                <main className='py-3 grow'>
                    {children}
                </main>
                <footer className='border-t py-3 text-center'>
                    [footer]
                </footer>
            </body>
        </html>
    )
}
