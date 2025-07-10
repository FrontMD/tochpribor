function factoryModelController() {
    const factoryModel = document.querySelector('[data-js="factoryModel"]')

    if(!factoryModel) return

    // на экранах меньше 1024 подстраиваем под размер первой секции
    const introSection = document.querySelector('[data-js="factoryIntro"]')
    if(introSection) {
        //factoryModel.style.height = introSection.offsetHeight + 'px'
    }


    // открытие модели если перешли с другой страницы
    const currentSearchList = window.location.search.replace('?', '').split('&')
    const modalOpenTrigger = currentSearchList.find(item => item == 'model-open=true')
    if(modalOpenTrigger !== undefined) {
        openModel()
    }
    
    // кнопка открытия
    const factoryModelOpen = document.querySelector('[data-js="factoryModelOpen"]');
    
    if(factoryModelOpen) {
        factoryModelOpen.addEventListener('click', openModel)
    }
    
    // кнопка закрытия
    const factoryModelClose = factoryModel.querySelector('[data-js="factoryModelClose"]');
    
    if(factoryModelClose) {
        factoryModelClose.addEventListener('click', function() {
            closeModel();
            closeInfo();
            toggleLayers(0);
        })
    }
    
    //Клики по поинтам
    const factoryModelLayers = factoryModel.querySelectorAll('[data-js="factoryModelLayer"]');
    
    if(factoryModelLayers.length > 0) {
        factoryModelLayers.forEach(layer => {
            let isFirstLevel = layer.dataset.level == 1 ? true : false;
            const points = layer.querySelectorAll('[data-js="factoryModelPoint"]');
            
            if(points.length > 0) {
                if(isFirstLevel) {
                    // обработка на первом уровне
                    points.forEach(point => {
                        point.addEventListener('click', function() {
                            toggleLayers(this.dataset.layer)
                        })
                    })
                    
                } else {
                    // обработка на втором уровне
                    points.forEach(point => {
                        point.addEventListener('click', function() {
                            openInfo(this.dataset.info, this)
                        })
                    })
                }
            }

            // обработчик кнопки НАЗАД
            const backBtn = layer.querySelector('[data-js="factoryModelBack"]');

            if(backBtn) {
                backBtn.addEventListener('click', function() {
                    let targetId = factoryModel.querySelector('[data-js="factoryModelLayer"][data-level="1"]').dataset.number;
                    toggleLayers(targetId);
                    closeInfo();
                })
            }
        })
    }

    // кнопка закрытия модалки и кнопка Подробнее в модалке
    const pointsInfoAll = factoryModel.querySelectorAll('[data-js="pointInfo"]');

    if(pointsInfoAll.length > 0) {
        pointsInfoAll.forEach(pointInfo => {
            // закрытие
            const pointInfoClose = pointInfo.querySelector('[data-js="pointInfoClose"]');

            if(pointInfoClose) {
                pointInfoClose.addEventListener('click', closeInfo)
            }

            // подробнее
            const pointInfoMore = pointInfo.querySelector('[data-js="pointInfoMore"]');

            if(pointInfoMore) {

                pointInfoMore.addEventListener('click', scrollToSpoilers)
            }
        })
    }

    // запрет скролла на модели
    /*factoryModel.addEventListener('wheel', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if(e.deltaY > 0) {
            return
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    })

    let yDown = null 
    factoryModel.addEventListener('touchstart', touchstartHandler)
    factoryModel.addEventListener('touchmove', touchmoveHandler)*/

    // открывает модель
    function openModel() {
        factoryModel.classList.add('active');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    // закрывает модель
    function closeModel() {
        factoryModel.classList.remove('active');
    }

    // переключает слои
    function toggleLayers(targetId) {
        factoryModelLayers.forEach(layer => {
            const currentId = layer.dataset.number;

            if(currentId == targetId) {
                layer.classList.add('active');
            } else {
                layer.classList.remove('active');
            }
        })
    }

    // открывает модалку
    function openInfo(infoId, currentPoint) {
        const targetInfo = factoryModel.querySelector(`[data-js="pointInfo"][data-id="${infoId}"]`);

        pointsInactivate();
        closeInfo()
        
        if(targetInfo) {
            currentPoint.classList.add('active');

            const slider = targetInfo.querySelector('[data-js="mediaSlider"]')

            if(slider) {
                slider.swiper.update()
            }

            targetInfo.classList.add("active");
        }
    }

    // открывает нужный споилер и прокручивает к нему
    function scrollToSpoilers(e) {
        const spoilersSection = document.querySelector('[data-js="fFactory"]');

        if(!spoilersSection) return

        // открытие нужной вкладки и споилера
        const target = e.target
        const targetId = target.closest('[data-js="pointInfo"]').dataset.id
        const targetSpoiler = spoilersSection.querySelector(`[data-js="spoiler"][data-id="${targetId}"]`);
        const targetSlideIndex = $(targetSpoiler.closest('[data-js="tabsBlockSlide"]')).index();
        const targetTab = spoilersSection.querySelector(`[data-js="tabsBlockTab"][data-index="${targetSlideIndex}"]`);

        targetTab.click();
        targetSpoiler.querySelector('.spoiler__intro').click()

        // прокрутка аккордиона к нужному спойлеру
        setTimeout(() => {
            const accordion = targetSpoiler.closest('[data-js="accordion"]')
    
            accordion.scrollTo({
                top: 0,
                behavior: 'instant'
            })
            
            const targetSpoilerPosition = Math.ceil($(targetSpoiler).position().top - $(accordion).position().top)
    
            accordion.scrollTo({
                top: targetSpoilerPosition,
                behavior: 'instant'
            })
        }, 400)

        // скролл к секции спойлеров
        const scrollTopOffset = document.querySelector('[data-js="siteHeader"]') ? document.querySelector('[data-js="siteHeader"]').offsetHeight : '0'
        const targetScrollPos = Math.ceil($(spoilersSection).offset().top - scrollTopOffset)
        window.scrollTo({
            top: targetScrollPos,
            behavior: 'smooth'
        })

    }

    // закрывает модалки
    function closeInfo() {
        const activePointsInfo = factoryModel.querySelectorAll('.active[data-js="pointInfo"]');
        activePointsInfo.forEach(currentPoint => {
            currentPoint.classList.remove("active");
        });
        pointsInactivate();
    }

    // снимает активный класс со всех поинтов
    function pointsInactivate() {
        const allActivePoints = factoryModel.querySelectorAll('.active[data-js="factoryModelPoint"]');
        
        if(allActivePoints.length > 0) {
            allActivePoints.forEach(activePoint => {
                activePoint.classList.remove('active')
            })
        }
    }

    // обработчик касания
    function touchstartHandler(e) {
        yDown = e.touches[0].clientY
    }

    // обработчик свайпа
    function touchmoveHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let yDiff = yDown - e.touches[0].clientY;

        if(yDiff > 0) {
            return
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }
}