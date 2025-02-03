function homeIntro() {
    const homeIntro = document.querySelector('[data-js="homeIntro"]');

    if(!homeIntro) return

    const homeIntroSlider = homeIntro.querySelector('[data-js="homeIntroSlider"]');
    const homeIntroTabs = homeIntro.querySelector('[data-js="homeIntroTabs"]');
    const homeIntroInfoSlider = homeIntro.querySelector('[data-js="homeIntroInfoSlider"]');
    const tabsList = homeIntroTabs.querySelectorAll('[data-js="homeIntroTab"]');


    const homeIntroTabsEx = new Swiper(homeIntroTabs, {
        slidesPerView: 5,
        spaceBetween: 4,
    })

    const homeIntroInfoSliderEx = new Swiper(homeIntroInfoSlider, {
        slidesPerView: 1,
        allowTouchMove: false,
        effect: 'fade',
        thumbs: {
            swiper: homeIntroTabsEx
        },
    })

    const homeIntroSliderEx = new Swiper(homeIntroSlider, {
        slidesPerView: 1,
        allowTouchMove: false,
        effect: 'fade',
    })


    homeIntroInfoSliderEx.controller.control = [homeIntroSliderEx]

    // ищем все анимации
    const animContainers = homeIntroSlider.querySelectorAll('[data-js="homeIntroAnim"]');
    let renders = []

    animContainers.forEach((item, index) => {
        const animItem = lottie.loadAnimation({
            name: 'render' + index,
            wrapper: item,
            animType: 'canvas',
            loop: false,
            autoplay: false,
            path: 'public/renders/render-' + index + '/render.json'
        });
        animItem.setSpeed(0.8)

        renders.push(animItem)
    })

    renders.forEach((item, index) => {

        
        if(index == 0) {
            item.play()
        }


        // после окончания листаем слайдер и перематываем анимацию на определённый кадр, чтобы выглядело как изображение. все кроме 0
        item.addEventListener ('complete', () => {
            homeIntroInfoSliderEx.slideNext(10, true);
            if(index !== 0) {
                item.goToAndStop(10, true);
            }
        })
        
    })

    homeIntroSliderEx.on('slideChangeTransitionEnd', function(currentSlider) {
        renders.forEach(render => {
            render.goToAndStop(10, true);

        })

        const currentSlideIndex = currentSlider.realIndex

        renders[currentSlideIndex].play()
    });

    console.log(unlockBody)

}