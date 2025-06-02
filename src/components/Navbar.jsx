import React from 'react'
import "../index.css"
const Navbar = () => {
  return (
    <div className='flex justify-end gap-10 pt-2 pr-50 bg-gray-800 h-10 text-white font-bold' >
        <p className=' hover:text-yellow-300 transition-all cursor-pointer '>Home</p>
        <p className=' hover:text-yellow-300 transition-all cursor-pointer '>Tasks</p>
    </div>
  )
}

export default Navbar
