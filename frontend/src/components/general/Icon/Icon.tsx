import Image from 'next/image'
import * as svgSheet from './svgSheet'

export function Icon({
    type,
    className,
}: {
    type: keyof typeof svgSheet
    className?: string
}) {
    const svgElement = svgSheet[type].default
    return (
        <Image
            className={className ? className : undefined}
            src={svgElement.src}
            width={svgElement.width}
            height={svgElement.height}
            alt={`Icon ${type}`}
            priority={false}
        />
    )
}
