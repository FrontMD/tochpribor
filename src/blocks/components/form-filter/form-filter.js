function formFilterController() {
    const formsFilter = document.querySelectorAll('[data-js="formFilter"]')

    if(formsFilter.length < 1) return

    formsFilter.forEach(formFilter => {
        // Tabs
        const filterTabSelects = formFilter.querySelectorAll('[data-js="filterTabSelect"]')

        if(filterTabSelects.length > 0) {
            filterTabSelects.forEach(filterTabSelect => {
                const filterTabSelectInner = filterTabSelect.querySelector('[data-js="filterTabSelectInner"]')
                const filterTabSelectSet = filterTabSelect.querySelector('[data-js="filterTabSelectSet"]')
                const filterTabSelectClear = filterTabSelect.querySelector('[data-js="filterTabSelectClear"]')

                filterTabSelectInner.addEventListener('click', function() {
                    if(filterTabSelect.classList.contains('active')) {
                        filterTabSelectClose(filterTabSelect)
                    } else {
                        filterTabSelectOpen()
                    }
                })

                filterTabSelectSet.addEventListener("click", function() {
                    filterTabSelectClose(filterTabSelect)
                })

                filterTabSelectClear.addEventListener("click", function() {
                    const checkboxes = filterTabSelect.querySelectorAll("input[type=checkbox]:checked")

                    checkboxes.forEach(checkbox => {
                        checkbox.checked = false
                    })

                    filterTabSelectClose(filterTabSelect)
                })

                function filterTabSelectClose(currentItem) {
                    currentItem.classList.remove('active')
                    const checkboxes = currentItem.querySelectorAll("input[type=checkbox]:checked")
    
                    if(checkboxes.length > 0) {
                        currentItem.classList.add('has-checked')
                    } else {
                        currentItem.classList.remove('has-checked')
                    }
                }

                function filterTabSelectOpen() {
                    filterTabSelects.forEach(item => {
                        filterTabSelectClose(item)
                    })
                    filterTabSelect.classList.add('active')
                    filterTabSelect.classList.remove('has-checked')

                }
            })
        }

        // Sorts
        const filterSelects = formFilter.querySelectorAll('[data-js="filterSelect"]')

        if(filterSelects.length > 0) {
            console.log(filterSelects)
        }
    })
}
