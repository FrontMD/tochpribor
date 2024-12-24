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

function userCity() {

    const userCity = document.querySelector('[data-js="userCity"]')

    if(!userCity) return

    const userCityHeader = userCity.querySelector('[data-js="userCityHeader"]')
    const userCityContent = userCity.querySelector('[data-js="userCityContent"]')
    let defaultCity = 'Санкт-Петербург'

    if(userCity.dataset.default && userCity.dataset.default.length > 0) {
        defaultCity = userCity.dataset.default
    }

    let cityBtnsText = userCity.querySelectorAll("[data-js='userCityText']");
    let userCityCookie = getUserCityCookie();
    let cityBtnYes = userCity.querySelector("[data-js='cityBtnYes']");
    let cityBtnNo = userCity.querySelector("[data-js='cityBtnNo']");

    if(userCityCookie.length > 0) {
        cityBtnsText.forEach(item => {
            item.innerHTML = userCityCookie;
        })
    } else {
        cityBtnsText.forEach(item => {
            item.innerHTML = defaultCity;
        })

        userCityContent.classList.add('active')
    }

    userCityHeader.addEventListener('click', () => {
        $(userCityContent).toggleClass('active')
    })

    cityBtnYes.addEventListener('click', () => {
        userCityContent.classList.remove('active')

        let currentCity = userCityContent.querySelector('[data-js="userCityText"]').innerText

        if(currentCity.length > 0) {
            document.cookie= encodeURIComponent("user_city") + '=' + encodeURIComponent(currentCity);
        }
    })

    const cityModal = document.querySelector('[data-js="cityModal"]')

    cityBtnNo.addEventListener('click', () => {
        userCityContent.classList.remove('active')

        if(cityModal) {
            modals.open('#cityModal')
        }
    })

    if(cityModal) {
        const cityModalItems = cityModal.querySelectorAll('[data-js="cityModalItem"]')

        cityModalItems.forEach(item => {
            item.addEventListener('click', function() {

                document.cookie= encodeURIComponent("user_city") + '=' + encodeURIComponent(this.dataset.value);

                cityBtnsText.forEach(btn => {
                    btn.innerHTML = this.dataset.value;
                })

                modals.close()

            })
        })
    }
}

function getUserCityCookie() {
	let userCookies = [...document.cookie.split(";")];
	let userCity = '';
	userCookies.forEach(cookie => {
		cookie = cookie.trim();
		let [name, value] = cookie.split("=");
		if(name == "user_city" && value !== null && value.length > 0) {
			userCity = value;
		}
	})
	return decodeURIComponent(userCity);
}