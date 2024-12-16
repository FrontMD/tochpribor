function mainBurger() {
    const menuOpenBtn = document.querySelector('[data-js="mainBurgerOpen"]')
    const mainBurger = document.querySelector('[data-js="mainBurger"]')

    if(!menuOpenBtn || !mainBurger) return

    const menuCloseBtns = mainBurger.querySelectorAll('[data-js="mainBurgerClose"]')
    
    const headerSearch = document.querySelector('[data-js="headerSearchContent"]')

    menuOpenBtn.addEventListener('click', () => {
        if(headerSearch) {
            headerSearch.classList.remove('active')
        }
        mainBurger.classList.add('active')
        lockBody()
    })

    if(menuCloseBtns.length > 0) {
        menuCloseBtns.forEach(menuCloseBtn => {        
            menuCloseBtn.addEventListener('click', () => {
                mainBurger.classList.remove('active')
                unlockBody()
            })
        });
    }

}