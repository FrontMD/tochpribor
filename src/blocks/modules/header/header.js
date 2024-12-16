function headerSearch() {
    const searchOpen = document.querySelector('[data-js="headerSearchOpen"]')
    const search = document.querySelector('[data-js="headerSearchContent"]')

    if(!searchOpen || !search) return

    const header = search.closest('[data-js="siteHeader"]')

    const mainBurger = document.querySelector('[data-js="mainBurger"]')

    const headerSearchCloseBtns = header.querySelectorAll('[data-js="headerSearchClose"]')

    searchOpen.addEventListener('click', () => {
        if(mainBurger) {
            mainBurger.classList.remove('active')
        }
        search.classList.add('active')
        lockBody()
    })

    if(headerSearchCloseBtns.length > 0) {
        headerSearchCloseBtns.forEach(headerSearchClose => {        
            headerSearchClose.addEventListener('click', () => {
                search.classList.remove('active')
                unlockBody()
            })
        });
    }

}