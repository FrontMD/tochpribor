document.addEventListener('DOMContentLoaded', () => {
    newsSmiSliderInit()
})

// Блокировка скролла при открытии модалок
function lockBody() {
	$('body').addClass('no-scroll');

    let scrollbarWidth = getScrollbarWidth()

    $('body').css('padding-right', scrollbarWidth)
    $('[data-js="siteHeader"]').css('padding-right', scrollbarWidth)
}

function unlockBody() {
	$('body').removeClass('no-scroll');
    $('body').css('padding-right', 0);
    $('[data-js="siteHeader"]').css('padding-right', 0)
}

function getScrollbarWidth() {
    let div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth
}

// Слайдер новостей
function newsSmiSliderInit() {
    const sliders = document.querySelectorAll('[data-js="newsSmiSlider"]')

    if(sliders.length < 1) return

    sliders.forEach(slider => {
        let sliderEx = new Swiper(slider, {
            slidesPerView: 'auto',
            spaceBetween: 16
        })
    })
}