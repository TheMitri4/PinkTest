var mainNav = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var sliderDotsList = document.querySelectorAll(".slider__toggle");
var sliderItemList = document.querySelectorAll(".slider__item");
var sliderPrev = document.querySelector(".slider__prev");
var sliderNext = document.querySelector(".slider__next");
var sliderItemListLastChild = sliderItemList[sliderItemList.length-1];
var sliderDotsListLastChild = sliderDotsList[sliderDotsList.length-1];

var el = document.querySelector(".slider");

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

function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

swipedetect(el, function(swipedir){
    if (swipedir =='left') {
        nextSlide();
	}
	
	if (swipedir =='right') {
        prevSlide();
	}
})