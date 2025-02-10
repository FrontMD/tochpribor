function teamSection() {
    const teamSectionSliders = document.querySelectorAll('[data-js="teamSectionSlider"]');
    const vw = window.innerWidth

    if(teamSectionSliders.length < 1 || vw > 767) return

    teamSectionSliders.forEach(teamSectionSlider => {
        const sliderPrev = teamSectionSlider.querySelector('[data-js="sliderPrev"]')
        const sliderNext = teamSectionSlider.querySelector('[data-js="sliderNext"]')
    
        const teamSectionSliderEx = new Swiper(teamSectionSlider, {
            slidesPerView: 1.4,
            allowTouchMove: true,
            spaceBetween: 8,
            loop: false,
            navigation: {
                nextEl: sliderNext,
                prevEl: sliderPrev,
            },
            breakpoints: {
                501: {
                    slidesPerView: 1.8,
                },
            }
        })
    })

}