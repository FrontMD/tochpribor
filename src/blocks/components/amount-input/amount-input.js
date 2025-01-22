function amountInput() {
    const amountFields = document.querySelectorAll('[data-js="amountInput"]');

    if(amountFields.length < 1) return

    amountFields.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
        })

        item.querySelector('.amount-input__change.amount-input__plus').addEventListener('click', function(e) {


            let targetInput = item.querySelector('input')
            let currentValue = parseInt(targetInput.value);

            currentValue++

            targetInput.value = currentValue;

            if (currentValue > 1) {
                item.querySelector('.amount-input__change.amount-input__minus').classList.remove('min');
            }

            widthСalculation(targetInput)
    
        });

        item.querySelector('.amount-input__change.amount-input__minus').addEventListener('click', function(e) {
            e.target.closest(".amount-input__change.amount-input__minus").classList.add('min');
            let targetInput = item.querySelector('input')
            let currentValue = parseInt(targetInput.value);

            currentValue--

            targetInput.value = currentValue;

            if (currentValue > 1) {
                e.target.closest(".amount-input__change.amount-input__minus").classList.remove('min');
            }

            widthСalculation(targetInput)
    
        });


        item.querySelector('input').addEventListener('change', function(e) {
            widthСalculation(e.target)
        })
    })
}

function widthСalculation(targetInput) {
    let item = targetInput.closest('[data-js="amountInput"]')
    let currentValue = targetInput.value;
    let spanForWidth = item.querySelector('.amount-input__width');

    if(currentValue.length == 0) {
        targetInput.value = 1;
        return;
    }

    if (currentValue > 1) {
        item.querySelector(".amount-input__change.amount-input__minus").classList.remove('min');
    } else {
        item.querySelector(".amount-input__change.amount-input__minus").classList.add('min');
    }

    targetInput.value = currentValue.replace(/\D/g,'');

    spanForWidth.innerHTML = targetInput.value;

    targetInput.style.width = spanForWidth.offsetWidth + 40 + 'px';
    item.style.width = spanForWidth.offsetWidth + 140 + 'px'

}