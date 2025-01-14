function commentsHeight() {
    const commentsBlock = document.querySelector('[data-js="comments"]');

    if(!commentsBlock) return

    const commentsItems = commentsBlock.querySelectorAll('[data-js="commentsItem"]');
    
    if(commentsItems.length > 5) {

        const showMoreLayout =  `
                                <span class="btn__text">
                                    <span class="show">Смотреть все</span>
                                    <span class="hide">Скрыть</span>
                                <span class="btn__note" data-js="commentsCount">(${commentsItems.length - 5})</span>
                                </span>
                                `
        let itemsBlock = commentsBlock.querySelector('[data-js="commentsList"]');
        let fullHeight = itemsBlock.offsetHeight;
        let shortHeight = 120
        if(window.innerWidth < 768) {
            shortHeight = 80 
        }
        let showHideBtn = document.createElement('button');

        for(let i = 0; i < 5; i++) {
            shortHeight += commentsItems[i].offsetHeight
        }

        showHideBtn.setAttribute('type', 'button');
        showHideBtn.setAttribute('class', 'btn btn--grey btn--246 comments-list__show');
        showHideBtn.setAttribute('data-js', 'commentsMore');
        showHideBtn.innerHTML = showMoreLayout

        commentsBlock.appendChild(showHideBtn)
        itemsBlock.style.maxHeight = shortHeight + 'px'

        showHideBtn.addEventListener('click', function(e) {
            if(this.classList.contains('opened')) {
                this.classList.remove('opened')
                itemsBlock.style.maxHeight = shortHeight + 'px'
            } else {
                this.classList.add('opened')
                itemsBlock.style.maxHeight = fullHeight + 'px'
            }
        })
    }
}