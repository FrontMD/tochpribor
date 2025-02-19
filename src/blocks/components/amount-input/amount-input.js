function amountInput() {
    const amountFields = document.querySelectorAll('[data-js="amountInput"]');

    if(amountFields.length < 1) return

    amountFields.forEach(item => {
        const inCartBlock =  item.hasAttribute('data-cart')
        const minValue = item.querySelector('input').getAttribute('min') ? parseInt(item.querySelector('input').getAttribute('min')) : inCartBlock ? 0 : 1
        const maxValue = item.querySelector('input').getAttribute('max') ? parseInt(item.querySelector('input').getAttribute('max')) : null

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

            if (maxValue && currentValue < maxValue) {
                item.querySelector('.amount-input__change.amount-input__plus').classList.remove('max');
            }

            widthСalculation(targetInput, minValue, maxValue, inCartBlock)

            let event = new Event('input');
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

            if (maxValue && currentValue < maxValue) {
                item.querySelector('.amount-input__change.amount-input__plus').classList.remove('max');
            }

            widthСalculation(targetInput, minValue, maxValue, inCartBlock)
            let event = new Event('input');
            targetInput.dispatchEvent(event);
    
        });


        item.querySelector('input').addEventListener('input', function(e) {
            widthСalculation(e.target, minValue, maxValue, inCartBlock)
        })
    })

}

function widthСalculation(targetInput, minValue, maxValue, inCartBlock) {
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
        targetInput.value = minValue
        if(!inCartBlock) {
            item.querySelector(".amount-input__change.amount-input__minus").classList.add('min');
        }
        return;
    }

    if(maxValue && currentValue > maxValue) {
        targetInput.value = maxValue
        item.querySelector(".amount-input__change.amount-input__plus").classList.add('max');
        item.querySelector(".amount-input__change.amount-input__minus").classList.remove('min');
        return;
    }

    if (currentValue > minValue) {
        item.querySelector(".amount-input__change.amount-input__minus").classList.remove('min');
    } else {
        item.querySelector(".amount-input__change.amount-input__minus").classList.add('min');
    }

    if (maxValue && currentValue >= maxValue) {
        item.querySelector(".amount-input__change.amount-input__plus").classList.add('max');
    } else {
        item.querySelector(".amount-input__change.amount-input__plus").classList.remove('max');
    }

    targetInput.value = currentValue.replace(/\D/g,'');

    if(inCartBlock) return

    spanForWidth.innerHTML = targetInput.value;

    targetInput.style.width = spanForWidth.offsetWidth + 29 + 'px'; //ширина текста + отступы до кнопок
    item.style.width = spanForWidth.offsetWidth + 89 + 'px'; //ширина текста + отступы до кнопок + ширина кнопок

}
