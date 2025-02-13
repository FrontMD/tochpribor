document.addEventListener('DOMContentLoaded', () => {
    $('img.lazyload').lazyload();
    newsSmiSliderInit();
    contactsController();
    productSafetyController();
    fancyboxInit();
    simpleMapInit();
    compareSliderInit();
    textTableScrollInit();
    anchorsInit();
    referencesController();
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

// якорные ссылки
function anchorsInit() {

    const anchors = document.querySelectorAll('a[href^="#"]');

    if(anchors.length < 1) return

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const anchorName = this.getAttribute('href').replace('#', '');
            const targetEl = document.getElementById(anchorName);
            const targetTabs = targetEl.closest('[data-js="tabsBlock"]');
            let scrollTopOffset = document.querySelector('[data-js="siteHeader"]') ? document.querySelector('[data-js="siteHeader"]').offsetHeight : '0'

            if(targetTabs) {
                const targetTabsSlide = targetEl.closest('[data-js="tabsBlockSlide"]')
                const targetTabIndex = $(targetTabsSlide).index()
                const targetTab = targetTabs.querySelector(`[data-js="tabsBlockTab"][data-index="${targetTabIndex}"]`)

                if(targetTab) {
                    targetTab.click()
                }

                scrollTopOffset = scrollTopOffset + targetTabs.querySelector('[data-js="tabsBlockList"]').offsetHeight + 32

            }

            const targetElPos = Math.ceil($(targetEl).offset().top - scrollTopOffset)

            window.scrollTo({
                top: targetElPos,
                behavior: 'smooth'
            })
    
        });
    });
}

