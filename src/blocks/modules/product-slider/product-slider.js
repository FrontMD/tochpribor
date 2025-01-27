function productSlider() {
    const productSlider = document.querySelector('[data-js="productSlider"]')

    if(!productSlider) return

    const productSliderSlider = productSlider.querySelector('[data-js="productSliderSlider"]')
    const productSliderTabs = productSlider.querySelector('[data-js="productSliderTabs"]')
    const thumbsPrev = productSliderTabs.querySelector('[data-js="sliderPrev"]')
    const thumbsNext = productSliderTabs.querySelector('[data-js="sliderNext"]')
    
    let productSliderTabsEx = new Swiper(productSliderTabs, {
        slidesPerView: 7.5,
        spaceBetween: 8,
        navigation: {
            nextEl: thumbsNext,
            prevEl: thumbsPrev,
        },
    })

    let productSliderSliderEx = new Swiper(productSliderSlider, {
        slidesPerView: 1,
        thumbs: {
            swiper: productSliderTabsEx
        },
    })

}