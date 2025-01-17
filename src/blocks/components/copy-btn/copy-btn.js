function copyBtn() {
    const btns = document.querySelectorAll('[data-js="copyBtn"]')

    if(btns.length < 1) return

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('скопированно')
        })
    })
}
