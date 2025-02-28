function productIntro() {
    // показать все модели
    const modelsBlocks = document.querySelectorAll('[data-js="productModelsBlock"]')

    if(modelsBlocks.length > 0) {
         
        const showMoreLayout =  `
                                <span class="show">Показать все модификации</span>
                                <span class="hide">Скрыть</span>
                                `
    
        modelsBlocks.forEach(modelsBlock => {
            const modelsItemsList = modelsBlock.querySelector('[data-js="productModelsList"]');
            const modelsItem = modelsItemsList.querySelector('[data-js="productModelsItem"]');
            const gap = window.innerWidth > 500 ? 8 : 4;
            const startRows = 3
            const modelsItemHeight = modelsItem.offsetHeight;
            const fullHeight = modelsItemsList.offsetHeight;
            const maxHeight = modelsItemHeight * startRows + gap * (startRows - 1)
        
            if(maxHeight < fullHeight) {
                modelsItemsList.style.maxHeight = maxHeight + 'px'
                let showHideBtn = document.createElement('button');
    
                showHideBtn.setAttribute('type', 'button');
                showHideBtn.classList.add('product-intro__more');
                showHideBtn.innerHTML = showMoreLayout
    
                modelsBlock.appendChild(showHideBtn)
    
                showHideBtn.addEventListener('click', function(e) {
                    if(this.classList.contains('product-intro__more--opened')) {
                        this.classList.remove('product-intro__more--opened')
                        modelsItemsList.style.maxHeight = maxHeight + 'px'
                    } else {
                        this.classList.add('product-intro__more--opened')
                        modelsItemsList.style.maxHeight = fullHeight + 'px'
                    }
                })
            }
        })
         
    }

    // добавление в корзину и удаление из корзины (реализовано на бэке)
    /*const productCartBlocks = document.querySelectorAll('[data-js="productCartBlock"]');

    if(productCartBlocks.length > 0) {
        productCartBlocks.forEach(block => {
            const cartBtn = block.querySelector('[data-js="productCartBlockBtn"]')
            const amountInputBlock = block.querySelector('[data-js="amountInput"]')
            const amountInputPlus = amountInputBlock.querySelector('.amount-input__change.amount-input__plus')
            const amountInput = amountInputBlock.querySelector('input')
            const notice = document.querySelector('[data-js="productCartNotice"]')

            cartBtn.addEventListener('click', function() {
                amountInputPlus.click();
                this.style.display = 'none';
                amountInputBlock.classList.add('active');
                notice.classList.remove('product-intro__notice--remove');
                notice.classList.add('active', 'product-intro__notice--add');
                noticeTimer()

            })

            amountInput.addEventListener('change', function() {
                if(this.value < 1) {
                    cartBtn.style.display = 'flex';
                    amountInputBlock.classList.remove('active');
                    notice.classList.remove('product-intro__notice--add')
                    notice.classList.add('active', 'product-intro__notice--remove')
                    noticeTimer()
                }
            })

            function noticeTimer() {
                setTimeout(() => {
                    notice.classList.remove('active');
                }, 3000)
            }

        })
    }*/
}