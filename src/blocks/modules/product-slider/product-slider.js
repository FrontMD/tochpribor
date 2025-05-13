function productSlider() {
    const productSlider = document.querySelector('[data-js="productSlider"]')

    if(!productSlider) return

    const productSliderSlider = productSlider.querySelector('[data-js="productSliderSlider"]')
    const productSliderTabs = productSlider.querySelector('[data-js="productSliderTabs"]')
    const thumbsPrev = productSliderTabs.querySelector('[data-js="sliderPrev"]')
    const thumbsNext = productSliderTabs.querySelector('[data-js="sliderNext"]')
    
    let productSliderTabsEx = new Swiper(productSliderTabs, {
        slidesPerView: 6,
        spaceBetween: 8,
        loop: true,
        navigation: {
            nextEl: thumbsNext,
            prevEl: thumbsPrev,
        },
        breakpoints: {
            501: {
                slidesPerView: 7.5
            }
        }
    })

    let productSliderSliderEx = new Swiper(productSliderSlider, {
        slidesPerView: 1,
        loop: true,
        thumbs: {
            swiper: productSliderTabsEx
        },
    })

}