import {ImageFitTypes} from '../Interfaces/ImageFit'
import InfiniteCarouselConfig from '../config/infiniteCarousel'

export const getFitClass = (key: ImageFitTypes) => Object.keys(InfiniteCarouselConfig.IMAGE_FIT_TYPES).includes(key)
    ? InfiniteCarouselConfig.IMAGE_FIT_TYPES[key]
    : InfiniteCarouselConfig.IMAGE_FIT_TYPES.DEFAULT

export  const loadImages = (loadedImagesSetRef: any) => (imageUrls: string[]) => {
    imageUrls.forEach((url) => {
        if (!loadedImagesSetRef.current.has(url)) {
            const img = new Image()
            img.src = url
            loadedImagesSetRef.current.add(url)
        }
    })
}

export const calculateScrollLeft = (currentScrollLeft:number, max: number, containerWidth: number) => {
    if (currentScrollLeft === (max + 1) * containerWidth) {
        return containerWidth
    }

    if (!currentScrollLeft) {
        return max * containerWidth
    }

    return null
}