import React from 'react'
import Loader from '../components/common/Loader'
import AuthGuard from '../components/layouts/AuthGuard'

function page() {
    return (
        <AuthGuard >
            <Loader />
        </AuthGuard>
    )
}

export default page