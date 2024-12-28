
@@include("../../blocks/components/field/field.js")
@@include("../../blocks/components/form/form.js")
@@include("../../blocks/components/video/video.js")
@@include("../../blocks/components/spoiler/spoiler.js")
@@include("../../blocks/components/form-filter/form-filter.js")

document.addEventListener('DOMContentLoaded', () => {
    // управляет кнопками в полях форм
    selects()
    // инициализирует селекты
    fieldsController()
    // маски полей и валидация
    validation()
    // видео
    videos()
    // спойлеры
    spoilers()
    // фильтр
    formFilterController()
})