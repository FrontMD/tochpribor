function productSlider() {
    const productSlider = document.querySelector('[data-js="productSlider"]')

    if(!productSlider) return

    const productSliderSlider = productSlider.querySelector('[data-js="productSliderSlider"]')

    let productSliderSliderEx = new Swiper(productSliderSlider, {
        slidesPerView: 1
    })
}