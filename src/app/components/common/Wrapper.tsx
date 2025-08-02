import React from 'react'
import { Sidebar } from './Sidebar'

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Sidebar />
            <div className='mt-[9.6rem]'>
                {children}
            </div>
        </>
    )
}

export default Wrapper