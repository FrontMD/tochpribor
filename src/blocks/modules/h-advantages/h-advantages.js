function hAdvantagesSlider() {
    const hAdvantagesSlider = document.querySelector('[data-js="hAdvantagesSlider"]');
    const vw = window.innerWidth

    if(!hAdvantagesSlider || vw > 1023) return

    const sliderPrev = hAdvantagesSlider.querySelector('[data-js="sliderPrev"]')
    const sliderNext = hAdvantagesSlider.querySelector('[data-js="sliderNext"]')

    const hAdvantagesSliderEx = new Swiper(hAdvantagesSlider, {
        slidesPerView: 1.2,
        allowTouchMove: true,
        spaceBetween: 8,
        loop: false,
        navigation: {
            nextEl: sliderNext,
            prevEl: sliderPrev,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
        }
    })
}