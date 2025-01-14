function cardsSlidersInit() {
    // слайдеры с двумя видимыми карточками 
    const sliders2Cards = document.querySelectorAll('[data-js="slider2Cards"]')

    if(sliders2Cards.length > 0) {

        sliders2Cards.forEach(slider2Cards => {
            const sliderPrev = slider2Cards.querySelector('[data-js="sliderPrev"]')
            const sliderNext = slider2Cards.querySelector('[data-js="sliderNext"]')
        
            const slider2CardsEx = new Swiper(slider2Cards, {
                slidesPerView: 1.1,
                allowTouchMove: true,
                spaceBetween: 8, 
                loop: false,
                navigation: {
                    nextEl: sliderNext,
                    prevEl: sliderPrev,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 1.5,
                        spaceBetween: 16
                    },
                    1250: {
                        slidesPerView: 2,
                        spaceBetween: 16
                    },
                    2300: {
                        slidesPerView: 3,
                        spaceBetween: 16
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
                slidesPerView: 1.1,
                allowTouchMove: true,
                spaceBetween: 8,
                loop: false,
                navigation: {
                    nextEl: sliderNext,
                    prevEl: sliderPrev,
                },
                breakpoints: {
                    501: {
                        slidesPerView: 2,
                        spaceBetween: 16
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 16
                    },
                    1421: {
                        slidesPerView: 4,
                        spaceBetween: 16
                    },
                    2300: {
                        slidesPerView: 6,
                        spaceBetween: 16
                    }
                }
            })
        })
    
    }

}