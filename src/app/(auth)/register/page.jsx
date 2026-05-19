'use client';

import { Button, Input } from '@heroui/react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient, signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function Register() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    // Register with Email
    const handleRegister = async (e) => {
        e.preventDefault();

        setPasswordError('');

        const formData = new FormData(e.currentTarget);

        const registerData = Object.fromEntries(formData.entries());

        const password = registerData.password;

        // Password Validation
        if (!/[A-Z]/.test(password)) {
            setPasswordError(
                'Password must contain at least one uppercase letter'
            );

            return;
        }

        if (!/[a-z]/.test(password)) {
            setPasswordError(
                'Password must contain at least one lowercase letter'
            );

            return;
        }

        if (password.length < 6) {
            setPasswordError(
                'Password must be at least 6 characters long'
            );

            return;
        }

        setLoading(true);

        const { error } = await signUp.email({
            ...registerData,
        });

        setLoading(false);

        // Registration Failed
        if (error) {
            toast.error(error.message || 'Registration failed');
            return;
        }

        // Success
        toast.success('Registration successful');

        router.push('/login');
    };

    // Google Login
    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true);

            await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/',
            });

            toast.success('Google login successful');
        } catch (error) {
            toast.error('Google login failed');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col bg-slate-50 py-12">
            <div className="grow flex items-center justify-center p-4">
                <div className="w-full max-w-md">

                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">

                        {/* Decorative Blur */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                        {/* Title */}
                        <div className="text-center space-y-2 relative">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                Join <span className="text-blue-600">Mentora</span>
                            </h2>

                            <p className="text-slate-500 font-medium">
                                Create your account to start learning
                            </p>
                        </div>

                        {/* Google Login */}
                        <Button
                            onPress={handleGoogleLogin}
                            variant="bordered"
                            isLoading={googleLoading}
                            className="w-full h-12 font-bold rounded-2xl border-slate-200 hover:bg-slate-50 transition-colors gap-3"
                        >
                            <Image
                                width={20}
                                height={20}
                                src="https://www.google.com/favicon.ico"
                                alt="Google"
                                className="w-5 h-5"
                            />

                            Continue with Google
                        </Button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-100"></span>
                            </div>

                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
                                    Or register with email
                                </span>
                            </div>
                        </div>

                        {/* Form */}
                        <form
                            className="space-y-6"
                            onSubmit={handleRegister}
                        >
                            {/* Name */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-bold text-slate-700 ml-1"
                                >
                                    Full Name
                                </label>

                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
                                    <Input
                                        id="name"
                                        required
                                        placeholder="Enter your name"
                                        name="name"
                                        className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                                        style={{ paddingLeft: '2.75rem' }}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-bold text-slate-700 ml-1"
                                >
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
                                    <Input
                                        id="email"
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                                        style={{ paddingLeft: '2.75rem' }}
                                    />
                                </div>
                            </div>

                            {/* Photo URL */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="image"
                                    className="text-sm font-bold text-slate-700 ml-1"
                                >
                                    Photo URL
                                </label>

                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
                                    <Input
                                        id="image"
                                        type="url"
                                        name="image"
                                        placeholder="https://example.com/photo.jpg"
                                        className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                                        style={{ paddingLeft: '2.75rem' }}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-bold text-slate-700 ml-1"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
                                    <Input
                                        id="password"
                                        required
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                                        style={{ paddingLeft: '2.75rem' }}
                                    />
                                </div>

                                {/* Password Error */}
                                {passwordError && (
                                    <p className="text-red-500 text-sm font-medium ml-1">
                                        {passwordError}
                                    </p>
                                )}
                            </div>

                            {/* Register Button */}
                            <Button
                                color="primary"
                                type="submit"
                                isLoading={loading}
                                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group"
                            >
                                {!loading && (
                                    <>
                                        Create Account

                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Login Link */}
                        <div className="text-center pt-2">
                            <p className="text-sm text-slate-500 font-medium">
                                Already have an account?{' '}

                                <Link
                                    href="/login"
                                    className="text-blue-600 font-black hover:underline underline-offset-4 transition-all"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}