import React from 'react'

const UnAuthorised = () => {
    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-200'>
            <div className='flex items-center justify-center text-5xl text-center bg-red-300 w-9/12 h-96'>
                <span>
                401 - Sorry, You Are Not Authorised To View This Page!!
                </span> 
            </div>
        </div>
    )
}

export default UnAuthorised