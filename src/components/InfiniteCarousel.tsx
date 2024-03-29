import React, {useEffect, useRef, useState} from 'react'
import {CarouselImage} from '../Interfaces/CarouselImage'

interface ImageCarouselProps {
    images: CarouselImage[];
    height?: string;
    width?: string;
    imageFit?: 'cover' | 'contain';
    customClass?: string;
}

const renderImage = (image: CarouselImage) => (
    <img src={image.url}
         key={image.id}
         loading="lazy"
         className="h-full w-full object-cover snap-always snap-center"
         alt=""/>
)

const InfiniteCarousel: React.FC<ImageCarouselProps> = ({images}) => {
    const slides = images
    const [currentIndex, setCurrentIndex] = useState(0)
    const maxSlidesToShow = 10 // Adjust this number based on your preference
    const carouselRef = useRef<HTMLDivElement>(null)
    const [isChangingSlide, setIsChangingSlide] = useState(false) // Flag to indicate whether a slide change is in progress
    const [timer, setTimer] = useState<any>(null) // Flag to indicate whether a slide change is in progress

    const updateDisplayedSlides = (index: number) => {
        const start = index - Math.floor(maxSlidesToShow / 2)
        const end = index + Math.ceil(maxSlidesToShow / 2)
        return slides.slice(start < 0 ? 0 : start, end)
    }

    const nextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
    }

    const prevSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
    }

    const displayedSlides = updateDisplayedSlides(currentIndex)

    useEffect(() => {
        if (carouselRef.current && images.length > 0) {
            const imageWidth =
                (carouselRef.current.firstChild as HTMLElement)?.clientWidth || 0;
            carouselRef.current.scrollLeft = imageWidth;
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (isChangingSlide) {
                return
            }

            setIsChangingSlide(() => true)

            if (timer) {
                window.clearTimeout(timer)
            }

            setTimer(setTimeout(() => setIsChangingSlide(false), 1000))

            if (event.deltaX > 0) {
                nextSlide()

                return
            }

            prevSlide()
        }

        window.addEventListener('wheel', handleWheel)

        return () => {
            window.removeEventListener('wheel', handleWheel)
        }
    }, [nextSlide, prevSlide])

    return (
        <div className="flex w-full snap-x snap-mandatory overflow-x-auto h-96 overscroll-none"
             ref={carouselRef}>
            {displayedSlides.map((slide, index) => renderImage(slide))}
        </div>
    )
}

export default InfiniteCarousel