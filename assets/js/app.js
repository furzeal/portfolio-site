'use strict';
// Modules

var parallax = (function () {
    var bg = document.querySelector('.l-parallax__bg'),
        user = document.querySelector('.l-developer__container .c-user'),
        userBg = document.querySelector('.l-developer__container .c-developer__bg');

    return {
        move: function (block, windowScroll, strafeCoefficient) {
            var strafe = -(windowScroll / strafeCoefficient) + '%';
            var style = block.style;
            // Var for rendering by video processor (z-axis)
            var transformString = 'translate3d(0, ' + strafe + ', 0)';
            style.transform = transformString;
            style.webkitTransform = transformString;
        },
        init: function (winScroll) {
            if (user == null) {
                return;
            }
            this.move(bg, winScroll, 100);
            this.move(user, -winScroll, 7);
            this.move(userBg, -winScroll, 10);
        }
    }
})();

var skills = (function () {
    var skillItems = null;
    return {
        init: function () {
            skillItems = $('.c-skill__circle_outer');
            console.log(skillItems);
            if (skillItems.length === 0)
                return;
            console.log('skillItems');
            skillItems.each(function (i, skill) {
                skill.value = $(skill).attr('stroke-dasharray');
                $(skill).attr('stroke-dasharray', '0 100');
            });
        },
        setValue: function () {
            if (skillItems.length === 0)
                return;
            skillItems.each(function (i, skill) {
                var value = skill.value;
                var skillOpacity = value.substring(0, value.length - 4) / 100 + 0.1;
                if (skillOpacity >= 1) {
                    skillOpacity = 1
                }
                console.log(skillOpacity);
                skill.setAttribute('stroke-dasharray', skill.value);
                $(skill).css('opacity', skillOpacity);
            });
        }
    };
})();
// for slider
var removeActiveClass = (function (reqClass) {
    reqClass.addClass('active').siblings().removeClass('active');
});

// map

var map;
function initMap() {
    if (!document.getElementById('map'))
        return;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 55.902, lng: 37.7375},
        zoom: 17,
        draggable: true,
        scrollwheel: false,
        //disableDefaultUI: true,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.station.rail",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#4369aa"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#005eff"
                    }
                ]
            }
        ]
    });
}

