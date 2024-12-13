import React from 'react'
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='text-center bg-black mt-10 text-white p-6'>
        <p className='text-base md:text-xl mb-4'>© 2024 Tharusha Delpachitra. All rights reserved.</p>
        <hr />
        <div className='flex flex-row gap-2 justify-center mt-5 text-2xl'>
            <Link to='https://www.linkedin.com/in/tharusha-delpachitra-9684ab266/'>
                <FaLinkedin />
            </Link>
            
            <Link to='https://github.com/Tharusha-Delpachitra'>
                <FaGithub />
            </Link>
            
        </div>
        
    </div>
  )
}

export default Footer