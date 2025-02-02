"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
    className?: string;
    height: number;
    width: number;
}

const Logo : React.FC <LogoProps> = ({ className, height, width }) => {
    const router = useRouter();

    return (
        <Image src="/logo.svg" alt="Logo" onClick={() => router.push("/")} className={className + " cursor-pointer"} width={width} height={height} />
    );
}

export default Logo;