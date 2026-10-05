'use client'

import { apiRequest, endSession } from "../lib/actions"

const LogoutButton = () => {
    return (
        <div><button className='bg-blue-400 p-2 text-white rounded-lg w-40' onClick={endSession}>Logout</button></div>
    )
}

export default LogoutButton