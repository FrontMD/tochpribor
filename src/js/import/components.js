
@@include("../../blocks/components/field/field.js")
@@include("../../blocks/components/form/form.js")

document.addEventListener('DOMContentLoaded', () => {
    // управляет кнопками в полях форм
    fieldsController()
    // маски полей и валидация
    validation()
})