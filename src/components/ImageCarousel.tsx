import React from 'react'

interface ImageCarouselProps {
    images: string[]
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
                                                         images
                                                     }) => {
    return (
        <div>Hi carousel</div>
    )
}

export default ImageCarousel