import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Layout = () => {
    return (
        <div className='bg-[#f3f4f9] font-montserrat'>
            <Navbar />
            <main className='w-full container mx-auto'>
                <Outlet />
            </main>
            <Footer/>
        </div>
    )
}

export default Layout