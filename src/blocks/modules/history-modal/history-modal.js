function historyModal() {

    // Открыть/закрыть
    const historyModalOpen = document.querySelector('[data-js="historyModalOpen"]')
    const historyModal = document.querySelector('[data-js="historyModal"]')

    if(!historyModalOpen || !historyModal) return

    const historyModalCloseBtns = historyModal.querySelectorAll('[data-js="historyModalClose"]')
    
    const headerSearch = document.querySelector('[data-js="headerSearchContent"]')

    historyModalOpen.addEventListener('click', () => {
        if(headerSearch) {
            headerSearch.classList.remove('active')
        }
        historyModal.classList.add('active')
        lockBody()
    })

    if(historyModalCloseBtns.length > 0) {
        historyModalCloseBtns.forEach(historyModalCloseBtn => {        
            historyModalCloseBtn.addEventListener('click', () => {
                historyModal.classList.remove('active')
                unlockBody()
            })
        });
    }

    // развернуть/свернуть текст
    const textItems = historyModal.querySelectorAll('.history-modal__info p')

    if(textItems.length > 0) {
        
        const maxLines = 6;
        const showMoreLayout =  `
                                <span class="show">Развернуть</span>
                                <span class="hide">Свернуть</span>
                                `
        
        const lineHeight = window.getComputedStyle(textItems[0]).lineHeight;
        let shortHeight = parseFloat(lineHeight) * maxLines;
    
        textItems.forEach(textItem => {
            console.log(textItem)
        
            let fullHeight = textItem.offsetHeight;

            console.log(shortHeight)
            console.log(fullHeight)
            if(fullHeight > shortHeight) {


                let showHideBtn = document.createElement('button');
                showHideBtn.setAttribute('type', 'button');
                showHideBtn.classList.add('history-modal__show');
                showHideBtn.innerHTML = showMoreLayout
    
                textItem.after(showHideBtn)
                textItem.style.maxHeight = shortHeight + 'px'
                
                showHideBtn.addEventListener('click', function(e) {
                    if(this.classList.contains('history-modal__show--opened')) {
                        this.classList.remove('history-modal__show--opened')
                        textItem.style.maxHeight = shortHeight + 'px'
                    } else {
                        this.classList.add('history-modal__show--opened')
                        textItem.style.maxHeight = fullHeight + 'px'
                    }
                })
            }
 
        })
        
    }

}