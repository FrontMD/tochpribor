function homeIntro() {
    const homeIntro = document.querySelector('[data-js="homeIntro"]');

    if(!homeIntro) return

    const preloader = document.querySelector('[data-js="preloader"]')
    const vh = window.innerHeight

    if(!preloader) {
        if(window.scrollY < vh / 3) {
            lockBody()
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        } else {
            unlockBody()
        }
    }

    const homeIntroSlider = homeIntro.querySelector('[data-js="homeIntroSlider"]');
    const homeIntroTabs = homeIntro.querySelector('[data-js="homeIntroTabs"]');
    const tabsProgressList = homeIntroTabs.querySelectorAll('[data-js="tabProgress"]');
    const homeIntroInfoSlider = homeIntro.querySelector('[data-js="homeIntroInfoSlider"]');
    const progressBar = homeIntro.querySelector('[data-js="homeIntroProgressBar"]');
    const progressBarFill = homeIntro.querySelector('[data-js="homeIntroProgressBarFill"]');
    const skipBtn = homeIntro.querySelector('[data-js="homeIntroProgressBarSkip"]');
    const skipAllBtn = homeIntro.querySelector('[data-js="homeIntroSkipAll"]');
    const homeIntroInfo = homeIntro.querySelector('[data-js="homeIntroInfo"]');

    const homeIntroChart = homeIntro.querySelector('[data-js="homeIntroChart"]');
    const homeIntroChartLine = homeIntroChart.querySelector('[data-js="homeIntroChartLine"]');
    const homeIntroChartVals = homeIntroChart.querySelectorAll('[data-js="homeIntroChartVal"]');

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

    if (typeof window.distPath == 'undefined') {
        window.distPath = '';
    }

    animContainers.forEach((item, index) => {
        const animItem = lottie.loadAnimation({
            name: 'render' + index,
            wrapper: item,
            animType: 'canvas',
            loop: false,
            autoplay: false,
            path: `${window.distPath}public/renders/render-` + index + '/render.json'
        });
        animItem.setSpeed(0.7)

        renders.push(animItem)
    })

    renders.forEach((item, index) => {

        if(index == 0) {
            if(preloader && preloader.classList.contains('active')) {
               
                preloader.addEventListener('preloaderComplete', function() {
                   
                    if(window.scrollY < vh / 3) {
                        lockBody()
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        })
                    } else {
                        unlockBody()
                    }
                    item.play()
                })
            } else {
                item.play()
            }

            const vw = window.innerWidth;
            const tabletBreakpoint = 1023;

            item.addEventListener('config_ready', () => {
                const startProgress = 40;
                const endProgress = 70;
                const periodLength = endProgress - startProgress

                const totalFrames = item.totalFrames;
                const currentProgressLine = tabsProgressList[index]
                const currentOverlay = currentProgressLine.querySelector('[data-js="tabProgressOverlay"]')

                item.addEventListener('enterFrame', () => {
                    let currentFrame = parseInt(item.currentFrame) - startProgress;
                    let currentProgress = Math.ceil(currentFrame / periodLength * 100);

                    let currentRealFrame = item.currentFrame

                    if(vw > tabletBreakpoint) {
                        if(currentRealFrame > endProgress) {
                            currentOverlay.style.width = Math.ceil((currentRealFrame - endProgress) / (totalFrames - endProgress) * 100) + '%';
                        }
    
                        if(parseInt(item.currentFrame) === endProgress + 1) {
                            item.setSpeed(0.49)
                        }
                    } else {
                        currentOverlay.style.width = Math.ceil(currentRealFrame / totalFrames * 100) + '%';
    
                    }
                    
                    if(parseInt(currentRealFrame) == totalFrames - 1) {
                        currentOverlay.style.width = '0%';
                    }

                    if(currentRealFrame == 0) {
                        currentOverlay.style.width = '0%';
                    }
                    
                    if(currentFrame == -20) {
                        homeIntroChart.classList.add('active');
                    }
                    
                    currentProgress = currentProgress > 100 ? 100 : currentProgress
                    currentProgress = currentProgress < 1 ? 0 : currentProgress

                    if(currentProgress > 0) {
                        progressBarFill.style.width = currentProgress + '%';
                        homeIntroChartLine.style.width = currentProgress + '%';

                        homeIntroChartVals.forEach(val => {
                            const valMin = parseFloat(val.dataset.min);
                            const valMax = parseFloat(val.dataset.max);
                            const valPeriod = valMax - valMin;
                            const newVal = Math.round(valPeriod / 100 * currentProgress)  + valMin
                            
                            val.innerHTML = newVal.toLocaleString();
                        })
                    }

                    if(currentProgress == 100) {
                        progressBarFill.style.width = '0%';
                        homeIntroChartLine.style.width = '0%';
                        progressBarToggle(false);
                        homeIntroChart.classList.remove('active');
                    }
                })
            })
    
        } else {
            item.addEventListener('config_ready', () => {
                const totalFrames = item.totalFrames;
                const currentProgressLine = tabsProgressList[index]
                const currentOverlay = currentProgressLine.querySelector('[data-js="tabProgressOverlay"]')
                
                item.addEventListener('enterFrame', () => {
                    const currentFrame = parseInt(item.currentFrame);
                    currentOverlay.style.width = Math.ceil(currentFrame / totalFrames * 100) + '%';
                    if(currentFrame == totalFrames) {
                        currentOverlay.style.width = '0%';
                    }
                })

            })
        }

        // после окончания листаем слайдер и перематываем анимацию на определённый кадр, чтобы выглядело как изображение. все кроме 0
        item.addEventListener ('complete', () => {
        
            // Автопролистывание слайдов
            homeIntroInfoSliderEx.slideNext(10, true);

            if(index !== 0) {
                item.goToAndStop(0, false);

                if(index == renders.length - 1) {
                    tabsProgressList[index].querySelector('[data-js="tabProgressOverlay"]').style.width = '100%'
                }

            }

        })

        
    })

    // смена слайда
    homeIntroSliderEx.on('slideChangeTransitionEnd', function(currentSlider) {
        
        const currentSlideIndex = currentSlider.realIndex

        //возвращаем все анимации на старт
        renders.forEach(render => {
            render.goToAndStop(0, false);
        })

        // проматываем страницу вверх и блокируем скролл если первый экран занимает больше 2/3 окна просмотра
        let posTop = window.scrollY;

        if(posTop < vh / 3) {
            lockBody()
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        } else {
            unlockBody()
        }

        // если первый слайд, то возвращаем прогрессбар и нормальную скорость анимации
        if(currentSlideIndex == 0) {
            renders[0].setSpeed(0.7)
            progressBarToggle(true)
        } else {
            // если не первый то убираем
            progressBarToggle(false)
            homeIntroChart.classList.remove('active');
            progressBarFill.style.width = '0%';
            homeIntroChartLine.style.width = '0%';
        }

        // запускаем анимацию
        renders[currentSlideIndex].play()

        // если последний слайд, то снимаем блокировку скролла
        if(currentSlideIndex == renders.length - 1) {
            setTimeout(unlockBody, 10)
        }

    });

    skipBtn.addEventListener('click', () => {
        renders[0].goToAndPlay(139, true)
    })

    skipAllBtn.addEventListener('click', () => {
        unlockBody();
        window.scrollTo({
            top: vh - 60,
            behavior: 'smooth'
        })
    })
    
    // переключение с прогрессбара на вкладки и обратно
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