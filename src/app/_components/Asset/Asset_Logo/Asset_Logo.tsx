import Image from "next/image";

interface AssetLogoProps {
    assetSymbol: string;
    height?: number;
    width?: number;
}

const AssetLogo : React.FC<AssetLogoProps> = ({ assetSymbol, height, width }) => {
    return (
        <Image
        src={`/image/asset/${assetSymbol}.webp`}
        alt={`Logo of ${assetSymbol}`}
        width={height}
        height={width}
        className="rounded-full"
      />
    )
}

export default AssetLogo;