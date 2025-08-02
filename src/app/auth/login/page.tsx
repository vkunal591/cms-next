'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Post } from '@/hooks/apiUtils';
import Image from 'next/image';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false);
    const { login } = useAuth();
    const router = useRouter();

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const endpoint = '/api/auth/login';
            const response: any = await Post(endpoint, { email, password }, 5000, false);

            if (response?.success && response?.data) {
                const { accessToken, refreshToken, user } = response.data;
                login(accessToken, refreshToken, user);
                router.push('/dashboard');
            } else {
                setError(response?.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative overflow-hidden h-screen">
            <div className="grid grid-cols-12 gap-3 h-screen bg-white dark:bg-gray-800">
                <div className="xl:col-span-4 lg:col-span-4 col-span-12 bg-dark lg:block hidden relative overflow-hidden">
                    <Image width={1600} height={900} alt='LoginBg' className='absolute object-cover  h-full w-full' src={'/assets/images/loginbg.jpg'} />
                    <div className='absolute w-full h-full  bg-black/40' />
                    <div className="flex justify-center h-screen items-center z-10 relative">
                        <div className="xl:w-7/12 xl:px-0 px-6">
                            <h2 className="text-white text-[40px] font-bold leading-[normal]">
                                Welcome to<br />CMS
                            </h2>
                            <p className="opacity-75 text-white my-4 text-base font-medium">
                                CMS helps developers to build organized and well coded dashboards full of beautiful and rich modules.
                            </p>
                            <button type="button" className="group relative flex items-stretch justify-center p-0.5 text-center font-medium bg-primary hover:bg-primaryemphasis text-white rounded-lg mt-6">
                                <span className="flex items-center gap-2 transition-all duration-150 justify-center rounded-md px-4 py-2 text-sm">Learn More</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-8 lg:col-span-8 col-span-12 sm:px-12 px-4">
                    <div className="flex h-screen items-center px-3 lg:justify-start justify-center">
                        <div className="max-w-[420px] w-full mx-auto">
                            <a href="/">
                                <Image
                                    alt="materilm"
                                    loading="lazy"
                                    width="400"
                                    height="290"
                                    className="w-16 drop-shadow-white drop-shadow "
                                    src="/assets/images/logo.svg"
                                />
                            </a>
                            <h3 className="text-2xl font-bold my-3">Sign In</h3>
                            <p className="text-darklink text-sm font-medium">Your Admin Dashboard</p>
                            <div className=" justify-between gap-8 my-6 hidden">
                                <a className="px-4 py-2.5 border border-ld flex gap-2 items-center w-full rounded-md text-center justify-center text-ld text-primary-ld" href="/">
                                    <img alt="google" loading="lazy" width="18" height="18" src="/_next/static/media/google-icon.b28e737a.svg" />
                                    Google
                                </a>
                                <a className="px-4 py-2.5 border border-ld flex gap-2 items-center w-full rounded-md text-center justify-center text-ld text-primary-ld" href="/">
                                    <img alt="facebook" loading="lazy" width="18" height="18" src="/_next/static/media/facebook-icon.451e5a08.svg" />
                                    Facebook
                                </a>
                            </div>
                            <div className="relative w-full items-center justify-center hidden">
                                <hr className="my-3 h-px w-full border-0 bg-border dark:bg-darkborder !border-t !border-ld !bg-transparent" />
                                <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-base font-medium text-dark dark:bg-darkgray dark:text-white">or sign in with</span>
                            </div>

                            {/* ✅ Controlled Form */}
                            <form className="mt-6" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="text-sm font-semibold text-gray-900 dark:text-white" htmlFor="email">Email</label>
                                    <input
                                        className="block w-full border border-gray-300 bg-gray-50 text-gray-900 p-2.5 text-sm rounded-lg"
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="text-sm font-semibold text-gray-900 dark:text-white" htmlFor="password">Password</label>
                                    <input
                                        className="block w-full border border-gray-300 bg-gray-50 text-gray-900 p-2.5 text-sm rounded-lg"
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="flex justify-between my-5">
                                    <div className="flex items-center gap-2">
                                        <input
                                            className="rounded border-2 cursor-pointer"
                                            id="remember"
                                            type="checkbox"
                                            checked={keepLoggedIn}
                                            onChange={(e) => setKeepLoggedIn(e.target.checked)}
                                        />
                                        <label className="text-sm text-gray-900 dark:text-white" htmlFor="remember">Remember this Device</label>
                                    </div>
                                    <a className="text-primary text-sm font-medium" href="/auth/auth1/forgot-password">Forgot Password?</a>
                                </div>

                                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative flex items-stretch justify-center p-0.5 text-center font-medium bg-primary hover:bg-primaryemphasis text-white rounded-lg w-full"
                                >
                                    <span className="flex items-center gap-2 transition-all duration-150 justify-center rounded-md px-4 py-2 text-sm">
                                        {loading ? 'Signing in...' : 'Sign in'}
                                    </span>
                                </button>
                            </form>

                            <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
                                <p>New to CMS?</p>
                                <a className="text-primary text-sm font-medium" href="/auth/auth1/register">Create an account</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
