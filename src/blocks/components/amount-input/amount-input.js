function amountInput() {
    const amountFields = document.querySelectorAll('[data-js="amountInput"]');

    if(amountFields.length < 1) return

    amountFields.forEach(item => {

        const inCartBlock =  item.hasAttribute('data-cart')
        const minValue = inCartBlock ? 0 : 1

        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
        })

        item.querySelector('.amount-input__change.amount-input__plus').addEventListener('click', function(e) {


            let targetInput = item.querySelector('input')
            let currentValue = parseInt(targetInput.value);

            currentValue++

            targetInput.value = currentValue;

            if (currentValue > minValue) {
                item.querySelector('.amount-input__change.amount-input__minus').classList.remove('min');
            }

            widthСalculation(targetInput, minValue, inCartBlock)

            let event = new Event('change');
            targetInput.dispatchEvent(event);
    
        });

        item.querySelector('.amount-input__change.amount-input__minus').addEventListener('click', function(e) {
            e.target.closest(".amount-input__change.amount-input__minus").classList.add('min');
            let targetInput = item.querySelector('input')
            let currentValue = parseInt(targetInput.value);

            currentValue--

            targetInput.value = currentValue;

            if (currentValue > minValue) {
                e.target.closest(".amount-input__change.amount-input__minus").classList.remove('min');
            }

            widthСalculation(targetInput, minValue, inCartBlock)
            let event = new Event('change');
            targetInput.dispatchEvent(event);
    
        });


        item.querySelector('input').addEventListener('change', function(e) {
            widthСalculation(e.target, minValue, inCartBlock)
        })
    })

}

function widthСalculation(targetInput, minValue, inCartBlock) {
    let item = targetInput.closest('[data-js="amountInput"]')
    let currentValue = targetInput.value;
    let spanForWidth = item.querySelector('.amount-input__width');

    if(currentValue.length == 0) {
        targetInput.value = minValue;
        if(!inCartBlock) {
            item.querySelector(".amount-input__change.amount-input__minus").classList.add('min');
        }
        return;
    }

    if(currentValue < minValue) {
        targetInput.value = 1
        if(!inCartBlock) {
            item.querySelector(".amount-input__change.amount-input__minus").classList.add('min');
        }
        return;
    }

    if (currentValue > minValue) {
        item.querySelector(".amount-input__change.amount-input__minus").classList.remove('min');
    } else {
        item.querySelector(".amount-input__change.amount-input__minus").classList.add('min');
    }

    targetInput.value = currentValue.replace(/\D/g,'');

    if(inCartBlock) return

    spanForWidth.innerHTML = targetInput.value;

    targetInput.style.width = spanForWidth.offsetWidth + 29 + 'px'; //ширина текста + отступы до кнопок
    item.style.width = spanForWidth.offsetWidth + 89 + 'px'; //ширина текста + отступы до кнопок + ширина кнопок

}
