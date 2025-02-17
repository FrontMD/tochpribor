function factoryModelController() {
    const factoryModel = document.querySelector('[data-js="factoryModel"]')

    if(!factoryModel) return

    // кнопка открытия
    const factoryModelOpen = document.querySelector('[data-js="factoryModelOpen"]');

    if(factoryModelOpen) {
        factoryModelOpen.addEventListener('click', openModel)
    }

    // кнопка закрытия
    const factoryModelClose = document.querySelector('[data-js="factoryModelClose"]');

    if(factoryModelClose) {
        factoryModelClose.addEventListener('click', closeModel)
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
}