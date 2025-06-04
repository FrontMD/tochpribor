function bigMenuHeight() {
    const bigMenuLists = document.querySelectorAll('[data-js="bigMenuList"]');

    if(bigMenuLists.length < 1) return

    if (typeof window.distPath == 'undefined') {
        window.distPath = '';
    }
    const showMoreLayout =  `
                            <span class="show">Показать еще</span>
                            <span class="hide">Скрыть</span>   
                            <svg>
                                <use xlink:href="${window.distPath}img/sprites/sprite.svg#arrow_angle"></use>
                            </svg>
                            `
    

    bigMenuLists.forEach(bigMenuList => {
        const bigMenuListItems = bigMenuList.querySelectorAll('[data-js="bigMenuItem"]');

        if(bigMenuListItems.length > 5) {
            let itemsBlock = bigMenuList.querySelector('[data-js="bigMenuItems"]');
            let fullHeight = itemsBlock.offsetHeight;
            let shortHeight = 40
            let showHideBtn = document.createElement('button');

            for(let i = 0; i < 5; i++) {
                shortHeight += bigMenuListItems[i].offsetHeight
            }

            showHideBtn.setAttribute('type', 'button');
            showHideBtn.classList.add('big-menu__show');
            showHideBtn.innerHTML = showMoreLayout

            bigMenuList.appendChild(showHideBtn)
            itemsBlock.style.maxHeight = shortHeight + 'px'

            showHideBtn.addEventListener('click', function(e) {
                if(this.classList.contains('big-menu__show--opened')) {
                    this.classList.remove('big-menu__show--opened')
                    itemsBlock.style.maxHeight = shortHeight + 'px'
                } else {
                    this.classList.add('big-menu__show--opened')
                    itemsBlock.style.maxHeight = fullHeight + 'px'
                }
            })
        }
    })

}