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

                if(filterTabSelectSet) {
                    filterTabSelectSet.addEventListener("click", function() {
                        filterTabSelectClose(filterTabSelect)
                    })
                }

                
                if(filterTabSelectClear) {
                    filterTabSelectClear.addEventListener("click", function() {
                        const checkboxes = filterTabSelect.querySelectorAll("input[type=checkbox]:checked")
    
                        checkboxes.forEach(checkbox => {
                            checkbox.checked = false
                        })
    
                        filterTabSelectClose(filterTabSelect)
                    })
                }

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
                const filterSelectContent = filterSelect.querySelector(".filter-select__content")
                const filterSelectFake = filterSelect.querySelector("[data-js='filterSelectFake']")
                const filterSelectInput = filterSelect.querySelector("[data-js='filterSelectInput']")
                
                filterSelectHeader.addEventListener('click', function() {
                    if(filterSelect.classList.contains('active')) {
                        filterSelectClose(filterSelect)
                    } else {
                        filterSelectOpen(filterSelect)
                    }
                })
                
                filterSelectContent.addEventListener('click', function(e) {
                    const filterSelectOptions = filterSelect.querySelectorAll("[data-js='filterSelectOption']")
                    const filterSelectRealOptions = filterSelectInput.querySelectorAll("option")

                    let clickedOption = e.target.closest('[data-js="filterSelectOption"]');

                    if(clickedOption) {
                        filterSelectOptions.forEach(item => {
                            item.classList.remove('active');
                        })

                        let currentVal = clickedOption.dataset.value

                        filterSelectFake.innerHTML = currentVal

                        filterSelectRealOptions.forEach(realOption => {
                            if(realOption.value == currentVal) {
                                realOption.selected = true;
                                filterSelectInput.dispatchEvent(new Event('change'));
                                return
                            }
                        })

                        clickedOption.classList.add('active')
                        filterSelectClose(filterSelect)
                    }
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
                    const filterSelectCustomDate = filterSelectInput.querySelector('[data-js="filterSelectCustomDate"]')
        
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

                        filterSelectCustomDate.value = dateSelectInput.value
                        filterSelectCustomDate.innerHTML = dateSelectInput.value
                        filterSelectCustomDate.selected = true 

                        filterSelectClose(filterSelect)
                    })
               })
           }

        }

        // Range
        const rangeFields = formFilter.querySelectorAll('[data-js="filterRange"]')

        if(rangeFields.length > 0) {
            const formater = {
                from: function (formattedValue) {
                  return Number(formattedValue);
                },
                to: function (numericValue) {
                  return Math.round(numericValue);
                },
              };

            rangeFields.forEach(rangeField => {
                const slider = rangeField.querySelector('[data-js="filterRangeSlider"]');
                const min = parseInt(rangeField.dataset.min);
                const max = parseInt(rangeField.dataset.max);
                const step = parseInt(rangeField.dataset.step);
                const inputsList = [
                    rangeField.querySelector('[data-js="filterRangeMin"]'),
                    rangeField.querySelector('[data-js="filterRangeMax"]')
                ]

                let sliderEx = noUiSlider.create(slider, {
                    start: [min, max],
                    connect: true,
                    format: formater,
                    tooltips: false,
                    step: step,
                    range: {
                        'min': min,
                        'max': max
                    }
                });

                sliderEx.on("update", function (values, handle) {
                    inputsList[handle].value = values[handle]
                    inputsList[handle].dispatchEvent(new Event('change'));
                });

                inputsList.forEach((currentInput, index) => {
                    if(index == 0) {
                        currentInput.addEventListener('input', function() {
                            sliderEx.set([this.value, null])
                        })
                    } else if(index == 1) {
                        currentInput.addEventListener('input', function() {
                            sliderEx.set([null, this.value])
                        })
                    }

                    currentInput.addEventListener('keydown', function(e) {
                        if (e.keyCode === 13) {
                            e.preventDefault()
                            e.stopPropagation()
                            this.blur()
                        }
                    })
                })
               
                formFilter.addEventListener('reset', function() {
                    sliderEx.reset();
                    setTimeout(() => {
                        sliderEx.set([null, null])
                    }, 0)
                })
                

            })
        }

        // Showmore
        const filterLists = formFilter.querySelectorAll('[data-js="filterList"]')

        if(filterLists.length > 0) {
            
                const showMoreLayout =  `
                                        <span class="show">Показать еще</span>
                                        <span class="hide">Скрыть</span>
                                        `
            
                filterLists.forEach(filterList => {
                    const filterListItems = filterList.querySelectorAll('[data-js="filterListItem"]');
            
                    if(filterListItems.length > 5) {
                        let itemsBlock = filterList.querySelector('[data-js="filterListItems"]');
                        let fullHeight = itemsBlock.offsetHeight;
                        let shortHeight = 0
                        let showHideBtn = document.createElement('button');
            
                        for(let i = 0; i < 5; i++) {
                            shortHeight += filterListItems[i].offsetHeight
                        }
            
                        showHideBtn.setAttribute('type', 'button');
                        showHideBtn.classList.add('form-filter__show');
                        showHideBtn.innerHTML = showMoreLayout
            
                        filterList.appendChild(showHideBtn)
                        itemsBlock.style.maxHeight = shortHeight + 'px'
            
                        showHideBtn.addEventListener('click', function(e) {
                            if(this.classList.contains('form-filter__show--opened')) {
                                this.classList.remove('form-filter__show--opened')
                                itemsBlock.style.maxHeight = shortHeight + 'px'
                            } else {
                                this.classList.add('form-filter__show--opened')
                                itemsBlock.style.maxHeight = fullHeight + 'px'
                            }
                        })
                    }
                })
            
        }

        // vacancies filters
        const vacanciesFilter = formFilter.querySelector('[data-js="vacanciesFilter"]')

        if(vacanciesFilter) {
            const vacanciesFilterInner = vacanciesFilter.querySelector('[data-js="vacanciesFilterInner"]')

            vacanciesFilterInner.addEventListener('click', function() {
                if(vacanciesFilter.classList.contains('active')) {
                    vacanciesFilterClose()
                } else {
                    vacanciesFilterOpen()
                }
            })

            function vacanciesFilterClose() {
                vacanciesFilter.classList.remove('active')
            }

            function vacanciesFilterOpen() {
                vacanciesFilter.classList.add('active')

            }

            document.addEventListener('click', function(e) {
                if(!e.target.closest('[data-js="vacanciesFilter"]')) {
                    vacanciesFilterClose()
                }
            })
        }

    })
}
