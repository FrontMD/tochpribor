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
    textItems = historyModal.querySelectorAll('[data-js="collapsibleTextWrapper"]')

    if(textItems.length > 0) {
        
        const maxLines = 6;
        const showMoreLayout =  `
                                <span class="show">Развернуть</span>
                                <span class="hide">Свернуть</span>
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.66797 8.66675L8.00185 11.7201L11.3346 8.66675" stroke="currentColor" stroke-linecap="square"/>
                                </svg>
                                `
        
        const lineHeight = window.getComputedStyle(textItems[0]).lineHeight;
        let shortHeight = parseFloat(lineHeight) * maxLines;
    
        textItems.forEach(textItem => {
        
            let fullHeight = textItem.offsetHeight;

            if(fullHeight > shortHeight) {


                let showHideBtn = document.createElement('button');
                showHideBtn.setAttribute('type', 'button');
                showHideBtn.classList.add('collapsible-text__btn');
                showHideBtn.innerHTML = showMoreLayout

                let collapsibleText = document.createElement('div');
                collapsibleText.classList.add("collapsible-text")
    
                textItem.before(collapsibleText)

                collapsibleText.appendChild(textItem)
                collapsibleText.appendChild(showHideBtn)

                textItem.style.maxHeight = shortHeight + 'px'
                
                showHideBtn.addEventListener('click', function(e) {
                    if(collapsibleText.classList.contains('collapsible-text--opened')) {
                        collapsibleText.classList.remove('collapsible-text--opened')
                        textItem.style.maxHeight = shortHeight + 'px'
                    } else {
                        collapsibleText.classList.add('collapsible-text--opened')
                        textItem.style.maxHeight = fullHeight + 'px'
                    }
                })
            }
 
        })
        
    }

    // прогресс скролла
    const historyModalProgress = historyModal.querySelector('[data-js="historyModalProgress"]');
    const historyModalScroller = historyModal.querySelector('[data-js="historyModalScroller"]');

    if(historyModalProgress && historyModalScroller) {
        
        const progressTopPosition = parseInt(window.getComputedStyle(historyModalProgress).getPropertyValue('top'));
        const scrollerGap = parseInt(window.getComputedStyle(historyModalScroller).getPropertyValue('gap'));
        const line = historyModalScroller.querySelector('[data-js="historyModalProgressLine"]');
        const blockHeight = historyModalScroller.offsetHeight;
        let blockScrollHeight = historyModalScroller.scrollHeight;
        let startScrollHeight = blockScrollHeight;

        const rows = historyModalScroller.querySelectorAll('[data-js="historyModalRow"]')
        const points = historyModalScroller.querySelectorAll('[data-js="historyModalPoint"]')

        let lineHeight = blockScrollHeight - progressTopPosition
        let pointPercentsArr = getpointPercentsArr()

        historyModalProgress.style.height = lineHeight + 'px';

        scrollController()

        historyModalScroller.addEventListener('scroll', scrollController)

        historyModalScroller.addEventListener("transitionend", function () {
            historyModalProgress.style.height = startScrollHeight - progressTopPosition + 'px';
            blockScrollHeight = historyModalScroller.scrollHeight;
            lineHeight = blockScrollHeight - progressTopPosition;
            pointPercentsArr = getpointPercentsArr();
            historyModalProgress.style.height = lineHeight + 'px';
            scrollController()
        }, false);

        function scrollController() {
            let fullScroll = blockScrollHeight - blockHeight
            let currentProgress = fullScroll > 0 ? historyModalScroller.scrollTop / fullScroll * 100 : 100

            line.style.height = currentProgress + '%'

            pointPercentsArr.forEach((pointPercent, index) => {
                if(currentProgress >= pointPercent) {
                    points[index].classList.add('active')
                    /*rows.forEach(row => {
                        row.classList.remove('active')
                    })
                    rows[index].classList.add('active')*/
                } else {
                    points[index].classList.remove('active')
                }
            })
           
        }

        function getpointPercentsArr() {
            let arr = []
            let acc = 0
            rows.forEach((row, index) => {

                if(index == 0) {
                    acc = 0
                } else {
                    acc += rows[index - 1].offsetHeight + scrollerGap
                }

                arr.push(Math.round(acc / lineHeight * 100))

            })

            return arr
        }
        
    
    }
}