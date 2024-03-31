import {ImageFitTypes} from './ImageFit'

interface ImageCarouselProps {
    images: string[]
    height?: string
    width?: string
    imageFitType?: ImageFitTypes
    customClass?: string
}

export default ImageCarouselProps