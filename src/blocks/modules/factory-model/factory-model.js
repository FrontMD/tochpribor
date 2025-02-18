function factoryModelController() {
    const factoryModel = document.querySelector('[data-js="factoryModel"]')

    if(!factoryModel) return
    
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
        })
    }
    
    //Клики по поинтам
    const factoryModelLayers = factoryModel.querySelectorAll('[data-js="factoryModelLayer"]');

    const pointInfo = factoryModel.querySelector('[data-js="pointInfo"]')

    if(factoryModelLayers.length > 0) {
        factoryModelLayers.forEach(layer => {
            let isFirstLevel = layer.dataset.level == 1 ? true : false;
            const points = layer.querySelectorAll('[data-js="factoryModelPoint"]');

            if(points.length > 0) {
                console.log(points)
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
                    let targetId = factoryModel.querySelector('[data-js="factoryModelLayer"][data-level="1"]').dataset.id;
                    toggleLayers(targetId);
                    closeInfo();
                })
            }
        })
    }

    // кнопка закрытия модалки
    const pointInfoClose = pointInfo.querySelector('[data-js="pointInfoClose"]');
    
    if(pointInfoClose) {
        pointInfoClose.addEventListener('click', closeInfo)
    }


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
            const currentId = layer.dataset.id;

            if(currentId == targetId) {
                layer.classList.add('active');
            } else {
                layer.classList.remove('active');
            }
        })
    }

    // заполняет и открывает модалку
    function openInfo(modalId, currentPoint) {
        pointsInactivate();
        currentPoint.classList.add('active');
        pointInfo.classList.add("active");
    }

    // закрывает модалку
    function closeInfo() {
        pointInfo.classList.remove("active");
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
}