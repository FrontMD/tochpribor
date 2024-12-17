@@include("../../blocks/modules/header/header.js")
@@include("../../blocks/modules/footer/footer.js")
@@include("../../blocks/modules/main-burger/main-burger.js")
@@include("../../blocks/modules/comments/comments.js")


document.addEventListener('DOMContentLoaded', () => {
    // управляет поиском в хедере
    headerSearch()
    // добавляет кнопку "показать ещё" в большом меню, если пунктов больше 5. Вызывать нужно до анимаций.
    bigMenuHeight()
    // управляет бургером
    mainBurger()
    // добавляет кнопку "Смотреть все" в комментарии, если их больше 5. Вызвать нужно до анимации
    commentsHeight()
})