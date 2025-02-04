document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations()
})

function initScrollAnimations() {
    footerScrollAnimation()

    const pageLayout = document.querySelector('[data-js="pageLayout"]')

    if(!pageLayout) return

    const animType = pageLayout.dataset.anim;

    switch(animType) {
        case 'home':
            homeScrollAnimation()
            break
        default:
            break
    }
        
}

function footerScrollAnimation() {
    const footer = document.querySelector('[data-js="siteFooter"]')

    if(!footer) return

    console.log(footer)
}

function homeScrollAnimation() {
    console.log('анимация главной')
}