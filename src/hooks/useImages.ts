import {useState, useEffect} from 'react'
import {CarouselImage} from '../Interfaces/CarouselImage'

const useImages = (url: string): { images: CarouselImage[]; isLoading: boolean, errorMessage: string | null } => {
    const [images, setImages] = useState<CarouselImage[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        const fetchImages = async () => {
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error('Failed to fetch images')
                }
                const data: CarouselImage[] = await response.json()
                if (isMounted) {
                    setImages(data)
                    setIsLoading(false)
                }
            } catch (error: any) {
                setErrorMessage(error?.message ?? 'Oops! Something went wrong')
                setIsLoading(false)
            }
        }

        if (!images.length) {
            fetchImages()
        }

        return () => {
            isMounted = false
        }
    }, [url, images, errorMessage])

    return {images, isLoading, errorMessage}
}

export default useImages