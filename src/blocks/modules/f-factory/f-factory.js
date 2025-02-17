function fFactoryController() {
    // переключение споилеров
    const slides = document.querySelectorAll('[data-js="tabsBlockSlide"]');

    if(slides) {
        slides.forEach(slide => {
            const spoilers = slide.querySelectorAll('[data-js="spoiler"]');
            const spoilerSides = slide.querySelectorAll('[data-js="spoilerSide"]');

            if(spoilers && spoilerSides) {

                spoilers.forEach(spoiler => {
                    spoiler.addEventListener('spoilerExpand', (e) => {
                        const targetId = e.target.dataset.side;

                        if(targetId) {
                            spoilerSideToggle(spoilerSides, targetId)
                        }
                    })
                })

            }
        })

        function spoilerSideToggle(list, id) {
            list.forEach(item => {
                if(item.dataset.id == id) {
                    item.classList.add('active')
                } else {
                    item.classList.remove('active')
                }
            })
        }
    }

}