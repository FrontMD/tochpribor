function formFilterController() {
    const formsFilter = document.querySelectorAll('[data-js="formFilter"]')

    if(formsFilter.length < 1) return

    formsFilter.forEach(formFilter => {
        console.log(formFilter)
    })
}
