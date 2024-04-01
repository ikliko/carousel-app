const InfiniteCarouselConfig = {
    PRE_LOAD_IMAGES: (process.env.REACT_APP_PRE_LOAD_IMAGES || 10) as number,
    CONSECUTIVE_LOAD_IMAGES: (process.env.REACT_APP_CONSECUTIVE_LOAD_IMAGES || 10) as number,
    SCROLL_THRESHOLD_PERCENTAGE: (process.env.REACT_APP_SCROLL_THRESHOLD_PERCENTAGE || 0.5) as number,
    IMAGE_FIT_TYPES: {
        COVER: 'object-cover',
        CONTAIN: 'object-contain',
        DEFAULT: 'COVER'
    }
}

export default InfiniteCarouselConfig