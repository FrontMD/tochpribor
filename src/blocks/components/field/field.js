function fieldsController() {
    const fields = document.querySelectorAll('[data-js="formField"]')

    if(fields.length < 1) return

    fields.forEach(field => {
        const resetBtn = field.querySelector('[data-js="fieldResetBtn"]')
        const input = field.querySelector('input')

        if(resetBtn && input) {
            resetBtn.addEventListener('click', function() {
                input.value = ''
            })
        }
    })
}