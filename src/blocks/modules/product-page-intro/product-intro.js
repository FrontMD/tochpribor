function productIntro() {
     // Showmore models
     const modelsBlocks = document.querySelectorAll('[data-js="productModelsBlock"]')

     if(modelsBlocks.length > 0) {
         
        const showMoreLayout =  `
                                <span class="show">Показать все модификации</span>
                                <span class="hide">Скрыть</span>
                                `
    
        modelsBlocks.forEach(modelsBlock => {
            const modelsItemsList = modelsBlock.querySelector('[data-js="productModelsList"]');
            const modelsItem = modelsItemsList.querySelector('[data-js="productModelsItem"]');
            const gap = 8;
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
}