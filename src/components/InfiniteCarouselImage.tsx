import React from 'react'
import {CarouselImage} from '../Interfaces/CarouselImage'

const InfiniteCarouselImage = ({ image, cssClass, onLoad }: {image: CarouselImage, cssClass: string, onLoad?: () => void}) => (
    <img
        key={image.id}
        src={image.url}
        onLoad={onLoad}
        alt={` ${image.id}`}
        className={cssClass}
        loading="lazy"
    />
)

export default InfiniteCarouselImage