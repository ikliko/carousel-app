import React from 'react'
import {CarouselImage} from '../Interfaces/CarouselImage'

const InfiniteCarouselImage = ({ image, cssClass }: {image: CarouselImage, cssClass: string}) => (
    <img
        key={image.id}
        src={image.url}
        alt={` ${image.id}`}
        className={cssClass}
        loading="lazy"
    />
)

export default InfiniteCarouselImage