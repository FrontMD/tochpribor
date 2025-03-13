function validation() {

    const forms = document.querySelectorAll('[data-validate]')

    if (!forms.length) return

    forms.forEach(form => {

        inputMasksInit(form);
        formSpoilerInit(form);

        form.addEventListener('submit', event => {
            event.preventDefault()

            const inputFields = form.querySelectorAll('[data-js="formField"]');

            const dataReqexp = {
                email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/,
                space: /^(\s)+$/,
                date: /([0-9]{2})\.([0-9]{2})\.([0-9]{4})/
            }

            function error(el, errorText = "") {
                let errorField = el.querySelector("[data-js='fieldError']")
                return {
                    set: () => {
                        el.classList.add("field--invalid")
                        errorField.innerHTML = errorText
                    },
                    remove: () => {
                        el.classList.remove("field--invalid")
                        errorField.innerHTML = errorText
                    },
                }
            }

            function validateInput(input) {
                const field = input.querySelector('input') ? input.querySelector('input') : input.querySelector('textarea') ? input.querySelector('textarea') : input.querySelector('select')

                if(!field) return

                const name = field.getAttribute('data-v-name');
                let valueField = name === "file" ? field.files : field.value;
                let spaceTrigger = name === "file" ? true : !valueField.match(dataReqexp.space);

                if (field.hasAttribute('required') && !field.hasAttribute('disabled')) {
                    if (valueField !== '' && spaceTrigger) {
                        switch (name) {
                            case 'email':
                                if (valueField.match(dataReqexp.email)) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Необходимо ввести корректный e-mail').set()
                                }
                                break
                            case 'phone':
                                valueField = valueField.replace(/\D/g, "")

                                if (valueField.length === 11) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Необходимо ввести корректный номер телефона').set()
                                }
                                break
                            case 'file':
                                if (valueField.length > 0) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Поле обязательно для заполнения').set()
                                }
                                break
                            case 'checkbox':
                                if (field.checked) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Необходимо ознакомиться и дать согласие').set()
                                }
                                break                            
                            default:
                                if (valueField.length !== 0) {
                                    error(input).remove()
                                } else {
                                    error(input, "Необходимо заполнить это поле").set()
                                }
                        }
                    } else {
                        error(input, 'Необходимо заполнить это поле').set()
                    }
                }
            }

            function checkFields() {
            
                inputFields.forEach(input => {
                    validateInput(input)
                })
            }

            function lifeValidate() {
                inputFields.forEach(input => {
                    input.addEventListener('click', () => {
                        if (form.getAttribute('data-validate')) {
                            const field = input.querySelector('input') ? input.querySelector('input') : input.querySelector('textarea') ? input.querySelector('textarea') : input.querySelector('select')

                            if(!field) return

                            field.addEventListener('input', () =>
                                validateInput(input),
                            )

                            checkFields()

                            if(field.dataset.js === 'formSelect') {
                                field.closest('[data-js="formField"]').classList.remove('field--invalid')
                            }

                        }
                    })
                })
            }

            function validate() {
                let errors = 0

                inputFields.forEach(input => {
                    if (input.classList.contains('field--invalid')) {
                        errors += 1
                    }
                })

                // тут отправляем данные
                if (errors === 0) {
                    form.classList.add('form--ready')
                    //afterFormSubmit(form)
                }
            }

            lifeValidate()
            checkFields()
            form.setAttribute('data-validate', 'true')

            validate()

        })
    })
}

function inputMasksInit(form) {

    const phones = form.querySelectorAll('input[data-type="phoneNumber"]');
    const dates = form.querySelectorAll('input[data-type="date"]');
    const numbers = form.querySelectorAll('input[data-type="number"]');
    const letters = form.querySelectorAll('input[data-type="letters"]');

    if(phones.length > 0) {
        phones.forEach(phone => {
            Inputmask({
                'mask': '+7 (999) 999-99-99',
                'showMaskOnHover': false
            }).mask(phone); 
        })
    }

    if(dates.length > 0) {
        dates.forEach(date => {
            const dateMaskFormat =  '99.99.9999';
            const today = new Date()

            new AirDatepicker(date, {
                dateFormat: 'dd.MM.yyyy',
                minDate: today,
            })
    
            Inputmask({
                'mask': dateMaskFormat,
                'showMaskOnHover': false
            }).mask(date);

            date.addEventListener('input', dateMask)

        })
    }

    if(numbers.length > 0) {
        numbers.forEach(number => {
            number.addEventListener('input', function(e){
                let val = e.target.value.replace(/\D/g, "");
                this.value = val;
            })
        })
    }

    if(letters.length > 0) {
        letters.forEach(letter => {
            letter.addEventListener('input', function(e){
                let val = e.target.value.replace(/[^А-Яа-яA-Za-z\s-]/g, "");
                this.value = val;
            })
        })
    }

    function dateMask(e) {

        let val = e.target.value.replace(/\D/g, "");

        if(val.length == 1 && parseInt(val) > 3) {
            val = '3'
        }

        if(val.length == 2 && parseInt(val) > 31) {
        val = '31'
        }

        if(val.length == 3 && parseInt(val.substring(2)) > 1) {
        val = val.slice(0, 2) + "1";
        }
        
        if(val.length == 4 && parseInt(val.substring(2)) > 12) {
        val = val.slice(0, 2) + "12";
        }

        if(val.length == 10 && parseInt(val.substring(8)) > 23) {
            val = val.slice(0, 8) + "23";
        }
        
        if(val.length == 12 && parseInt(val.substring(10)) > 59) {
            val = val.slice(0, 10) + "59";
        }
        
        this.value = val;
    }
}

function formSpoilerInit(form) {
    const spoilers = form.querySelectorAll('[data-js="formSpoiler"]')

    if(spoilers.length < 1) return

    spoilers.forEach(spoiler => {
        const content = spoiler.querySelector('[data-js="formSpoilerContent"]');
        const header = spoiler.querySelector('[data-js="formSpoilerHeader"]');

        header.addEventListener('click', function() {
            if(spoiler.classList.contains('active')) {
                spoiler.classList.remove('active');
			    $(content).slideUp(300);
            } else {
                spoiler.classList.add('active');
			    $(content).slideDown(300);
            }
        })
    })
}

function afterFormSubmit(form) {
    let fileFields = form.querySelectorAll('.field-file[data-js="formField"]')
    form.reset();
    form.classList.remove('form--ready')

    //сбрасываем поле ФАЙЛ
    if(fileFields.length > 0) {

        fileFields.forEach(fileField => {
            let placeholderText = fileField.getAttribute('data-placeholder');
            let fileName = fileField.querySelector('[data-js="fileName"]');

            fileField.classList.remove('field-file--full');
            fileName.innerHTML = placeholderText;

        })
    }

    //порверяем какой тип благодарности в форме и показываем его
    if(form.querySelector("[data-js='form-thanks']") !== null) {
        if(form.hasAttribute('data-fixed-height')) {
            form.style.minHeight = form.offsetHeight + 'px'
        }
        form.classList.add("form--sent")
    } else {
        thanksMessageShow();
    }
}