// управление страницей Референции
function referencesController() {
    const refIntro  = document.querySelector('[data-js="refIntro"]')
    const refMap = document.querySelector('[data-js="refMap"]')

    if(!refIntro || !refMap) return

    const dataAddress = 'https://raw.githubusercontent.com/FrontMD/tochpribor/refs/heads/master/dist/public/data/refereces.json';
    let refData = {};
    let refAllCategories = [];
    let refAllCities = [];
    let allRussiaCities = [];
    let mapEx;

    const map = refMap.querySelector('[data-js="refMapMap"]');

    const refInfo = refMap.querySelector('[data-js="refInfo"]');
    const refInfoRegion = refInfo.querySelector('[data-js="refInfoRegion"]'); 
    const refInfoClose = refInfo.querySelector('[data-js="refInfoClose"]');
    const refInfoCurrent = refInfo.querySelector('[data-js="refInfoCurrent"]');
    const refInfoTabs = refInfo.querySelector('[data-js="refInfoTabs"]');
    const refInfoItems = refInfo.querySelector('[data-js="refInfoItems"]');

    const countriesSelect = refIntro.querySelector('[data-js="filterSelect"][data-name="country"]');
    const regionsSelect = refIntro.querySelector('[data-js="filterSelect"][data-name="region"]');
    const refIntroTabs = refIntro.querySelector('[data-js="refIntroTabs"]');

    ymaps.ready(async function () {
        // строим карту
        let center = "60.247097, 104.132880"
        let zoom = 4;
    
        mapEx = new ymaps.Map(map, {
            center: center.replace(/\s/g, '').split(","),
            zoom: zoom,
            controls: []
        });

        // получаем данные
        try {
            let response = await fetch(dataAddress, {
                method: 'get'
            })

            refData = localData //await response.json()
            console.log(refData)

        } catch (error) {
            console.log('Данные не получены.')
            console.log(error)
            return
        }

        // получаем все категории и все города
        refAllCategories = refData.categories;
        refAllCities = refData.cities;

        // заполняем выпадающие списки и вешаем обработчики
        if(countriesSelect) {
            let allCountries = getCountries();
            setSelectOptions(countriesSelect, allCountries)
            countriesSelect.querySelector('[data-js="filterSelectInput"]').addEventListener('change', countryOnChange)
        }

        if(regionsSelect) {
            let allRegions = getRegions();
            setSelectOptions(regionsSelect, allRegions)
            regionsSelect.querySelector('[data-js="filterSelectInput"]').addEventListener('change', regionOnChange)
        }

        // получаем все стартовые точки (Россия)
        allRussiaCities = getPoints('Россия')

        // выводим все категории
        renderCategories(allRussiaCities)

        // отрисовываем все точки России
        renderPoints(allRussiaCities)

        // Вешаем событие на закрытие info
        refInfoClose.addEventListener('click', () => {
            refInfo.classList.remove('active')
        })
       
    })

    function getPoints(country = '', region = '', city = '') {
        let arr = refAllCities

        if(country) {
            arr = arr.filter(item => item.country == country)
        }

        if(region) {
            arr = arr.filter(item => item.region == region)
        }

        if(city) {
            arr = arr.filter(item => item.city == city)
        }

        return arr;
    }

    // отрисовывает точки на карте на основании списка городов
    function renderPoints(cities) {
        let myGeoObjects = [];
        let items = cities.map((item) => {
            item.items.forEach((i, innerIndex) => {
                i.cityIndex = item.id
                i.innerIndex = innerIndex
            })
            return item = item.items
        }).flat()
        let coordsArr = items.map(item => item = item.coords);

        console.log(items)
        console.log(coordsArr)
            
        coordsArr.forEach((coordsItem, index) => {
            let iconColor = refAllCategories[items[index].category].color.replace(/#/g, '');
          
            let iconHref = `data:image/svg+xml,%3Csvg width='53' height='63' viewBox='0 0 53 63' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.226562 2.24414C0.226562 1.13957 1.12199 0.244144 2.22656 0.244144L50.2266 0.244141C51.3311 0.244141 52.2266 1.13957 52.2266 2.24414V50.0537C52.2266 51.1582 51.3311 52.0537 50.2266 52.0537H34.8654C34.211 52.0537 33.5979 52.3739 33.224 52.911L28.3003 59.9835C27.5237 61.099 25.8845 61.1316 25.0642 60.0478L19.6138 52.8467C19.2357 52.3472 18.6455 52.0537 18.019 52.0537H2.22656C1.12199 52.0537 0.226562 51.1582 0.226562 50.0537V2.24414Z' fill='%23${iconColor}'/%3E%3Cpath d='M15.2266 32.0019V24.3407L29.2834 11.1251L27.2387 9.24414H35.6916V16.4879L33.6244 14.7642L15.2266 32.0019Z' fill='white'/%3E%3Cpath d='M24.5289 40.8124L15.2266 32.002L19.4537 27.6221L28.6632 36.4072L35.6916 29.8951V37.5563L32.1774 40.8124H24.5289Z' fill='white'/%3E%3Crect width='7.64682' height='7.64682' transform='matrix(0.73354 -0.679646 0.73354 0.679646 22.8359 28.1599)' fill='white'/%3E%3Cpath d='M32.7984 40.2374L28.6641 36.4068L35.6925 29.8948V37.556L32.7984 40.2374Z' fill='white'/%3E%3C/svg%3E%0A`

            let currentPlacemark = new ymaps.Placemark(
                coordsItem = coordsItem.replace(/[\[\]]/g, '').split(","),
                {},
                {
                    hasBalloon: false,
                    hasHint: false,
                    iconLayout: 'default#image',
                    iconImageHref: iconHref,
                    iconImageSize: [52, 62],
                    iconImageOffset: [-26, -31],
                }
            );

            currentPlacemark.events.add('click', function (e) {
                let currentItemIndex = '';
                renderInfo(items[index].innerIndex, items[index].cityIndex);
            })

            myGeoObjects.push(currentPlacemark)
        });

        var clusterer = new ymaps.Clusterer({
            gridSize: 120,
            preset: 'islands#redClusterIcons'
        });

        clusterer.add(myGeoObjects);

        mapEx.geoObjects.add(clusterer);
    }

    // отрисовывает категории на основании списка городов
    function renderCategories(cities) {
        if(refIntroTabs) {
            let categories = cities.reduce((acc, city) => {

                city.items.forEach(item => {
                    if(!acc.includes(item.category)) {
                        acc.push(item.category)
                    }
                })

                return acc
            }, [])


            categories.forEach(category => {
                const tabEl = document.createElement('div')

                tabEl.classList.add('ref-intro__tab', 'ref-tab')
                tabEl.setAttribute('data-js', 'refIntroTab')

                tabEl.innerHTML = `
                                    <label>
                                        <input class="ref-tab__input" type="checkbox">
                                        <div class="ref-tab__inner">
                                            <div class="ref-tab__icon" style="background-color: ${refAllCategories[category].color};")>
                                                <img src="img/ref_logo.svg">
                                            </div>
                                            <div class="ref-tab__name">${refAllCategories[category].name}</div>
                                            <div class="ref-tab__remove">
                                                <svg>
                                                    <use xlink:href="img/sprites/sprite.svg#close"></use>
                                                </svg> 
                                            </div>
                                        </div>
                                    </label>
                                `
                
                refIntroTabs.appendChild(tabEl)
            })

            // ТУТ ЗАПУСТИТЬ ОБРАБОТЧИК КЛИКА ПО КАТЕГОРИЯМ

        } else {
            return
        }
    }

    // отрисовывает info и скроллит к нужному продукту
    function renderInfo(itemIndex, cityId) {
        const currentCity = refAllCities.filter(item => item.id == cityId)
        const currentState = refInfo.dataset.state ? refInfo.dataset.state : false;
        const newState = currentCity.region ? currentCity.region : currentCity.name;

        if(currentState !== newState) {
            // тут логика перерисовки

        }

        //тут скрол к нужному продукту

        refInfo.classList.add('active')
    }

    // возращает список всех стран
    function getCountries() {
        let arr = refAllCities.reduce((acc, item) => {
            if(!acc.includes(item.country)) {
                acc.push(item.country)
            }
            return acc
        }, [])
        return arr
    }

    // возвращает список всех регионов
    function getRegions() {
        let arr = refAllCities.reduce((acc, item) => {
            if(item.region.length > 0 && !acc.includes(item.region)) {
                acc.push(item.region)
            }
            return acc
        }, [])
        return arr
    }

    // заполняет выпадающие списки
    function setSelectOptions(select, options) {
        let input = select.querySelector('[data-js="filterSelectInput"]');
        let content = select.querySelector('[data-js="filterSelectContent"]');

        input.innerHTML = '';
        content.innerHTML = ''

        options.forEach(option => {
            let optionEl = document.createElement('option');
            optionEl.setAttribute('value', option);
            optionEl.innerHTML = option;
            input.appendChild(optionEl);

            let contentEl = document.createElement('div');
            contentEl.classList.add('filter-select__option');
            contentEl.setAttribute('data-js', 'filterSelectOption');
            contentEl.setAttribute('data-value', option);
            contentEl.innerHTML = option
            content.appendChild(contentEl)
        })
    }

    // обрабатывает выбор страны 
    function countryOnChange() {
        console.log(this)
        console.log('сменили страну')
    }
    
    // обрабатывает выбо региона
    function regionOnChange() {
        console.log(this)
        console.log('сменили регион')
    }

}

localData = {
    "categories": [
        {
            "id": "0",
            "name": "Универсальные испытательные машины",
            "color": "#BDBDBD"
        },
        {
            "id": "1",
            "name": "Аксессуары для испытательных машин",
            "color": "#FF3E41"
        },
        {
            "id": "2",
            "name": "Копры маятниковые и вертикальные",
            "color": "#FFB906"
        },
        {
            "id": "3",
            "name": "Приборы для измерения твердости (твердомеры)",
            "color": "#4495D1"
        },
        {
            "id": "4",
            "name": "Меры твердости эталонные",
            "color": "#013220"
        },
        {
            "id": "5",
            "name": "Динамометры",
            "color": "#F2994A"
        },
        {
            "id": "6",
            "name": "Оборудование для пробоподготовки",
            "color": "#9B51E0"
        },
        {
            "id": "7",
            "name": "Оборудование для технолог. испытаний",
            "color": "#9B51E0"
        },
        {
            "id": "8",
            "name": "Системы температурных испытаний",
            "color": "#6FCF97"
        },
        {
            "id": "9",
            "name": "Машины трения",
            "color": "#013220"
        },
        {
            "id": "10",
            "name": "Испытательные пресса",
            "color": "#F2994A"
        },
        {
            "id": "11",
            "name": "Экстензометры",
            "color": "#9B51E0"
        },
        {
            "id": "12",
            "name": "Видеоизмерительные системы Girmax",
            "color": "#9B51E0"
        },
        {
            "id": "13",
            "name": "Приборы  для измерения цвета",
            "color": "#6FCF97"
        },
        {
            "id": "14",
            "name": "Микроскопы",
            "color": "#6FCF97"
        }
    ],
    "cities": [
        {
            "id": "0",
            "name": "Москва",
            "country": "Россия",
            "region": "Московская область",
            "items": [
                {
                    "name": "ИР 5047-50 разрывная машина универсальная",
                    "img": "img/catalog/product_4.webp",
                    "link": "javascript:void(0)",
                    "category": "0",
                    "companies": [
                        "Московская ГЭС",
                        "ООО «ЛКС»"
                    ],
                    "coords": "55.658564, 37.596158"
                },
                {
                    "name": "ИР 5047-50 разрывная машина универсальная",
                    "img": "img/catalog/product_4.webp",
                    "link": "javascript:void(0)",
                    "category": "1",
                    "companies": [
                        "ООО «ЛКС»"
                    ],
                    "coords": "55.783385, 37.756334"
                },
                {
                    "name": "FU DLC 50 кН Испытательная машина",
                    "img": "img/catalog/product_5.webp",
                    "link": "javascript:void(0)",
                    "category": "2",
                    "companies": [
                        "ООО «ЛКС»"
                    ],
                    "coords": "55.831689, 37.458716"
                }
            ]
        },
        {
            "id": "1",
            "name": "Серпухов",
            "country": "Россия",
            "region": "Московская область",
            "items": [
                {
                    "name": "ИР 5047-50 разрывная машина универсальная",
                    "img": "img/catalog/product_4.webp",
                    "link": "javascript:void(0)",
                    "category": "0",
                    "companies": [
                        "ООО «Город»"
                    ],
                    "coords": "54.912940, 37.424694"
                }
            ]
        },
        {
            "id": "2",
            "name": "Иваново",
            "country": "Россия",
            "region": "Ивановская область",
            "items": [
                {
                    "name": "ИР 5047-50 разрывная машина универсальная",
                    "img": "img/catalog/product_4.webp",
                    "link": "javascript:void(0)",
                    "category": "1",
                    "companies": [
                        "ЗАО «Завод»"
                    ],
                    "coords": "56.985750, 40.966570"
                },
                {
                    "name": "FU DLC 50 кН Испытательная машина",
                    "img": "img/catalog/product_5.webp",
                    "link": "javascript:void(0)",
                    "category": "3",
                    "companies": [
                        "ООО «Иваново»"
                    ],
                    "coords": "57.057845, 40.966788"
                }
            ]
        },
        {
            "id": "3",
            "name": "Минск",
            "country": "Беларусь",
            "region": "",
            "items": [
                {
                    "name": "ИР 5047-50 разрывная машина универсальная",
                    "img": "img/catalog/product_4.webp",
                    "link": "javascript:void(0)",
                    "category": "4",
                    "companies": [
                        "Минская ТЭЦ"
                    ],
                    "coords": "53.920813, 27.505310"
                }
            ]
        },
        {
            "id": "4",
            "name": "Астана",
            "country": "Казахстан",
            "region": "",
            "items": [
                {
                    "name": "ИР 5047-50 разрывная машина универсальная",
                    "img": "img/catalog/product_4.webp",
                    "link": "javascript:void(0)",
                    "category": "5",
                    "companies": [
                        "ООО «Компания»"
                    ],
                    "coords": "51.121450, 71.378167"
                }
            ]
        },
        {
            "id": "5",
            "name": "Актобе",
            "country": "Казахстан",
            "region": "",
            "items": [
                {
                    "name": "FU DLC 50 кН Испытательная машина",
                    "img": "img/catalog/product_5.webp",
                    "link": "javascript:void(0)",
                    "category": "6",
                    "companies": [
                        "ООО «Компания»"
                    ],
                    "coords": "50.268616, 57.155667"
                }
            ]
        }
    ]
}