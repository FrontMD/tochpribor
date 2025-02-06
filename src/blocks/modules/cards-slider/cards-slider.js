function cardsSlidersInit() {
    // слайдеры с двумя видимыми карточками 
    const sliders2Cards = document.querySelectorAll('[data-js="slider2Cards"]')

    if(sliders2Cards.length > 0) {

        sliders2Cards.forEach(slider2Cards => {
            const sliderPrev = slider2Cards.querySelector('[data-js="sliderPrev"]')
            const sliderNext = slider2Cards.querySelector('[data-js="sliderNext"]')
            const parallax = slider2Cards.hasAttribute('data-parallax') 
            
            const slider2CardsEx = new Swiper(slider2Cards, {
                slidesPerView: 1.1,
                allowTouchMove: true,
                spaceBetween: 8,
                parallax: parallax, 
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

        // слайдеры с тремя видимыми карточками 
        const sliders3Cards = document.querySelectorAll('[data-js="slider3Cards"]')

        if(sliders3Cards.length > 0) {
    
            sliders3Cards.forEach(slider3Cards => {
                const sliderPrev = slider3Cards.querySelector('[data-js="sliderPrev"]')
                const sliderNext = slider3Cards.querySelector('[data-js="sliderNext"]')
                const parallax = slider3Cards.hasAttribute('data-parallax') 
                
                const slider3CardsEx = new Swiper(slider3Cards, {
                    slidesPerView: 1.2,
                    allowTouchMove: true,
                    spaceBetween: 16,
                    parallax: parallax, 
                    loop: false,
                    navigation: {
                        nextEl: sliderNext,
                        prevEl: sliderPrev,
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 16
                        },
                        1250: {
                            slidesPerView: 3,
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
            const parallax = slider4Cards.hasAttribute('data-parallax') 
        
            const slider4CardsEx = new Swiper(slider4Cards, {
                slidesPerView: 1.1,
                allowTouchMove: true,
                spaceBetween: 8,
                parallax: parallax,
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

    // слайдеры с шестью видимыми карточками 
    const sliders6Cards = document.querySelectorAll('[data-js="slider6Cards"]')

    if(sliders6Cards.length > 0) {

        sliders6Cards.forEach(slider6Cards => {
            const sliderPrev = slider6Cards.querySelector('[data-js="sliderPrev"]')
            const sliderNext = slider6Cards.querySelector('[data-js="sliderNext"]')
            const parallax = slider6Cards.hasAttribute('data-parallax')
        
            const slider6CardsEx = new Swiper(slider6Cards, {
                slidesPerView: 2,
                allowTouchMove: true,
                spaceBetween: 8,
                parallax: parallax,
                loop: false,
                navigation: {
                    nextEl: sliderNext,
                    prevEl: sliderPrev,
                },
                breakpoints: {
                    501: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 16
                    },
                }
            })
        })
    
    }

}