$(document).ready(function () {
    parallax.init();
    console.log('document.ready');
    skills.init();
    // flipper&parallax
    (function () {
        var welcomeSection = $('.l-welcome');
        console.log(welcomeSection);
        if (welcomeSection.length == 0) {
            return;
        }
        console.log('in welcome');
        // flipper
        welcomeSection.on('click', '[data-flip="toggle"]', function (e) {
            console.log('clicked');
            e.preventDefault();
            var trigger = welcomeSection.find('.l-welcome__auth-btn')
            var flipper = welcomeSection.find('.l-flipper');
            console.log(flipper);
            var duration = 600;
            flipper.toggleClass('l-flipper_back');
            if (flipper.hasClass('l-flipper_back')) {
                trigger.fadeOut(duration);
            } else {
                trigger.fadeIn(duration);
            }
        });
        // parallax
        var layerAll = $('.l-parallax__bg');
        $(window).on('mousemove', function (e) {
            var mouseX = e.pageX;
            var mouseY = e.pageY;
            var w = (window.innerWidth / 2) - mouseX;
            var h = (window.innerHeight / 2) - mouseY;
            layerAll.map(function (i, item) {
                var wPos = w * ((i + 1) / 80);
                var hPos = h * ((i + 1) / 60);
                $(item).css({
                    'transform': 'translate3d(' + wPos + 'px,' + hPos + 'px, 0)'
                });
            });
        });
    })();
    // slider prev_next buttons
    $('.c-slider__button').on('click', function (e) {
        e.preventDefault();
        var
            $this = $(this),
            slider = $(this).closest('.c-slider'),
            // view vars
            slides = slider.find('.c-slider__slides'),
            items = slider.find('.c-slides__item'),
            activeSlide = items.filter('.active'),
            nextSlide = activeSlide.next(),
            prevSlide = activeSlide.prev(),
            firstSlide = items.first(),
            lastSlide = items.last(),
            // description vars
            description = slider.find('.c-slider__description'),
            sliderTitle = description.find('.c-slider-title'),
            sliderSkills = description.find('.c-slider-item__skills'),
            sliderLink = description.find('.c-slider-btn'),
            // pager vars
            pagerList = slider.find('.c-pager__list'),
            pages = slider.find('.c-pager__item'),
            activePage = pages.filter('.active'),
            nextPage = activePage.next(),
            prevPage = activePage.prev(),
            firstPage = pages.first(),
            lastPage = pages.last()
            ;
        if ($this.hasClass('c-slider__button_next')) {
            if (nextSlide.length) {
                removeActiveClass(nextSlide);
                removeActiveClass(nextPage);
            } else {
                removeActiveClass(firstSlide);
                removeActiveClass(firstPage);
            }

        } else {
            if (prevSlide.length) {
                removeActiveClass(prevSlide);
                removeActiveClass(prevPage);
            } else {
                removeActiveClass(lastSlide);
                removeActiveClass(lastPage);
            }
        }
    });

    // slider pager buttons
    $('.c-pager__item').on('click', function (e) {
        e.preventDefault();
        var
            $this = $(this),
            index = $this.index(),
            slider = $(this).closest('.c-slider'),
            // view vars
            slides = slider.find('.c-slider__slides'),
            items = slider.find('.c-slides__item'),
            slideToShow = items.eq(index),
            // description vars
            description = slider.find('.c-slider__description'),
            sliderTitle = description.find('.c-slider-title'),
            sliderSkills = description.find('.c-slider-item__skills'),
            sliderLink = description.find('.c-slider-btn'),
            // pager vars
            pagerList = slider.find('.c-pager__list'),
            pages = slider.find('.c-pager__item'),
            clickedPage = pages.eq(index)
            ;
        console.log(index);
        if (!$this.hasClass('active')) {
            removeActiveClass(slideToShow);
            removeActiveClass(clickedPage);
        }
    });
});

