@@include("../../blocks/modules/home-intro/home-intro.js")
@@include("../../blocks/modules/header/header.js")
@@include("../../blocks/modules/footer/footer.js")
@@include("../../blocks/modules/modals/modals.js")
@@include("../../blocks/modules/main-burger/main-burger.js")
@@include("../../blocks/modules/comments/comments.js")
@@include("../../blocks/modules/tabs-block/tabs-block.js")
@@include("../../blocks/modules/media-slider/media-slider.js")
@@include("../../blocks/modules/cards-slider/cards-slider.js")
@@include("../../blocks/modules/product-slider/product-slider.js")
@@include("../../blocks/modules/product-page-intro/product-intro.js")
@@include("../../blocks/modules/h-advantages/h-advantages.js")
@@include("../../blocks/modules/history-modal/history-modal.js")
@@include("../../blocks/modules/team-section/team-section.js")
@@include("../../blocks/modules/f-factory/f-factory.js")
@@include("../../blocks/modules/factory-model/factory-model.js")

document.addEventListener('DOMContentLoaded', () => {
    // Скрипты первого экрана главной страницы
    homeIntro()
    // открывает модалки
    modalsInit()
    // управляет поиском в хедере
    headerSearch()
    // управляет выбором города
    //userCity()
    // добавляет кнопку "показать ещё" в большом меню, если пунктов больше 5. Вызывать нужно до анимаций.
    bigMenuHeight()
    // управляет бургером
    mainBurger()
    // добавляет кнопку "Смотреть все" в комментарии, если их больше 5. Вызвать нужно до анимации
    commentsHeight()
    // управляет вкладками
    tabsBlockInit()
    // Слайдер с галереей
    mediaSliderInit()
    // Слайдеры с карточками
    cardsSlidersInit()
    // Слайдер на детальной странице товара
    productSlider()
    // Скрипты первого экрана детальной карточки товара
    productIntro()
    // Слайдер карточек преимуществ
    hAdvantagesSlider()
    // Управляет модалкой истории
    historyModal()
    // Управляет слайдером команды
    teamSection()
    // управляет секцией Наше производство (О заводе)
    fFactoryController()
    // управляет моделью завода
    factoryModelController()
})