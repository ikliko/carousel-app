const InfiniteCarouselConfig = {
    PRE_LOAD_IMAGES: process.env.REACT_APP_PRE_LOAD_IMAGES,
    CONSECUTIVE_LOAD_IMAGES: process.env.REACT_APP_CONSECUTIVE_LOAD_IMAGES,
    SCROLL_THRESHOLD_PERCENTAGE: process.env.REACT_APP_SCROLL_THRESHOLD_PERCENTAGE,
    IMAGE_FIT_TYPES: {
        COVER: 'object-cover',
        CONTAIN: 'object-contain',
        DEFAULT: 'COVER'
    }
}

export default InfiniteCarouselConfig