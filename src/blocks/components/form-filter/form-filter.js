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
                        filterTabSelectOpen(filterTabSelect)
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

            function filterTabSelectOpen(currentItem) {
                filterTabSelects.forEach(item => {
                    filterTabSelectClose(item)
                })
                currentItem.classList.add('active')
                currentItem.classList.remove('has-checked')

            }

            document.addEventListener('click', function(e) {
                if(!e.target.closest('[data-js="filterTabSelect"]')) {
                    filterTabSelects.forEach(item => {
                        filterTabSelectClose(item)
                    })
                }
            })
        }

        // Sorts
        const filterSelects = formFilter.querySelectorAll('[data-js="filterSelect"]')

        if(filterSelects.length > 0) {
            filterSelects.forEach(filterSelect => {
                const filterSelectHeader = filterSelect.querySelector("[data-js='filterSelectHeader']")
                const filterSelectOptions = filterSelect.querySelectorAll("[data-js='filterSelectOption']")
                const filterSelectFake = filterSelect.querySelector("[data-js='filterSelectFake']")
                const filterSelectInput = filterSelect.querySelector("[data-js='filterSelectInput']")

                filterSelectHeader.addEventListener('click', function() {
                    if(filterSelect.classList.contains('active')) {
                        filterSelectClose(filterSelect)
                    } else {
                        filterSelectOpen(filterSelect)
                    }
                })

                filterSelectOptions.forEach(filterSelectOption => {
                    filterSelectOption.addEventListener('click', function() {
                        filterSelectOptions.forEach(item => {
                            item.classList.remove('active');
                        })

                        let currentVal = this.dataset.value

                        filterSelectFake.innerHTML = currentVal
                        filterSelectInput.value = currentVal
                        this.classList.add('active')
                        filterSelectClose(filterSelect)

                    })
                })
            })

            function filterSelectClose(currentItem) {
                currentItem.classList.remove('active')
                let innerDateSelect = currentItem.querySelector('[data-js="dateSelect"]')

                if(innerDateSelect) {
                    innerDateSelect.classList.remove('active')
                }
            }

            function filterSelectOpen(currentItem) {
                filterSelects.forEach(item => {
                    filterSelectClose(item)
                })
                currentItem.classList.add('active')
            }

            document.addEventListener('click', function(e) {
                if(!e.target.closest('[data-js="filterSelect"]') && !e.target.closest('.air-datepicker-cell') && !e.target.closest('i')) {
                    filterSelects.forEach(item => {
                        filterSelectClose(item)
                    })
                }
            })


            // Dates
            const dateSelects = formFilter.querySelectorAll('[data-js="dateSelect"]')
    
            if(dateSelects.length > 0) {
               dateSelects.forEach(dateSelect => {
                    const filterSelect = dateSelect.closest("[data-js='filterSelect']")    
                    const filterSelectInput = filterSelect.querySelector("[data-js='filterSelectInput']")
                    const filterSelectFake = filterSelect.querySelector("[data-js='filterSelectFake']")
                    const dateSelectInput = dateSelect.querySelector('[data-js="dateSelectInput"]')
                    const dateSelectHeader = dateSelect.querySelector('[data-js="dateSelectHeader"]')
                    const dateSelectReset = dateSelect.querySelector('[data-js="dateSelectReset"]')
                    const dateSelectSet = dateSelect.querySelector('[data-js="dateSelectSet"]')
                    const dateSelectClose = dateSelect.querySelector('[data-js="dateSelectClose"]')
        
                    let dp = new AirDatepicker(dateSelectInput, {
                        inline: true,
                        range: true,
                        multipleDatesSeparator: ' - ',
                        prevHtml: `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.75391 6.6665L8.08778 9.71984L11.4206 6.6665" stroke="currentColor" stroke-linecap="square"/>
                        </svg>`,
                        nextHtml: `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.75391 6.6665L8.08778 9.71984L11.4206 6.6665" stroke="currentColor" stroke-linecap="square"/>
                        </svg>`
                    })
        
                    dateSelectHeader.addEventListener('click', function() {
                        if(dateSelect.classList.contains('active')) {
                            dateSelect.classList.remove('active')
                        } else {
                            dateSelect.classList.add('active')
                        }
                    })

                    dateSelectReset.addEventListener('click', function() {
                        dp.clear()
                    })

                    dateSelectClose.addEventListener('click', function() {
                        dp.clear()
                        dateSelect.classList.remove('active')
                    })

                    dateSelectSet.addEventListener('click', function() {
                        if(dateSelectInput.value.length < 1) return
                        filterSelectFake.innerHTML = dateSelectInput.value
                        filterSelectInput.value = dateSelectInput.value
                        filterSelectClose(filterSelect)
                    })
               })
           }

        }

    })
}
