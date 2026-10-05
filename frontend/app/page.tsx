import Link from 'next/link'
import React from 'react'

const Home = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-blue-200'>
            <div>
                <p className='mb-5 text-5xl font-extrabold'>Welcome to Car Lease Central</p>

                <div className='flex justify-center text-center text-blue-500 text-2xl'>
                    <Link className='bg-blue-400 rounded-lg p-2 w-40 text-white' href='/login'>
                    Enter
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Home