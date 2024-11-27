import Image from "next/image";

interface LogoProps {
    className?: string;
    height: number;
    width: number;
}

const Logo : React.FC <LogoProps> = ({ className, height, width }) => {
    return (
        <Image src="/logo.svg" alt="Logo" className={className} width={width} height={height} />
    );
}

export default Logo;