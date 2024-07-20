import Image, { ImageProps } from 'next/image'

const StrapImage = (props: ImageProps) => {
    return (
        <Image
            {...props}
            src={`http://strapi:1337${props?.src}`}
            width={props?.width}
            height={props?.height}
            alt={props?.alt}
        />
    )
}

export { StrapImage }
