'use client'

import { Button } from '@/components/general'
import { SlideType } from './Banner.interfaces'
import { StrapImage } from '@/utils/nextrapi/components/StrapiImage'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useEffect, useState } from 'react'

export default function Slide({ slides }: { slides: Array<SlideType> }) {
    const [isSplideLoaded, setIsSplideLoaded] = useState(false)

    useEffect(() => {
        setIsSplideLoaded(true)
    }, [])

    return (
        <>
            {isSplideLoaded ? (
                <Splide
                    options={{
                        type: 'loop',
                        arrows: false,
                        pagination: true,
                        classes: {
                            pagination: 'splide__pagination banner__pagination',
                        },
                    }}
                >
                    {slides?.map((slide, i) => {
                        return (
                            <SplideSlide
                                className="banner__slide"
                                key={`slide-item-${slide?.image?.data?.attributes?.url}-${i}`}
                            >
                                <article>
                                    {slide?.title ? (
                                        <h3>
                                            {slide?.title}{' '}
                                            {slide?.subtitle ? (
                                                <span>{slide?.subtitle}</span>
                                            ) : null}
                                        </h3>
                                    ) : null}
                                    {slide?.description ? (
                                        <p>{slide?.description}</p>
                                    ) : null}
                                    <Button
                                        type="link"
                                        styleType="default"
                                        href={slide?.button_url}
                                        target="_self"
                                    >
                                        {slide?.button_title}
                                    </Button>
                                </article>
                                {slide?.image ? (
                                    <figure>
                                        <StrapImage
                                            src={
                                                slide?.image?.data?.attributes
                                                    ?.url
                                            }
                                            width={
                                                slide?.image?.data?.attributes
                                                    ?.width
                                            }
                                            height={
                                                slide?.image?.data?.attributes
                                                    ?.height
                                            }
                                            alt="Banner"
                                            priority
                                        />
                                    </figure>
                                ) : null}
                            </SplideSlide>
                        )
                    })}
                </Splide>
            ) : (
                <div className="banner__slide">
                    <article>
                        {slides[0]?.title ? (
                            <h3>
                                {slides[0]?.title}{' '}
                                {slides[0]?.subtitle ? (
                                    <span>{slides[0]?.subtitle}</span>
                                ) : null}
                            </h3>
                        ) : null}
                        {slides[0]?.description ? (
                            <p>{slides[0]?.description}</p>
                        ) : null}
                        <Button
                            type="link"
                            styleType="default"
                            href={slides[0]?.button_url}
                            target="_self"
                        >
                            {slides[0]?.button_title}
                        </Button>
                    </article>
                    {slides[0]?.image ? (
                        <figure>
                            <StrapImage
                                src={slides[0]?.image?.data?.attributes?.url}
                                width={
                                    slides[0]?.image?.data?.attributes?.width
                                }
                                height={
                                    slides[0]?.image?.data?.attributes?.height
                                }
                                alt="Banner"
                            />
                        </figure>
                    ) : null}
                </div>
            )}
        </>
    )
}
