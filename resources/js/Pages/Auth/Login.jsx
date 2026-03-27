import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button, Input, Checkbox, Form, Card, Alert } from 'antd';
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const onFinish = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden font-sans">
            <Head title="Login - SmartExpense" />

            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
                style={{ 
                    backgroundImage: 'url("https://images.unsplash.com/photo-1579621970795-87faff2f9050?q=80&w=2070&auto=format&fit=crop")',
                    filter: 'brightness(0.5) contrast(1.1)' 
                }}
            />
            
            {/* Ambient Blobs for extra premium feel */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sage-500/20 rounded-full blur-[120px] z-0 animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-clay-500/10 rounded-full blur-[120px] z-0"></div>

            <div className="relative z-10 w-full max-w-md px-4">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-20 h-20 bg-sage-700/80 rounded-3xl flex items-center justify-center shadow-2xl mb-5 border border-sage-500/30 backdrop-blur-md">
                        <span className="text-sand-200 font-bold text-4xl">S</span>
                    </div>
                    <h1 className="text-4xl font-bold text-sand-100 tracking-tighter drop-shadow-xl">SmartExpense</h1>
                    <div className="h-1 w-12 bg-sage-500 mt-2 rounded-full"></div>
                    <p className="text-sand-400 mt-4 font-bold uppercase tracking-[0.2em] text-xs">Premium Earthy Logic</p>
                </div>

                {/* Login Card - Solid Earthy Style */}
                <div className="overflow-hidden border border-sage-800/50 shadow-[0_0_50px_rgba(45,41,34,0.5)] bg-earth-900/80 backdrop-blur-2xl rounded-[2.5rem] p-10">
                    {status && (
                        <div className="mb-8 p-4 rounded-xl bg-sage-900/50 border border-sage-700/50 text-sage-200 text-sm flex items-center gap-3">
                            <div className="w-2 h-2 bg-sage-400 rounded-full animate-pulse"></div>
                            {status}
                        </div>
                    )}

                    <form onSubmit={onFinish} className="space-y-8">
                        <div>
                            <label className="block text-sand-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-3 ml-1">
                                Identifiant / Email
                            </label>
                            <Input 
                                size="large"
                                prefix={<MailOutlined className="text-sage-600/60" />} 
                                placeholder="admin@admin.com" 
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="earth-input"
                            />
                            {errors.email && <div className="text-clay-500 text-[11px] mt-2 ml-1 font-bold italic">{errors.email}</div>}
                        </div>

                        <div>
                            <label className="block text-sand-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-3 ml-1">
                                Mot de Passe
                            </label>
                            <Input.Password 
                                size="large"
                                prefix={<LockOutlined className="text-sage-600/60" />} 
                                placeholder="••••••••" 
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="earth-input"
                            />
                            {errors.password && <div className="text-clay-500 text-[11px] mt-2 ml-1 font-bold italic">{errors.password}</div>}
                        </div>

                        <div className="flex items-center justify-between text-xs font-bold text-sand-500/60 transition-all">
                            <Checkbox 
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                                className="earth-checkbox"
                            >
                                <span className="text-[10px] uppercase tracking-wider">Mémoriser</span>
                            </Checkbox>
                            <a href="#" className="hover:text-sage-400 uppercase tracking-wider text-[10px] border-b border-sand-500/20 pb-0.5">
                                Perdu ?
                            </a>
                        </div>

                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            block 
                            disabled={processing}
                            className="bg-sage-600 hover:bg-sage-500! border-none h-16 rounded-2xl font-bold text-base shadow-2xl uppercase tracking-[0.3em] transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Log In
                        </Button>
                    </form>
                </div>

                {/* Footer Credits */}
                <p className="mt-12 text-center text-sand-500/20 text-[9px] font-black uppercase tracking-[0.4em]">
                    &copy; 2026 SmartExpense &bull; Excellence Financi&egrave;re
                </p>
            </div>

            <style>{`
                .earth-input {
                    background-color: rgba(30, 27, 22, 0.6) !important;
                    border: 1px solid rgba(138, 154, 91, 0.2) !important;
                    color: #f1ebd7 !important;
                    height: 60px !important;
                    border-radius: 18px !important;
                    transition: all 0.3s ease !important;
                }
                .earth-input:hover {
                    border-color: rgba(138, 154, 91, 0.5) !important;
                    background-color: rgba(45, 41, 34, 0.8) !important;
                }
                .earth-input:focus, .ant-input-affix-wrapper-focused {
                    border-color: #8a9a5b !important;
                    background-color: #2d2922 !important;
                    box-shadow: 0 0 0 4px rgba(138, 154, 91, 0.1) !important;
                }
                .earth-input .ant-input {
                    background: transparent !important;
                    color: #f1ebd7 !important;
                    font-weight: 600 !important;
                }
                .earth-input ::placeholder {
                    color: rgba(210, 180, 140, 0.2) !important;
                    font-weight: 500 !important;
                }
                .earth-checkbox .ant-checkbox-inner {
                    background-color: #2d2922 !important;
                    border-color: #4a4435 !important;
                    border-radius: 4px !important;
                }
                .earth-checkbox .ant-checkbox-checked .ant-checkbox-inner {
                    background-color: #8a9a5b !important;
                    border-color: #8a9a5b !important;
                }
                .ant-btn-primary:hover {
                    background-color: #708249 !important;
                }
            `}</style>
        </div>
    );
}
