function mediaSliderInit() {
    const mediaSliders = document.querySelectorAll('[data-js="mediaSlider"]')

    if(mediaSliders.length < 1) return

    mediaSliders.forEach(mediaSlider => {
        const sliderPrev = mediaSlider.querySelector('[data-js="sliderPrev"]')
        const sliderNext = mediaSlider.querySelector('[data-js="sliderNext"]')
        const sliderPagination = mediaSlider.querySelector('[data-js="sliderPagination"]')
        const sliderCurrentFraction = mediaSlider.querySelector('[data-js="sliderCurrentFraction"]')
        const sliderTotalFraction = mediaSlider.querySelector('[data-js="sliderTotalFraction"]')
        const slidesNumber = mediaSlider.querySelectorAll('.swiper-slide').length
    
        const mediaSliderEx = new Swiper(mediaSlider, {
            slidesPerView: 1,
            allowTouchMove: false,
            loop: true,
            navigation: {
                nextEl: sliderNext,
                prevEl: sliderPrev,
            },
            pagination: {
                el: sliderPagination,
                type: 'progressbar',
            },
        })
        
        mediaSliderEx.on('slideChange', function() {
            var current = mediaSliderEx.realIndex + 1;
            if (current > slidesNumber)
              current = 1;
            var idx = current < 10 ? ("0" + current) : current;
            var tdx = slidesNumber < 10 ? ("0" + slidesNumber) : slidesNumber;
            sliderCurrentFraction.innerHTML = idx;
            sliderTotalFraction.innerHTML = tdx;
        });

        mediaSliderEx.update()
    })
}