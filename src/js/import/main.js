document.addEventListener('DOMContentLoaded', () => {
    $('img.lazyload').lazyload();
    newsSmiSliderInit()
    contactsController()
    productSafetyController()
    fancyboxInit()
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

// Страница контакты
function contactsController() {

    const contactsBlock = document.querySelector('[data-js="contactsBlock"]')
    
    if(!contactsBlock) return

    // Инициализация карты
    
    const mapContainer = contactsBlock.querySelector('[data-js="contactsMap"]')
    let mapPlacemarks = [...contactsBlock.querySelectorAll('[data-js="contactsTabsOption"]')].concat([...contactsBlock.querySelectorAll('[data-js="contactsTabsTab"]')])
    let map = false

    ymaps.ready(function () {

        let center = mapPlacemarks.length > 0 ? mapPlacemarks[0].dataset.coords.replace(/\s/g,"").split(",") : [59.938784,30.314997]
        
        let windowWidth = window.innerWidth
        let zoom = 12;

        if(windowWidth < 768) {
            zoom = 12
        }
    
        map = new ymaps.Map(mapContainer, {
            center: center,
            zoom: zoom,
            controls: []
        });

        let myGeoObjects = []
        
        mapPlacemarks.forEach(placemark => {
            
            let currentPlacemark = new ymaps.Placemark(
                placemark.dataset.coords.replace(/\s/g,"").split(","),
                {},
                {
                    openEmptyBalloon: true,
                    iconLayout: 'default#image',
                    iconImageHref: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjEnIGhlaWdodD0nMzUnIHZpZXdCb3g9JzAgMCAyMSAzNScgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMTcuNjMzNiAzNC40MDk0SDkuMzg2NzJMMjAuNDMyNCAyMy4zNjM4VjMxLjYxNUwxNy42MzM2IDM0LjQwOTRaJyBmaWxsPScjRDcwNDA4Jy8+PHBhdGggZD0nTTE3LjYzMSAzNC40MDkySDkuMzg0MTJMMCAyNC45MjQ0VjE2LjY5MzhMMTcuNjMxIDM0LjQwOTJaJyBmaWxsPScjMTQxNDE0Jy8+PHBhdGggZD0nTTEzLjQ5OSAyNy40MjgzTDYuOTA2MjUgMjAuODM1NUwxMy40OTkgMTQuMjQxM0wyMC4wOTAyIDIwLjgzNTVMMTMuNDk5IDI3LjQyODNaJyBmaWxsPScjMTQxNDE0Jy8+PHBhdGggZD0nTTIwLjQyOTggMC4zNDk4NTRIMTMuMDQ5MkwxNC42OTE1IDEuOTc1ODJMMCAxNi42NTRWMjQuOTA1M0wxOC44MzA1IDYuMDg4MTNMMjAuNDI5OCA3LjY3MjY0VjAuMzQ5ODU0WicgZmlsbD0nI0Q3MDQwOCcvPjwvc3ZnPgo=",
                    iconImageSize: [30, 30],
                    iconImageOffset: [-15, -15],
                }
            );

            myGeoObjects.push(currentPlacemark)
            
        });

        var clusterer = new ymaps.Clusterer({
            gridSize: 120,
            preset: 'islands#redClusterIcons'
        });

        clusterer.add(myGeoObjects);

        map.geoObjects.add(clusterer);


    });

    // Работа табов
    const tabs = contactsBlock.querySelectorAll('[data-js="contactsTabsTab"]')
    const selectBlock = contactsBlock.querySelector('[data-js="contactsTabsSelect"]')
    const select = selectBlock.querySelector('[data-js="formSelect"]')
    const options = select.querySelectorAll('[data-js="contactsTabsOption"]')
    const infoItems = contactsBlock.querySelectorAll('[data-js="contactsInfoItem"]')

    if(tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                contactsSwitch(tab)
            })
        })
    }

    $(select).on('change', function() {
        let currentOptionIndex = select.selectedIndex
        contactsSwitch(options[currentOptionIndex])

    })

    function contactsSwitch(tab) {

        map.setCenter(getCoordsArr(tab.dataset.coords))

        tabs.forEach(item => {
            item.classList.remove('active')
        })

        if(tab.dataset.js == 'contactsTabsTab') {
            tab.classList.add('active')
            selectBlock.classList.remove('active')
        } else {
            selectBlock.classList.add('active')
        }

        infoItems.forEach((item, index) => {
            item.classList.remove('active')

            if(index == tab.dataset.id) {
                item.classList.add('active')
            }
        })
    }

    function getCoordsArr(coords) {
        return coords.replace(/\s/g, '').split(',')
    }
}

// страница безопасность изделия
function productSafetyController() {
    const safetySliderBlock = document.querySelector('[data-js="productSafetySliderBlock"]')

    if(!safetySliderBlock) return

    const safetySlider = safetySliderBlock.querySelector('[data-js="productSafetySlider"]')
    const sliderPrev = safetySliderBlock.querySelector('[data-js="sliderPrev"]')
    const sliderNext = safetySliderBlock.querySelector('[data-js="sliderNext"]')

    const safetySliderEx = new Swiper(safetySlider, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
            nextEl: sliderNext,
            prevEl: sliderPrev,
        },
    })

}

//Инициализация фансибокса
function fancyboxInit() {
    Fancybox.bind("[data-fancybox]", {
        placeFocusBack: false,
        mainClass: 'my-fancybox',
        idle: false,
        Carousel: {
            transition: "crossfade",
            Navigation: {
                prevTpl: '<svg><use xlink:href=img/sprites/sprite.svg#arrow_classic></use></svg>',
                nextTpl: '<svg><use xlink:href=img/sprites/sprite.svg#arrow_classic></use></svg>',
              },
        },
        Thumbs: {
            type: "classic",
        },
        Toolbar: {
            enabled: true,
            display: {
                left: [],
                middle: [],
                right: [
                  "close",
                ],
            },
        }

    });
}
