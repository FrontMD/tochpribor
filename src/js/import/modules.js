@@include("../../blocks/modules/header/header.js")
@@include("../../blocks/modules/footer/footer.js")

document.addEventListener('DOMContentLoaded', () => {
    // добавляет кнопку "показать ещё" в большом меню, если пунктов больше 5. Вызывать нужно до анимаций.
    bigMenuHeight()
})