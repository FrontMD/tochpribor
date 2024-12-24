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

function selects() {
	const formSelects = document.querySelectorAll("[data-js='formSelect']")

	formSelects.forEach(formSelect => {
		let placeholder = $(formSelect).attr('placeholder')

		$(formSelect).select2({
			placeholder: placeholder,
			allowClear: true
		});
	}) 

	$("[data-js='formSelect']").on('select2:open', () => {
		$(".select2-dropdown").addClass("select2-dropdown--form")
	})

}
