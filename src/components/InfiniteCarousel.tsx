import React, {useEffect, useRef, useState} from 'react'
import InfiniteCarouselConfig from '../config/infiniteCarousel'
import ImageCarouselProps from '../Interfaces/ImageCarouselProps'
import InfiniteCarouselImage from './InfiniteCarouselImage'
import {calculateScrollLeft, getFitClass, loadImages} from '../helpers/utils'

const InfiniteCarousel: React.FC<ImageCarouselProps> = ({
                                                            images,
                                                            height = 'h-full',
                                                            width = 'w-full',
                                                            imageFitType = 'DEFAULT',
                                                            customClass = ''
                                                        }) => {
    const carouselRef = useRef<HTMLDivElement>(null)
    const currentThreshHold = useRef<number>(1)
    const timeoutRef = useRef<number | null>(null)
    const loadedImagesSetRef = useRef(new Set<string>())
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const onMouseDown = (event: React.MouseEvent) => {
        setIsDragging(true)
        setStartX(event.pageX - carouselRef.current!.offsetLeft)
        setScrollLeft(carouselRef.current!.scrollLeft)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }

        carouselRef.current!.style.scrollSnapType = 'none'
    }

    const onMouseMove = (event: MouseEvent) => {
        if (!isDragging) {
            return
        }

        event.preventDefault()
        const x = event.pageX - carouselRef.current!.offsetLeft
        const walk = (x - startX) * 2 // *2 to make the drag more pronounced
        carouselRef.current!.scrollLeft = scrollLeft - walk
    }

    const onMouseUp = () => {
        setIsDragging(false)
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)

        if (!carouselRef.current) {
            return
        }

        const containerWidth = carouselRef.current.clientWidth
        const currentScrollPosition = carouselRef.current.scrollLeft
        const imageIndex = Math.round(currentScrollPosition / containerWidth)
        carouselRef.current.scrollTo({
            left: imageIndex * containerWidth,
            behavior: 'smooth'
        })

        timeoutRef.current = window.setTimeout(() => {
            if (!carouselRef.current) {
                return
            }

            carouselRef.current.style.scrollSnapType = 'x mandatory'
        }, 600)
    }

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [isDragging, startX, scrollLeft])

    useEffect(() => {
        if (!images.length) {
            return
        }

        const from = images.slice(0, InfiniteCarouselConfig.PRE_LOAD_IMAGES)
        const to = images.slice(-InfiniteCarouselConfig.PRE_LOAD_IMAGES)
        const combined = [...from, ...to]
        loadImages(loadedImagesSetRef)(Array.from(new Set<string>(combined)))
    }, [])

    useEffect(() => {
        if (!carouselRef.current || !images.length) {
            return
        }

        carouselRef.current.scrollLeft = (carouselRef.current.firstChild as HTMLElement)?.clientWidth || 0
    }, [])

    useEffect(() => {
        const carouselElement = carouselRef.current

        const onScroll = () => {
            if (!carouselElement) {
                return
            }

            const currentScrollLeft = carouselElement.scrollLeft
            const containerWidth = carouselElement.clientWidth
            const shouldLoadMoreForwardImages =
                carouselElement.clientWidth *
                currentThreshHold.current *
                InfiniteCarouselConfig.PRE_LOAD_IMAGES *
                InfiniteCarouselConfig.SCROLL_THRESHOLD_PERCENTAGE <
                carouselElement.scrollLeft
            const hasAlreadyLooped =
                currentThreshHold.current > images.length / InfiniteCarouselConfig.CONSECUTIVE_LOAD_IMAGES

            if (shouldLoadMoreForwardImages && !hasAlreadyLooped) {
                const fromIndex = currentThreshHold.current * InfiniteCarouselConfig.CONSECUTIVE_LOAD_IMAGES
                const toIndex =
                    (currentThreshHold.current + 1) * InfiniteCarouselConfig.CONSECUTIVE_LOAD_IMAGES
                const imageUrls = images.slice(fromIndex, toIndex)

                loadImages(imageUrls)
                currentThreshHold.current++
            }

            const newLeft = calculateScrollLeft(currentScrollLeft, images.length, containerWidth)
            if (newLeft !== null) {
                carouselElement.scrollLeft = newLeft
            }
        }

        carouselElement?.addEventListener('wheel', onScroll)
        return () => carouselElement?.removeEventListener('wheel', onScroll)
    }, [images])

    const slideClass = `${width} ${height} ${getFitClass(imageFitType)} snap-always snap-start shrink-0 ${customClass}`

    return <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory h-full w-full mx:auto overflow-x-auto overscroll-y-none scrollbar-none"
        onMouseDown={onMouseDown}
    >
        <InfiniteCarouselImage key={`img-${293478 + 1}`} image={{url: images[images.length - 1], id: 1298324}}
                               cssClass={slideClass}/>
        {images.map(
            (url, id) => <InfiniteCarouselImage key={`img-${id + 1}`} image={{url, id}} cssClass={slideClass}/>
        )}
        <InfiniteCarouselImage key={`img-${2293478 + 1}`} image={{url: images[0], id: 12983324}} cssClass={slideClass}/>
    </div>
}

export default InfiniteCarousel