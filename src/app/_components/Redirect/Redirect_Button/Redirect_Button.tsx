"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface RedirectButtonProps {
    className?: string;
    href: string;
    children?: React.ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon";
}

const RedirectButton : React.FC<RedirectButtonProps> = ({ className, children, href, type, variant, size }) => {
    const router = useRouter();
    
    return (
        <Button type={type} variant={variant} size={size} onClick={() => router.push(href)} className={className}>
            {children}
        </Button>
    );
}

export default RedirectButton;