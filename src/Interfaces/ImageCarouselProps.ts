import {ImageFitTypes} from './ImageFit'

interface ImageCarouselProps {
    images: string[]
    height?: string
    width?: string
    imageFit?: ImageFitTypes
    customClass?: string
}

export default ImageCarouselProps