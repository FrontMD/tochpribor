document.addEventListener('DOMContentLoaded', () => {
    $('img.lazyload').lazyload();
    newsSmiSliderInit();
    contactsController();
    productSafetyController();
    fancyboxInit();
    simpleMapInit();
    compareSliderInit();
    textTableScrollInit();
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
                    openEmptyBalloon: false,
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

// построение простой карты (Вакансии)
function simpleMapInit() {
    const mapsList = document.querySelectorAll('[data-js="simpleMap"]')

    if(mapsList.length < 1) return

    mapsList.forEach(map => {
        let coordsList = map.dataset.coords ? map.dataset.coords : []
        let mapEx = false
        
        ymaps.ready(function () {
            
            let coordsArr = coordsList.length > 0 ? coordsList.replace(/\s/g,"").split("-") : ['[56.960471,40.940674]']
            let center = coordsArr[0]
            let zoom = 12;
        
            mapEx = new ymaps.Map(map, {
                center: center.replace(/[\[\]]/g, '').split(","),
                zoom: zoom,
                controls: []
            });

            let myGeoObjects = []
            
            coordsArr.forEach(coordsItem => {
                
                let currentPlacemark = new ymaps.Placemark(
                    coordsItem = coordsItem.replace(/[\[\]]/g, '').split(","),
                    {},
                    {
                        openEmptyBalloon: false,
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

            mapEx.geoObjects.add(clusterer);

        });
    })
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

// инициализация фансибокса
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
        },
        on: {
            "Carousel.change": (fancybox, event) => {
                let currentSlide = fancybox.getSlide()
              let prevSlide = event.slides[event.prevPage]

              if(prevSlide.type == 'iframe') {
                let player = prevSlide.el.querySelector('iframe')
                let playerSrc = player.getAttribute('src')

                if(playerSrc.includes('rutube')) {
                    player.contentWindow.postMessage(JSON.stringify({
                        type: 'player:pause',
                        data: {}
                    }), '*');
                } else if(playerSrc.includes('vkvideo')) {
                    let player = VK.VideoPlayer(prevSlide.el.querySelector('iframe'));
                    player.pause();
                }
            }

              if(currentSlide.type == 'iframe') {
                let player = currentSlide.el.querySelector('iframe')
                let playerSrc = player.getAttribute('src')

                if(playerSrc.includes('rutube')) {
                    if(player.contentDocument!==null) {
                        player.contentWindow.postMessage(JSON.stringify({
                            type: 'player:play',
                            data: {}
                        }), '*');
                    }  else {
                        player.addEventListener("load", function() {
                            player.contentWindow.postMessage(JSON.stringify({
                                type: 'player:play',
                                data: {}
                            }), '*');
                        })
                    }
                }else if(playerSrc.includes('vkvideo')) {
                    let player = VK.VideoPlayer(currentSlide.el.querySelector('iframe'));
                    player.play();
                }

              }

            },
        },

    });
}

// инициализация слайдера сравнения
function compareSliderInit() {
    const compareBlocks = document.querySelectorAll('[data-js="compareBlock"]')

    if(compareBlocks.length < 1) return

    compareBlocks.forEach(compareBlock => {
        const sliders = compareBlock.querySelectorAll('[data-js="compareSlider"]')
        const sliderPrev = compareBlock.querySelector('[data-js="sliderPrev"]')
        const sliderNext = compareBlock.querySelector('[data-js="sliderNext"]')

        sliders.forEach(slider => {
            const sliderScrollbar = slider.querySelector('[data-js="sliderScrollbar"]')

            if(sliderScrollbar) {
                let sliderEx = new Swiper(slider, {
                    slidesPerView: 'auto',
                    spaceBetween: 8,
                    allowTouchMove: false,
                    navigation: {
                        nextEl: sliderNext,
                        prevEl: sliderPrev,
                    },
                    scrollbar: {
                        el: sliderScrollbar,
                        draggable: false,
                    },
                    breackpoints: {
                        768: {
                            spaceBetween: 12
                        },
                        1421: {
                            spaceBetween: 16
                        }
                    }
 
                })
            } else {
                let sliderEx = new Swiper(slider, {
                    slidesPerView: 'auto',
                    spaceBetween: 8,
                    allowTouchMove: false,
                    navigation: {
                        nextEl: sliderNext,
                        prevEl: sliderPrev,
                    },
                    breackpoints: {
                        768: {
                            spaceBetween: 12
                        },
                        1421: {
                            spaceBetween: 16
                        }
                    }
                })
            }

        })
    })
} 

// горизонтальный скролл таблиц в текстовом редакторе
function textTableScrollInit() {
    const tables = document.querySelectorAll(".text-editor table")

    if(tables.length < 1) return
    
    tables.forEach(table => {
        if(table.parentElement.closest('table') === null) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('text-scroll-h')

            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
        
    })
}
