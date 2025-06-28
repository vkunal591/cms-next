"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Post } from '@/hooks/apiUtils';

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
            const endpoint = '/api/auth/login'; // Adjust endpoint based on your API
            const response: any = await Post(endpoint, {
                email, password,
            }, 5000, false);

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
        <div className="relative min-h-screen flex flex-col justify-center bg-cover bg-center bg-[url('/images/backgrounds/login-bg.jpg')]">
            <div className="flex h-full justify-center items-center px-4">
                <div
                    data-testid="flowbite-card"
                    className="flex rounded-tw bg-white dark:bg-darkgray relative break-words flex-col card xl:max-w-6xl lg:max-w-3xl md:max-w-xl w-full border-none p-0 shadow-md dark:shadow-none"
                    style={{ borderRadius: '12px' }}
                >
                    <div className="flex h-full flex-col justify-center gap-2 p-0">
                        <div className="grid grid-cols-12">
                            <div className="xl:col-span-6 col-span-12 px-8 xl:border-e border-ld">
                                <div className="md:py-14 py-8 lg:px-6">
                                    <a href="/">
                                        <img
                                            alt="logo"
                                            loading="lazy"
                                            width="136"
                                            height="40"
                                            decoding="async"
                                            data-nimg="1"
                                            className="block"
                                            src="/next.svg"
                                            style={{ color: 'transparent' }}
                                        />
                                    </a>
                                    <h3 className="md:text-34 text-2xl text-primary md:my-8 my-5">Let's get you signed in</h3>
                                    <div className="flex justify-between gap-8 mb-6 md:mt-10 mt-5">
                                        <a
                                            className="px-4 py-3 shadow-tw border border-ld flex gap-2 items-center w-full rounded-md text-center justify-center text-ld hover:bg-sky hover:text-white dark:text-white dark:hover:bg-sky font-semibold"
                                            href="/auth/facebook"
                                        >
                                            <img
                                                alt="facebook"
                                                loading="lazy"
                                                width="18"
                                                height="18"
                                                decoding="async"
                                                data-nimg="1"
                                                src="/next.svg"
                                                style={{ color: 'transparent' }}
                                            />
                                            <span className="lg:flex hidden">Sign in with</span> Facebook
                                        </a>
                                        <a
                                            className="px-4 py-3 shadow-tw border border-ld flex gap-2 items-center w-full rounded-md text-center justify-center text-ld hover:bg-sky hover:text-white dark:text-white dark:hover:bg-sky font-semibold"
                                            href="/auth/google"
                                        >
                                            <img
                                                alt="google"
                                                loading="lazy"
                                                width="18"
                                                height="18"
                                                decoding="async"
                                                data-nimg="1"
                                                src="/next.svg"
                                                style={{ color: 'transparent' }}
                                            />
                                            <span className="lg:flex hidden">Sign in with</span> Google
                                        </a>
                                    </div>
                                    <div className="inline-flex relative w-full items-center justify-center">
                                        <hr
                                            className="my-3 h-px w-full border-0 bg-border dark:bg-darkborder !border-t !border-ld !bg-transparent text-bodytext"
                                            data-testid="flowbite-hr-text"
                                            role="separator"
                                        />
                                        <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 md:text-[15px] text-[13px] font-normal text-bodytext dark:bg-darkgray dark:text-white">
                                            Or sign in with email
                                        </span>
                                    </div>
                                    <form className="mt-6" onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <div className="mb-2 block">
                                                <label
                                                    className="text-sm font-semibold text-gray-900 dark:text-white"
                                                    data-testid="flowbite-label"
                                                    htmlFor="Email Address"
                                                >
                                                    Email Address
                                                </label>
                                            </div>
                                            <div className="flex form-control">
                                                <div className="relative w-full">
                                                    <input
                                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                                        id="Email Address"
                                                        placeholder="Enter your email"
                                                        type="text"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="mb-2 flex items-center justify-between">
                                                <label
                                                    className="text-sm font-semibold text-gray-900 dark:text-white"
                                                    data-testid="flowbite-label"
                                                    htmlFor="userpwd"
                                                >
                                                    Password
                                                </label>
                                                <a className="text-xs text-primary" href="/auth/auth2/forgot-password">
                                                    Forgot Password ?
                                                </a>
                                            </div>
                                            <div className="flex form-control">
                                                <div className="relative w-full">
                                                    <input
                                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                                        id="userpwd"
                                                        placeholder="Enter your password"
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {error && (
                                            <div className="mb-4 text-sm text-red-600 dark:text-red-400">
                                                {error}
                                            </div>
                                        )}
                                        <div className="flex justify-between my-5">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    className="rounded border-2 cursor-pointer text-primary checkbox"
                                                    id="accept"
                                                    type="checkbox"
                                                    checked={keepLoggedIn}
                                                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                                                    disabled={loading}
                                                />
                                                <label
                                                    className="text-sm text-gray-900 dark:text-white font-medium cursor-pointer"
                                                    data-testid="flowbite-label"
                                                    htmlFor="accept"
                                                >
                                                    Keep me logged in
                                                </label>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="group relative flex items-stretch justify-center p-0.5 text-center font-medium text-white rounded-md w-full bg-sky dark:bg-sky hover:bg-dark dark:hover:bg-dark disabled:opacity-50"
                                            disabled={loading}
                                        >
                                            <span className="flex items-center gap-2 transition-all duration-150 justify-center rounded-md px-4 py-2 text-sm">
                                                {loading ? 'Signing in...' : 'Sign in'}
                                            </span>
                                        </button>
                                    </form>
                                    <div className="flex gap-2 text-sm dark:text-white font-medium mt-6 items-center">
                                        <p>Don’t have an account yet?</p>
                                        <a
                                            className="text-primary text-sm font-semibold"
                                            href="/auth/auth2/register"
                                        >
                                            Sign Up Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:col-span-6 col-span-12 xl:block hidden">
                                <div className="max-w-md mx-auto h-full flex flex-col justify-center items-center boxed-auth">
                                    <img
                                        alt="auth"
                                        loading="lazy"
                                        width="479"
                                        height="446"
                                        decoding="async"
                                        data-nimg="1"
                                        className="max-w-[300px]"
                                        src="/_next/static/media/login-side.e05b5be1.png"
                                        style={{ color: 'transparent' }}
                                    />
                                    <div
                                        className="relative h-full w-full -mt-8"
                                        data-testid="carousel"
                                    >
                                        <div className="flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg snap-x overflow-hidden !overflow-x-hidden [overflow:-moz-scrollbars-none] [scrollbar-width:none] [&::-webkit-scrollbar]:[-webkit-appearance:none !important] [&::-webkit-scrollbar]:!hidden [&::-webkit-scrollbar]:!h-0 [&::-webkit-scrollbar]:!w-0 [&::-webkit-scrollbar]:!bg-transparent">
                                            <div
                                                className="w-full flex-shrink-0 transform cursor-grab snap-center"
                                                data-active="true"
                                                data-testid="carousel-item"
                                            >
                                                <div className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2 text-center">
                                                    <h5 className="text-22 my-6">Feature Rich 3D Charts</h5>
                                                    <p className="text-15 my-6 mt-3 leading-6">
                                                        Donec justo tortor, malesuada vitae faucibus ac,
                                                        tristique sit amet massa. Aliquam dignissim nec felis
                                                        quis imperdiet.
                                                    </p>
                                                    <button
                                                        type="button"
                                                        className="group relative flex items-stretch justify-center p-0.5 text-center font-medium bg-primary text-white hover:bg-primaryemphasis rounded-md w-fit mx-auto"
                                                    >
                                                        <span className="flex items-center gap-2 transition-all duration-150 justify-center rounded-md px-4 py-2 text-sm">
                                                            Learn More
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                className="w-full flex-shrink-0 transform cursor-grab snap-center"
                                                data-active="false"
                                                data-testid="carousel-item"
                                            >
                                                <div className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2 text-center">
                                                    <h5 className="text-22 my-6">Feature Rich 2D Charts</h5>
                                                    <p className="text-15 my-6 mt-3 leading-6">
                                                        Donec justo tortor, malesuada vitae faucibus ac,
                                                        tristique sit amet massa. Aliquam dignissim nec felis
                                                        quis imperdiet.
                                                    </p>
                                                    <button
                                                        type="button"
                                                        className="group relative flex items-stretch justify-center p-0.5 text-center font-medium bg-primary text-white hover:bg-primaryemphasis rounded-md w-fit mx-auto"
                                                    >
                                                        <span className="flex items-center gap-2 transition-all duration-150 justify-center rounded-md px-4 py-2 text-sm">
                                                            Learn More
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                className="w-full flex-shrink-0 transform cursor-grab snap-center"
                                                data-active="false"
                                                data-testid="carousel-item"
                                            >
                                                <div className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2 text-center">
                                                    <h5 className="text-22 my-6">Feature Rich 1D Charts</h5>
                                                    <p className="text-15 my-6 mt-3 leading-6">
                                                        Donec justo tortor, malesuada vitae faucibus ac,
                                                        tristique sit amet massa. Aliquam dignissim nec felis
                                                        quis imperdiet.
                                                    </p>
                                                    <button
                                                        type="button"
                                                        className="group relative flex items-stretch justify-center p-0.5 text-center font-medium bg-primary text-white hover:bg-primaryemphasis rounded-md w-fit mx-auto"
                                                    >
                                                        <span className="flex items-center gap-2 transition-all duration-150 justify-center rounded-md px-4 py-2 text-sm">
                                                            Learn More
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 space-x-3">
                                            <button
                                                className="h-3 w-3 rounded-full bg-primary dark:bg-primary"
                                                data-testid="carousel-indicator"
                                                aria-label="Slide 1"
                                            ></button>
                                            <button
                                                className="h-3 w-3 rounded-full bg-muted dark:bg-darkmuted"
                                                data-testid="carousel-indicator"
                                                aria-label="Slide 2"
                                            ></button>
                                            <button
                                                className="h-3 w-3 rounded-full bg-muted dark:bg-darkmuted"
                                                data-testid="carousel-indicator"
                                                aria-label="Slide 3"
                                            ></button>
                                        </div>
                                        <div className="absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none">
                                            <button
                                                className="group"
                                                data-testid="carousel-left-control"
                                                type="button"
                                                aria-label="Previous slide"
                                            >
                                                <span className="inline-flex sm:h-10 sm:w-10 h-0 w-0 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-white group-hover:bg-primary group-focus:outline-none group-focus:ring-0">
                                                    <svg
                                                        stroke="currentColor"
                                                        fill="none"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                        className="sm:h-6 sm:w-6 h-0 w-0 text-dark sm:h-4 sm:w-4 hover:text-white"
                                                        height="1em"
                                                        width="1em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 19l-7-7 7-7"
                                                        ></path>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        <div className="absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none">
                                            <button
                                                className="group"
                                                data-testid="carousel-right-control"
                                                type="button"
                                                aria-label="Next slide"
                                            >
                                                <span className="inline-flex sm:h-10 sm:w-10 h-0 w-0 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-white group-hover:bg-primary group-focus:outline-none group-focus:ring-0">
                                                    <svg
                                                        stroke="currentColor"
                                                        fill="none"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                        className="sm:h-6 sm:w-6 h-0 w-0 text-dark sm:h-4 sm:w-4 hover:text-white"
                                                        height="1em"
                                                        width="1em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9 5l7 7-7 7"
                                                        ></path>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;