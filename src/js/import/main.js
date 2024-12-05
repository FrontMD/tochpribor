

function num_word(value, words) {
	value = Math.abs(value) % 100;
	var num = value % 10;
	if (value > 10 && value < 20) return words[2];
	if (num > 1 && num < 5) return words[1];
	if (num == 1) return words[0];
	return words[2];
}

function myLockBody() {
	$('html').addClass('with-fancybox');
	$('body').addClass('hide-scrollbar');
}
function myUnlockBody() {
	$('html').removeClass('with-fancybox');
	$('body').removeClass('hide-scrollbar');
}

$.fn.isXScrollable = function () {
	return this[0].scrollWidth > this[0].clientWidth;
};

$.fn.isYScrollable = function () {
	return this[0].scrollHeight > this[0].clientHeight;
};

$.fn.isScrollable = function () {
	return this[0].scrollWidth > this[0].clientWidth || this[0].scrollHeight > this[0].clientHeight;
};




$(function () {
	const getScrollbarWidth = function () {
		var cssSBWidthVariableName = '--js-scrollbar-width';
		var css1vwInPxWidthVariableName = '--js-real-vw';

		const prevWidth = window
			.getComputedStyle(document.documentElement)
			.getPropertyValue(cssSBWidthVariableName);
		const newWidth = `${window.innerWidth - document.body.clientWidth}px`;

		if (newWidth !== prevWidth) {
			document.documentElement.style.setProperty(cssSBWidthVariableName, newWidth);
		}

		const prevVwWidth = window
			.getComputedStyle(document.documentElement)
			.getPropertyValue(css1vwInPxWidthVariableName);
		const newVwWidth = `${document.body.clientWidth / 100}px`;

		if (newVwWidth !== prevVwWidth) {
			document.documentElement.style.setProperty(css1vwInPxWidthVariableName, newVwWidth);
		}
	};

	const setScrollbarWidth = () => {
		window.addEventListener('load', getScrollbarWidth);
		window.addEventListener('resize', getScrollbarWidth);
		getScrollbarWidth();
	};
	setScrollbarWidth();


});