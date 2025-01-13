function cardsSlidersInit() {
    // слайдеры с двумя видимыми карточками 
    const sliders2Cards = document.querySelectorAll('[data-js="slider2Cards"]')

    if(sliders2Cards.length > 0) {

        sliders2Cards.forEach(slider2Cards => {
            const sliderPrev = slider2Cards.querySelector('[data-js="sliderPrev"]')
            const sliderNext = slider2Cards.querySelector('[data-js="sliderNext"]')
        
            const slider2CardsEx = new Swiper(slider2Cards, {
                slidesPerView: 1,
                allowTouchMove: true,
                spaceBetween: 16, 
                loop: false,
                navigation: {
                    nextEl: sliderNext,
                    prevEl: sliderPrev,
                },
                breakpoints: {
                    769: {
                        slidesPerView: 2
                    },
                    2300: {
                        slidesPerView: 3
                    }
                }
            })
        })
    
    }

    // слайдеры с четырьмя видимыми карточками 
    const sliders4Cards = document.querySelectorAll('[data-js="slider4Cards"]')

    if(sliders4Cards.length > 0) {

        sliders4Cards.forEach(slider4Cards => {
            const sliderPrev = slider4Cards.querySelector('[data-js="sliderPrev"]')
            const sliderNext = slider4Cards.querySelector('[data-js="sliderNext"]')
        
            const slider4CardsEx = new Swiper(slider4Cards, {
                slidesPerView: 1.2,
                allowTouchMove: true,
                spaceBetween: 16, 
                loop: false,
                navigation: {
                    nextEl: sliderNext,
                    prevEl: sliderPrev,
                },
                breakpoints: {
                    501: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 3
                    },
                    1421: {
                        slidesPerView: 4
                    },
                    2300: {
                        slidesPerView: 6
                    }
                }
            })
        })
    
    }

}