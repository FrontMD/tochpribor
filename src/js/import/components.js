
@@include("../../blocks/components/field/field.js")
@@include("../../blocks/components/field-file/field-file.js")
@@include("../../blocks/components/form/form.js")
@@include("../../blocks/components/amount-input/amount-input.js")
@@include("../../blocks/components/video/video.js")
@@include("../../blocks/components/spoiler/spoiler.js")
@@include("../../blocks/components/form-filter/form-filter.js")
@@include("../../blocks/components/copy-btn/copy-btn.js")
@@include("../../blocks/components/cookie/cookie.js")

document.addEventListener('DOMContentLoaded', () => {
    // Cookie
    cookieInit()
    // управляет кнопками в полях форм
    selects();
    // инициализирует селекты
    fieldsController();
    // маски полей и валидация
    validation();
    // видео
    videos();
    // спойлеры
    spoilers();
    // фильтр
    formFilterController();
    // кнопка копировать
    copyBtn();
    // поле количества товара
    amountInput();
    // поле файл
    fileFieldInit();
})