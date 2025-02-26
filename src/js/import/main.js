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
    printBtnsInit();
})

// Блокировка скролла при открытии модалок
function lockBody(onlyHeaderPadding = false) {
    let scrollbarWidth = getScrollbarWidth()

    if(!onlyHeaderPadding) {
        $('body').addClass('no-scroll');
        $('body').css('padding-right', scrollbarWidth)
    }

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
    if (typeof window.distPath == 'undefined') {
        window.distPath = '';
    }
    Fancybox.bind("[data-fancybox]", {
        placeFocusBack: false,
        mainClass: 'my-fancybox',
        idle: false,
        Carousel: {
            transition: "crossfade",
            Navigation: {
                prevTpl: `<svg><use xlink:href=${window.distPath}img/sprites/sprite.svg#arrow_classic></use></svg>`,
                nextTpl: `<svg><use xlink:href=${window.distPath}img/sprites/sprite.svg#arrow_classic></use></svg>`,
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

    if (typeof window.distPath == 'undefined') {
        window.distPath = '';
    }

    if (typeof window.dataAddress == 'undefined') {
        window.dataAddress = 'https://raw.githubusercontent.com/FrontMD/tochpribor/refs/heads/master/dist/public/data/refereces.json';
    }

    const dataAddress = window.dataAddress;
    let refData = {};
    let refAllCategories = [];
    let refAllCities = [];
    let allRussiaCities = [];
    let mapEx;

    const map = refMap.querySelector('[data-js="refMapMap"]');

    const refInfo = refMap.querySelector('[data-js="refInfo"]');
    const refInfoBody = refInfo.querySelector('[data-js="refInfoBody"]');
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

            refData = await response.json()

        } catch (error) {
            console.log('Данные не получены.')
            console.log(error)
            return
        }

        // получаем все категории и все города
        refAllCategories = refData.categories;
        refAllCities = refData.cities;

        // дополняем цвета категорий, если не указаны
        refAllCategories = refAllCategories.map(category => {
            if(!category.color) {
                category.color = getRandomColor()
            }

            return category
        })

        // заполняем выпадающие списки и вешаем обработчики
        if(countriesSelect) {
            let allCountries = getCountries();
            setSelectOptions(countriesSelect, allCountries);
            let fakeSelect = countriesSelect.querySelector('[data-js="filterSelectFake"]')
            fakeSelect.setAttribute('data-empty', fakeSelect.innerHTML)
            countriesSelect.querySelector('[data-js="filterSelectInput"]').addEventListener('change', countryOnChange);
        }

        if(regionsSelect) {
            let allRegions = getRegions();
            setSelectOptions(regionsSelect, allRegions)
            let fakeSelect = regionsSelect.querySelector('[data-js="filterSelectFake"]')
            fakeSelect.setAttribute('data-empty', fakeSelect.innerHTML)
            regionsSelect.querySelector('[data-js="filterSelectInput"]').addEventListener('change', regionOnChange)
        }

        // получаем все стартовые точки (Россия)
        allRussiaCities = getPoints('Россия')

        // выводим все категории
        renderCategories(allRussiaCities)

        // отрисовываем все точки России
        renderPoints(allRussiaCities)
        refMap.setAttribute('data-type', 'country')
        refMap.setAttribute('data-subject', 'Россия')

        // Вешаем обработчик на закрытие info
        refInfoClose.addEventListener('click', () => {
            refInfo.classList.remove('active')
        })

    })

    function getPoints(country = '', region = '') {
        let arr = refAllCities.concat();

        if(country) {
            arr = arr.filter(item => item.country == country)
        }

        if(region) {
            arr = arr.filter(item => item.region == region)
        }

        return arr;
    }

    // отрисовывает точки на карте на основании списка городов
    function renderPoints(cities) {
        mapEx.geoObjects.removeAll()

        let myGeoObjects = [];
        let items = cities.map((item) => {
            item.items.forEach((i, innerIndex) => {
                i.cityIndex = item.id
                i.innerIndex = innerIndex
            })
            return item = item.items
        }).flat()
            
        items.forEach((coordsItem, index) => {
            let iconColor = encodeURIComponent(refAllCategories[coordsItem.category].color);
          
            let iconHref = `data:image/svg+xml,%3Csvg width='53' height='63' viewBox='0 0 53 63' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.226562 2.24414C0.226562 1.13957 1.12199 0.244144 2.22656 0.244144L50.2266 0.244141C51.3311 0.244141 52.2266 1.13957 52.2266 2.24414V50.0537C52.2266 51.1582 51.3311 52.0537 50.2266 52.0537H34.8654C34.211 52.0537 33.5979 52.3739 33.224 52.911L28.3003 59.9835C27.5237 61.099 25.8845 61.1316 25.0642 60.0478L19.6138 52.8467C19.2357 52.3472 18.6455 52.0537 18.019 52.0537H2.22656C1.12199 52.0537 0.226562 51.1582 0.226562 50.0537V2.24414Z' fill='${iconColor}'/%3E%3Cpath d='M15.2266 32.0019V24.3407L29.2834 11.1251L27.2387 9.24414H35.6916V16.4879L33.6244 14.7642L15.2266 32.0019Z' fill='white'/%3E%3Cpath d='M24.5289 40.8124L15.2266 32.002L19.4537 27.6221L28.6632 36.4072L35.6916 29.8951V37.5563L32.1774 40.8124H24.5289Z' fill='white'/%3E%3Crect width='7.64682' height='7.64682' transform='matrix(0.73354 -0.679646 0.73354 0.679646 22.8359 28.1599)' fill='white'/%3E%3Cpath d='M32.7984 40.2374L28.6641 36.4068L35.6925 29.8948V37.556L32.7984 40.2374Z' fill='white'/%3E%3C/svg%3E%0A`

            let currentPlacemark = new ymaps.Placemark(
                coordsItem.coords.replace(/[\[\]]/g, '').split(","),
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
                renderInfo(items[index].cityIndex, items[index].innerIndex);
            })

            if(!coordsItem.noRender) {
                myGeoObjects.push(currentPlacemark)
            }
        });

        var clusterer = new ymaps.Clusterer({
            gridSize: 50,
            preset: 'islands#redClusterIcons'
        });

        clusterer.add(myGeoObjects);

        mapEx.geoObjects.add(clusterer);

        mapEx.setBounds(mapEx.geoObjects.getBounds());
        let currentZoom = mapEx.getZoom() > 11 ? 11 : mapEx.getZoom() - 1;
        mapEx.setZoom(currentZoom);
    }

    // отрисовывает категории на основании списка городов
    function renderCategories(cities) {
        if(refIntroTabs) {
            refIntroTabs.innerHTML = '';
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
                                        <input class="ref-tab__input" type="checkbox" value="${refAllCategories[category].id}">
                                        <div class="ref-tab__inner">
                                            <div class="ref-tab__icon" style="background-color: ${refAllCategories[category].color};")>
                                                <img src="${window.distPath}img/ref_logo.svg">
                                            </div>
                                            <div class="ref-tab__name">${refAllCategories[category].name}</div>
                                            <div class="ref-tab__remove">
                                                <svg>
                                                    <use xlink:href="${window.distPath}img/sprites/sprite.svg#close"></use>
                                                </svg> 
                                            </div>
                                        </div>
                                    </label>
                                `
                
                refIntroTabs.appendChild(tabEl)

                tabEl.addEventListener('change', tabsOnChange)
            })

        } else {
            return
        }
    }

    // отрисовывает info и скроллит к нужному продукту
    function renderInfo(cityId, itemIndex = false) {
        const currentCity = refAllCities.find(item => item.id == cityId);
        const newRegion = currentCity.region ? currentCity.region : currentCity.name;
        const newCategoryId = currentCity.items[itemIndex].category;
        const currentCategory = refAllCategories.find(item => item.id == newCategoryId);
        
        // отрисовываем регион и текущую категорию
        refInfoRegion.innerHTML = newRegion
        refInfoCurrent.querySelector('.icon').style.backgroundColor = currentCategory.color;
        refInfoCurrent.querySelector('.name').innerHTML = currentCategory.name;
        
        // получаем все города в регионе
        const citiesList = refAllCities.filter(item => item.region == newRegion || item.name == newRegion);

        // получаем все товары в регионе и определяем текущий товар
        const fullItemsList = citiesList.map(city => {
    
            city.items.forEach((item, index) => {
                if(city.id == cityId && index == itemIndex) {
                    item.isCurrent = true
                } else {
                    item.isCurrent = false
                }
            })

            return city.items
        }).flat()

        let itemsList = fullItemsList.filter(item => item.category == newCategoryId);

        // отрисовываем товары
        renderItemsList(itemsList)

        // отрисовываем фильтр категорий и вешаем обработчик
        const regionCategoriesIdList = citiesList.reduce((arr, city) => {
            city.items.forEach(item => {
                if(!arr.includes(item.category)) {
                    arr.push(item.category)
                }
            })
            
            return arr
        }, [newCategoryId])

        let regionCategoriesList = []
    
        regionCategoriesIdList.forEach(categoryId => {
            let currentCategory = refAllCategories.find(item => item.id == categoryId)
            regionCategoriesList.push(currentCategory)
        })

        refInfoTabs.innerHTML = ''
        regionCategoriesList.forEach((category, index) => {
            let categoryEl = document.createElement('div');
            categoryEl.classList.add('ref-info__tab');
            categoryEl.setAttribute('data-js', 'refInfoTab');
            categoryEl.setAttribute('data-category', category.id);
            categoryEl.innerHTML = category.name;

            if(index == 0) {
                categoryEl.classList.add('active');
            }

            refInfoTabs.appendChild(categoryEl);

            categoryEl.addEventListener('click', function () {
                let allTabs = refInfoTabs.querySelectorAll('[data-js="refInfoTab"]');

                allTabs.forEach(tab => {
                    tab.classList.remove('active');
                })

                categoryEl.classList.add('active');
                let newCatId = categoryEl.dataset.category

                refInfoCurrent.querySelector('.icon').style.backgroundColor = category.color;
                refInfoCurrent.querySelector('.name').innerHTML = category.name;

                renderItemsList(fullItemsList.filter(item => item.category == newCatId))
            })
        })

        // показываем info
        refInfo.classList.add('active')

        // скроллим к товару
        let iHeight = refInfoBody.offsetHeight
        let iScrollHeight = refInfoBody.scrollHeight

        if(iScrollHeight > iHeight) {
            let currentItem = refInfoItems.querySelector('[data-current]');

            refInfoBody.scrollTo({
                top: currentItem.offsetTop - 16,
                behavior: 'smooth'
            })
        }
    }

    // отрисовывает список товаров в info
    function renderItemsList(itemsList) {
        refInfoItems.innerHTML = ''
        const defaultImg = window.distPath + 'img/default_logo.webp'

        itemsList.forEach(item => {
            const el = document.createElement('div')
            let companiesLayout = ''

            item.companies.forEach(company => {
                companiesLayout += `<div class="ref-item__buyer">${company}</div>`
            })

            el.classList.add('ref-item')
            el.innerHTML = `                                
                            <div class="ref-item__img ${item.img.length > 0 ? '' : 'ref-item__img--bg'}">
                                <img src="${item.img.length > 0 ? item.img : defaultImg}">
                            </div>
                            <div class="ref-item__info">
                            <div class="ref-item__name">${item.name}</div>
                            <div class="ref-item__buyers">
                                ${companiesLayout}
                            </div>
                            </div>
                            <a class="btn ref-item__btn btn--transparent-red btn--full" href="${item.link}">
                                <span class="btn__text">Подробнее</span>
                            </a>
                        `
            if(item.isCurrent) {
                el.setAttribute('data-current', '')
            }

            refInfoItems.appendChild(el)
        })
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
        resetSelect(regionsSelect)
        refInfo.classList.remove('active')

        // получаем все стартовые точки страны
        const allCountryCities = getPoints(this.value)

        // выводим все категории
        renderCategories(allCountryCities)

        // отрисовываем все точки
        renderPoints(allCountryCities)

        refMap.setAttribute('data-type', 'country')
        refMap.setAttribute('data-subject', this.value)
    }
    
    // обрабатывает выбор региона
    function regionOnChange() {
        resetSelect(countriesSelect)
        refInfo.classList.remove('active')

        // получаем все стартовые точки региона
        const allRegionCities = getPoints('Россия', this.value)

        // выводим все категории
        renderCategories(allRegionCities)

        // отрисовываем все точки
        renderPoints(allRegionCities)

        refMap.setAttribute('data-type', 'region')
        refMap.setAttribute('data-subject', this.value)
    }

    // Сбрасывает селект в исходное состояние
    function resetSelect(select) {
        let fakeSelect = select.querySelector('[data-js="filterSelectFake"]')
        fakeSelect.innerHTML = fakeSelect.dataset.empty
    }

    // Обрабатывает фильтр категорий
    function tabsOnChange() {
        refInfo.classList.remove('active')

        const currentType = refMap.dataset.type;
        const currentSubject = refMap.dataset.subject;
        const checkboxesList = refIntroTabs.querySelectorAll('[data-js="refIntroTab"] input:checked');
        let currentCities = [];

        let checkedList = [... checkboxesList].map(item => item = item.value)

        if(currentType == 'country') {
            currentCities = JSON.parse(JSON.stringify(getPoints(currentSubject)))
        } else if(currentType == 'region') {
            currentCities = JSON.parse(JSON.stringify(getPoints('Россия', currentSubject)))
        } else {
            currentCities = JSON.parse(JSON.stringify(getPoints('Россия')))
        }

        if(checkedList.length > 0) {
            let filteredCities = currentCities.map(city => {
                
                let newItems = city.items.map(item => {
                    if(!checkedList.includes(item.category.toString())) {
                        item.noRender = true
                    }

                    return item
                })

                city.items = newItems

                return city
            })

            renderPoints(filteredCities)

        } else {

            renderPoints(currentCities)
        }

        
    }

    // генерирует случайный цвет
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}

// кнопки Распечатать
function printBtnsInit() {
    const printBtns = document.querySelectorAll('[data-js="printBtn"]');

    if(printBtns.length < 1) return

    printBtns.forEach(printBtn => {
        printBtn.addEventListener('click', function() {
            window.print();
        })
    })
}