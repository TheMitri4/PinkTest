var mainNav = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var sliderDotsList = document.querySelectorAll(".slider__toggle");
var sliderItemList = document.querySelectorAll(".slider__item");
var sliderPrev = document.querySelector(".slider__prev");
var sliderNext = document.querySelector(".slider__next");
var sliderItemListLastChild = sliderItemList[sliderItemList.length-1];
var sliderDotsListLastChild = sliderDotsList[sliderDotsList.length-1];

// touch

var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

var gesuredZone = document.querySelector(".slider");

// touchend

navToggle.addEventListener('click', function () {
	"use strict";
	if (mainNav.classList.contains('main-nav--closed')) {
		mainNav.classList.remove('main-nav--closed');
		mainNav.classList.add('main-nav--opened');
	} else {
		mainNav.classList.remove('main-nav--opened');
		mainNav.classList.add('main-nav--closed');
	}
});

for (var i = 0; i < sliderDotsList.length; i++) {
	changeSlide(i);
}

function changeSlide(i) {
	sliderDotsList[i].addEventListener("click", function (evt) {
		evt.preventDefault();
		if (!this.classList.contains("active")) {
			document.querySelector(".slider__toggle.active").classList.remove("active");
			this.classList.add("active");
			document.querySelector(".slider__item.active").classList.remove("active");
			sliderItemList[i].classList.add("active");
		}
	});
}

i = 0;
function prevSlide() {
	document.querySelector(".slider__item.active").classList.remove("active");
	document.querySelector(".slider__toggle.active").classList.remove("active");
	if(i <= 0){
		sliderItemListLastChild.classList.add("active");
		sliderDotsListLastChild.classList.add("active");
		i = sliderItemList.length - 1;
	} 
	else{
		sliderItemList[--i].classList.add("active");
		sliderDotsList[i].classList.add("active");
	}
};

function nextSlide() {
	document.querySelector(".slider__item.active").classList.remove("active");
	document.querySelector(".slider__toggle.active").classList.remove("active");
	if(i >= sliderItemList.length-1){
		i = 0;
		sliderItemList[0].classList.add("active");
		sliderDotsList[0].classList.add("active");
	} 
	else{
		sliderItemList[++i].classList.add("active");
		sliderDotsList[i].classList.add("active");
	}
}

sliderPrev.addEventListener('click', function (evt) {
	evt.preventDefault();
	prevSlide();
});

sliderNext.addEventListener('click', function (evt) {
	evt.preventDefault();
	nextSlide();
});

// touch

gesuredZone.addEventListener('touchstart', function(event) {
    touchstartX = event.screenX;
    touchstartY = event.screenY;
}, false);

gesuredZone.addEventListener('touchend', function(event) {
    touchendX = event.screenX;
    touchendY = event.screenY;
    handleGesure();
}, false); 

function handleGesure() {
    var swiped = 'swiped: ';
    if (touchendX < touchstartX) {
    	nextSlide();
    }
    if (touchendX > touchstartX) {
        prevSlide();
    }
    if (touchendY < touchstartY) {
        alert(swiped + 'down!');
    }
    if (touchendY > touchstartY) {
        alert(swiped + 'left!');
    }
    if (touchendY == touchstartY) {
//        nextSlide();
    }
}