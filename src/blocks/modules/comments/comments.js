function commentsHeight() {
    const commentsBlock = document.querySelectorAll('[data-js="comments"]');

    if(!commentsBlock) return

    const showMoreLayout =  `
                            <span class="btn__text">
                                Смотреть все 
                            <span class="btn__note" data-js="commentsCount"></span>
                            </span>

                            <button class="btn btn--grey btn--246" type="button" data-js="commentsMore"></button>
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