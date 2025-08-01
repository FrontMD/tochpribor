function cookieInit() {
    const cookieMessage = document.querySelector('[data-js="cookie"]');

    if(!cookieMessage) return

    const cookieBtn = cookieMessage.querySelector('[data-js="cookieBtn"]');
    const cookieName = 'cookie_policy'

    let currentCookieValue = document.cookie.match(new RegExp("(?:^|; )" + cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));

    if (!currentCookieValue) {
        cookieMessage.classList.add('active');
    }

    cookieBtn.addEventListener('click', function () {
        document.cookie = `${cookieName}=true`
        cookieMessage.classList.remove('active');
    });
}