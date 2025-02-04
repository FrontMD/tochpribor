function homeIntro() {
    const homeIntro = document.querySelector('[data-js="homeIntro"]');

    if(!homeIntro) return

    lockBody()
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })

    const homeIntroSlider = homeIntro.querySelector('[data-js="homeIntroSlider"]');
    const homeIntroTabs = homeIntro.querySelector('[data-js="homeIntroTabs"]');
    const homeIntroInfoSlider = homeIntro.querySelector('[data-js="homeIntroInfoSlider"]');
    const progressBar = homeIntro.querySelector('[data-js="homeIntroProgressBar"]')
    const progressBarFill = homeIntro.querySelector('[data-js="homeIntroProgressBarFill"]')
    const homeIntroInfo = homeIntro.querySelector('[data-js="homeIntroInfo"]')

    //const tabsList = homeIntroTabs.querySelectorAll('[data-js="homeIntroTab"]');

    const homeIntroTabsEx = new Swiper(homeIntroTabs, {
        slidesPerView: 5,
        spaceBetween: 4,
    })

    const homeIntroInfoSliderEx = new Swiper(homeIntroInfoSlider, {
        slidesPerView: 1,
        allowTouchMove: false,
        effect: 'fade',
        mousewheel: {
            releaseOnEdges: true
        },
        thumbs: {
            swiper: homeIntroTabsEx
        },
    })

    const homeIntroSliderEx = new Swiper(homeIntroSlider, {
        slidesPerView: 1,
        allowTouchMove: false,
        effect: 'fade',
        mousewheel: {
            releaseOnEdges: true
        }
    })


    homeIntroInfoSliderEx.controller.control = [homeIntroSliderEx]
    homeIntroSliderEx.controller.control = [homeIntroInfoSliderEx]

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
        animItem.setSpeed(1)

        renders.push(animItem)
    })

    renders.forEach((item, index) => {

        if(index == 0) {
            // пока запускаем первую вручную, потом будет после прелоадера
            item.play()

            // тут надо скрыть вкладки
            
            item.addEventListener('config_ready', () => {
                const totalFrames = item.totalFrames * 0.8;

                item.addEventListener('enterFrame', () => {
                    let currentProgress = Math.ceil(parseInt(item.currentFrame) / totalFrames * 100);

                    currentProgress = currentProgress > 100 ? 100 : currentProgress

                    progressBarFill.style.width = currentProgress + '%'
                    
                    if(currentProgress == 100) {
                        progressBarToggle(false)
                    }
                })
            })
    

        }

        // после окончания листаем слайдер и перематываем анимацию на определённый кадр, чтобы выглядело как изображение. все кроме 0
        item.addEventListener ('complete', () => {
        
            // Автопролистывание слайдов
            //homeIntroInfoSliderEx.slideNext(100, true);

            if(index !== 0) {
                item.goToAndStop(0, false);
            }

        })

        
    })

    // смена слайда
    homeIntroSliderEx.on('slideChangeTransitionEnd', function(currentSlider) {

        //возвращаем все анимации на старт
        renders.forEach(render => {
            render.goToAndStop(0, false);
        })

        lockBody()
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })

        const currentSlideIndex = currentSlider.realIndex

        renders[currentSlideIndex].play()

        if(currentSlideIndex == renders.length - 1) {
            setTimeout(unlockBody, 10)
        }
    });

    function progressBarToggle(show) {
        if(show) {
            progressBar.classList.add('active');
            homeIntroInfo.classList.remove('active');
        } else {
            progressBar.classList.remove('active');
            homeIntroInfo.classList.add('active');
        }
    }

}