// Events
window.onscroll = function () {
    var winScroll = window.pageYOffset;
    parallax.init(winScroll);
    console.log(winScroll);
    if (winScroll > innerHeight / 2) {
        skills.setValue();
    }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG4vLyBNb2R1bGVzXHJcblxyXG52YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtcGFyYWxsYXhfX2JnJyksXHJcbiAgICAgICAgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLWRldmVsb3Blcl9fY29udGFpbmVyIC5jLXVzZXInKSxcclxuICAgICAgICB1c2VyQmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1kZXZlbG9wZXJfX2NvbnRhaW5lciAuYy1kZXZlbG9wZXJfX2JnJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQ29lZmZpY2llbnQpIHtcclxuICAgICAgICAgICAgdmFyIHN0cmFmZSA9IC0od2luZG93U2Nyb2xsIC8gc3RyYWZlQ29lZmZpY2llbnQpICsgJyUnO1xyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuICAgICAgICAgICAgLy8gVmFyIGZvciByZW5kZXJpbmcgYnkgdmlkZW8gcHJvY2Vzc29yICh6LWF4aXMpXHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwgJyArIHN0cmFmZSArICcsIDApJztcclxuICAgICAgICAgICAgc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAod2luU2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdpblNjcm9sbCwgMTAwKTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXIsIC13aW5TY3JvbGwsIDcpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUodXNlckJnLCAtd2luU2Nyb2xsLCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxudmFyIHNraWxscyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2tpbGxJdGVtcyA9IG51bGw7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2tpbGxJdGVtcyA9ICQoJy5jLXNraWxsX19jaXJjbGVfb3V0ZXInKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2tpbGxJdGVtcyk7XHJcbiAgICAgICAgICAgIGlmIChza2lsbEl0ZW1zLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NraWxsSXRlbXMnKTtcclxuICAgICAgICAgICAgc2tpbGxJdGVtcy5lYWNoKGZ1bmN0aW9uIChpLCBza2lsbCkge1xyXG4gICAgICAgICAgICAgICAgc2tpbGwudmFsdWUgPSAkKHNraWxsKS5hdHRyKCdzdHJva2UtZGFzaGFycmF5Jyk7XHJcbiAgICAgICAgICAgICAgICAkKHNraWxsKS5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgJzAgMTAwJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHNraWxsSXRlbXMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBza2lsbEl0ZW1zLmVhY2goZnVuY3Rpb24gKGksIHNraWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBza2lsbC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHZhciBza2lsbE9wYWNpdHkgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgdmFsdWUubGVuZ3RoIC0gNCkgLyAxMDAgKyAwLjE7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2tpbGxPcGFjaXR5ID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBza2lsbE9wYWNpdHkgPSAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhza2lsbE9wYWNpdHkpO1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuc2V0QXR0cmlidXRlKCdzdHJva2UtZGFzaGFycmF5Jywgc2tpbGwudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgJChza2lsbCkuY3NzKCdvcGFjaXR5Jywgc2tpbGxPcGFjaXR5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSkoKTtcclxuLy8gZm9yIHNsaWRlclxyXG52YXIgcmVtb3ZlQWN0aXZlQ2xhc3MgPSAoZnVuY3Rpb24gKHJlcUNsYXNzKSB7XHJcbiAgICByZXFDbGFzcy5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbn0pO1xyXG5cclxuLy8gbWFwXHJcblxyXG52YXIgbWFwO1xyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG4gICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJykpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcclxuICAgICAgICBjZW50ZXI6IHtsYXQ6IDU1LjkwMiwgbG5nOiAzNy43Mzc1fSxcclxuICAgICAgICB6b29tOiAxNyxcclxuICAgICAgICBkcmFnZ2FibGU6IHRydWUsXHJcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgIC8vZGlzYWJsZURlZmF1bHRVSTogdHJ1ZSxcclxuICAgICAgICBzdHlsZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNDQ0NDQ0XCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2YyZjJmMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuYXR0cmFjdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IC0xMDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogNDVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXQuc3RhdGlvbi5yYWlsXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzQzNjlhYVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiMwMDVlZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG59XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICBwYXJhbGxheC5pbml0KCk7XHJcbiAgICBjb25zb2xlLmxvZygnZG9jdW1lbnQucmVhZHknKTtcclxuICAgIHNraWxscy5pbml0KCk7XHJcbiAgICAvLyBmbGlwcGVyJnBhcmFsbGF4XHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB3ZWxjb21lU2VjdGlvbiA9ICQoJy5sLXdlbGNvbWUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh3ZWxjb21lU2VjdGlvbik7XHJcbiAgICAgICAgaWYgKHdlbGNvbWVTZWN0aW9uLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2luIHdlbGNvbWUnKTtcclxuICAgICAgICAvLyBmbGlwcGVyXHJcbiAgICAgICAgd2VsY29tZVNlY3Rpb24ub24oJ2NsaWNrJywgJ1tkYXRhLWZsaXA9XCJ0b2dnbGVcIl0nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2tlZCcpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyID0gd2VsY29tZVNlY3Rpb24uZmluZCgnLmwtd2VsY29tZV9fYXV0aC1idG4nKVxyXG4gICAgICAgICAgICB2YXIgZmxpcHBlciA9IHdlbGNvbWVTZWN0aW9uLmZpbmQoJy5sLWZsaXBwZXInKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZmxpcHBlcik7XHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IDYwMDtcclxuICAgICAgICAgICAgZmxpcHBlci50b2dnbGVDbGFzcygnbC1mbGlwcGVyX2JhY2snKTtcclxuICAgICAgICAgICAgaWYgKGZsaXBwZXIuaGFzQ2xhc3MoJ2wtZmxpcHBlcl9iYWNrJykpIHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXIuZmFkZU91dChkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyLmZhZGVJbihkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBwYXJhbGxheFxyXG4gICAgICAgIHZhciBsYXllckFsbCA9ICQoJy5sLXBhcmFsbGF4X19iZycpO1xyXG4gICAgICAgICQod2luZG93KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIG1vdXNlWCA9IGUucGFnZVg7XHJcbiAgICAgICAgICAgIHZhciBtb3VzZVkgPSBlLnBhZ2VZO1xyXG4gICAgICAgICAgICB2YXIgdyA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gbW91c2VYO1xyXG4gICAgICAgICAgICB2YXIgaCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIG1vdXNlWTtcclxuICAgICAgICAgICAgbGF5ZXJBbGwubWFwKGZ1bmN0aW9uIChpLCBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd1BvcyA9IHcgKiAoKGkgKyAxKSAvIDgwKTtcclxuICAgICAgICAgICAgICAgIHZhciBoUG9zID0gaCAqICgoaSArIDEpIC8gNjApO1xyXG4gICAgICAgICAgICAgICAgJChpdGVtKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoJyArIHdQb3MgKyAncHgsJyArIGhQb3MgKyAncHgsIDApJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSkoKTtcclxuICAgIC8vIHNsaWRlciBwcmV2X25leHQgYnV0dG9uc1xyXG4gICAgJCgnLmMtc2xpZGVyX19idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBzbGlkZXIgPSAkKHRoaXMpLmNsb3Nlc3QoJy5jLXNsaWRlcicpLFxyXG4gICAgICAgICAgICAvLyB2aWV3IHZhcnNcclxuICAgICAgICAgICAgc2xpZGVzID0gc2xpZGVyLmZpbmQoJy5jLXNsaWRlcl9fc2xpZGVzJyksXHJcbiAgICAgICAgICAgIGl0ZW1zID0gc2xpZGVyLmZpbmQoJy5jLXNsaWRlc19faXRlbScpLFxyXG4gICAgICAgICAgICBhY3RpdmVTbGlkZSA9IGl0ZW1zLmZpbHRlcignLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICBuZXh0U2xpZGUgPSBhY3RpdmVTbGlkZS5uZXh0KCksXHJcbiAgICAgICAgICAgIHByZXZTbGlkZSA9IGFjdGl2ZVNsaWRlLnByZXYoKSxcclxuICAgICAgICAgICAgZmlyc3RTbGlkZSA9IGl0ZW1zLmZpcnN0KCksXHJcbiAgICAgICAgICAgIGxhc3RTbGlkZSA9IGl0ZW1zLmxhc3QoKSxcclxuICAgICAgICAgICAgLy8gZGVzY3JpcHRpb24gdmFyc1xyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA9IHNsaWRlci5maW5kKCcuYy1zbGlkZXJfX2Rlc2NyaXB0aW9uJyksXHJcbiAgICAgICAgICAgIHNsaWRlclRpdGxlID0gZGVzY3JpcHRpb24uZmluZCgnLmMtc2xpZGVyLXRpdGxlJyksXHJcbiAgICAgICAgICAgIHNsaWRlclNraWxscyA9IGRlc2NyaXB0aW9uLmZpbmQoJy5jLXNsaWRlci1pdGVtX19za2lsbHMnKSxcclxuICAgICAgICAgICAgc2xpZGVyTGluayA9IGRlc2NyaXB0aW9uLmZpbmQoJy5jLXNsaWRlci1idG4nKSxcclxuICAgICAgICAgICAgLy8gcGFnZXIgdmFyc1xyXG4gICAgICAgICAgICBwYWdlckxpc3QgPSBzbGlkZXIuZmluZCgnLmMtcGFnZXJfX2xpc3QnKSxcclxuICAgICAgICAgICAgcGFnZXMgPSBzbGlkZXIuZmluZCgnLmMtcGFnZXJfX2l0ZW0nKSxcclxuICAgICAgICAgICAgYWN0aXZlUGFnZSA9IHBhZ2VzLmZpbHRlcignLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICBuZXh0UGFnZSA9IGFjdGl2ZVBhZ2UubmV4dCgpLFxyXG4gICAgICAgICAgICBwcmV2UGFnZSA9IGFjdGl2ZVBhZ2UucHJldigpLFxyXG4gICAgICAgICAgICBmaXJzdFBhZ2UgPSBwYWdlcy5maXJzdCgpLFxyXG4gICAgICAgICAgICBsYXN0UGFnZSA9IHBhZ2VzLmxhc3QoKVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgaWYgKCR0aGlzLmhhc0NsYXNzKCdjLXNsaWRlcl9fYnV0dG9uX25leHQnKSkge1xyXG4gICAgICAgICAgICBpZiAobmV4dFNsaWRlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MobmV4dFNsaWRlKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKG5leHRQYWdlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKGZpcnN0U2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MoZmlyc3RQYWdlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAocHJldlNsaWRlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MocHJldlNsaWRlKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKHByZXZQYWdlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKGxhc3RTbGlkZSk7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmVDbGFzcyhsYXN0UGFnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBzbGlkZXIgcGFnZXIgYnV0dG9uc1xyXG4gICAgJCgnLmMtcGFnZXJfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBpbmRleCA9ICR0aGlzLmluZGV4KCksXHJcbiAgICAgICAgICAgIHNsaWRlciA9ICQodGhpcykuY2xvc2VzdCgnLmMtc2xpZGVyJyksXHJcbiAgICAgICAgICAgIC8vIHZpZXcgdmFyc1xyXG4gICAgICAgICAgICBzbGlkZXMgPSBzbGlkZXIuZmluZCgnLmMtc2xpZGVyX19zbGlkZXMnKSxcclxuICAgICAgICAgICAgaXRlbXMgPSBzbGlkZXIuZmluZCgnLmMtc2xpZGVzX19pdGVtJyksXHJcbiAgICAgICAgICAgIHNsaWRlVG9TaG93ID0gaXRlbXMuZXEoaW5kZXgpLFxyXG4gICAgICAgICAgICAvLyBkZXNjcmlwdGlvbiB2YXJzXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gc2xpZGVyLmZpbmQoJy5jLXNsaWRlcl9fZGVzY3JpcHRpb24nKSxcclxuICAgICAgICAgICAgc2xpZGVyVGl0bGUgPSBkZXNjcmlwdGlvbi5maW5kKCcuYy1zbGlkZXItdGl0bGUnKSxcclxuICAgICAgICAgICAgc2xpZGVyU2tpbGxzID0gZGVzY3JpcHRpb24uZmluZCgnLmMtc2xpZGVyLWl0ZW1fX3NraWxscycpLFxyXG4gICAgICAgICAgICBzbGlkZXJMaW5rID0gZGVzY3JpcHRpb24uZmluZCgnLmMtc2xpZGVyLWJ0bicpLFxyXG4gICAgICAgICAgICAvLyBwYWdlciB2YXJzXHJcbiAgICAgICAgICAgIHBhZ2VyTGlzdCA9IHNsaWRlci5maW5kKCcuYy1wYWdlcl9fbGlzdCcpLFxyXG4gICAgICAgICAgICBwYWdlcyA9IHNsaWRlci5maW5kKCcuYy1wYWdlcl9faXRlbScpLFxyXG4gICAgICAgICAgICBjbGlja2VkUGFnZSA9IHBhZ2VzLmVxKGluZGV4KVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xyXG4gICAgICAgIGlmICghJHRoaXMuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKHNsaWRlVG9TaG93KTtcclxuICAgICAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MoY2xpY2tlZFBhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbi8vIEV2ZW50c1xyXG53aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgd2luU2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgcGFyYWxsYXguaW5pdCh3aW5TY3JvbGwpO1xyXG4gICAgY29uc29sZS5sb2cod2luU2Nyb2xsKTtcclxuICAgIGlmICh3aW5TY3JvbGwgPiBpbm5lckhlaWdodCAvIDIpIHtcclxuICAgICAgICBza2lsbHMuc2V0VmFsdWUoKTtcclxuICAgIH1cclxufTtcclxuIl19
