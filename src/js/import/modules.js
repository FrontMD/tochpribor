@@include("../../blocks/modules/header/header.js")
@@include("../../blocks/modules/footer/footer.js")
@@include("../../blocks/modules/main-burger/main-burger.js")


document.addEventListener('DOMContentLoaded', () => {
    // управляет поиском в хедере
    headerSearch()
    // добавляет кнопку "показать ещё" в большом меню, если пунктов больше 5. Вызывать нужно до анимаций.
    bigMenuHeight()
    // управляет бургером
    mainBurger()
})