function cardsSlidersInit() {
    // слайдеры с двумя видимыми карточками 
    const sliders2Cards = document.querySelectorAll('[data-js="slider2Cards"]')

    if(sliders2Cards.length > 0) {

        sliders2Cards.forEach(slider2Cards => {
            const sliderPrev = slider2Cards.querySelector('[data-js="sliderPrev"]')
            const sliderNext = slider2Cards.querySelector('[data-js="sliderNext"]')
        
            const slider2CardsEx = new Swiper(slider2Cards, {
                slidesPerView: 2,
                allowTouchMove: true,
                spaceBetween: 16, 
                loop: false,
                navigation: {
                    nextEl: sliderNext,
                    prevEl: sliderPrev,
                }
            })
        })
    
    }

}