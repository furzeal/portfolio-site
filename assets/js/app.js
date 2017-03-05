'use strict';
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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

// map

var map;
function initMap() {
    if (!document.getElementById('map'))
        return;
    var latLngCenter = {lat: 55.902, lng: 37.7375};
    // if ($(window).width()<600){
    //     latLngCenter = {lat: 55.902, lng: 37.7375};
    // }
    map = new google.maps.Map(document.getElementById('map'), {
        center: latLngCenter,
        zoom: 17,
        draggable: !("ontouchend" in document),
        scrollwheel: false,
        disableDefaultUI: true,
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
// marker
    var latLngHome = {lat: 55.90085, lng: 37.73885};
    var image = 'assets/img/marker.png';
    var marker = new google.maps.Marker({
        position: latLngHome,
        map: map,
        icon: image
    });
}

// slider initialization
var works = {
    work1: {
        link: './assets/img/work-1.png',
        title: 'сайт школы онлайн образования',
        skills: 'HTML, CSS, JavaScript',
        site: 'https://loftschool.com/'
    },
    work2: {
        link: './assets/img/work-2.png',
        title: 'сайт агенства интернет решений',
        skills: 'node.js, mongodb, angular',
        site: 'https://itloft.ru/'
    },
    work3: {
        link: './assets/img/work-3.png',
        title: 'сайт портала обучающих уроков',
        skills: 'php, laravel',
        site: 'https://loftblog.ru/'
    },
    work4: {
        link: './assets/img/work-4.png',
        title: 'сайт "атма йога"',
        skills: 'UX/UI Design, SEO',
        site: 'http://atmayoga.ru/'
    }
}

// for slider
var removeActiveClass = (function (reqClass) {
    reqClass.addClass('active').siblings().removeClass('active');
});

var changeDescription = (function (description, index) {
    var sliderTitle = description.find('.c-slider-title'),
        sliderSkills = description.find('.c-slider-item__skills'),
        sliderLink = description.find('.c-slider-btn');
    var worksArray = $.map(works, function (el) {
        return el
    });
    sliderTitle.css('opacity', '0');
    setTimeout(function () {
        sliderTitle.text(worksArray[index].title);
        sliderTitle.css('opacity', '1');
    }, 400);
    sliderSkills.css('opacity', '0');
    setTimeout(function () {
        sliderSkills.text(worksArray[index].skills);
        sliderSkills.css('opacity', '1');
    }, 400);
    sliderLink.attr('href', (worksArray[index].site));
    console.log(worksArray);

});

var slider = (function () {
    return {
        init: function () {
            var slider = $('.c-slider');
            console.log(slider);
            if (slider.length == 0) {
                return null;
            }
            var slides = slider.find('.c-slider__slides');
            var title = slider.find('.c-slider-title');
            var skills = slider.find('.c-slider-item__skills');
            var siteLink = slider.find('.c-slider-btn');
            var pagerList = slider.find('.c-pager__list');
            $.each(works, function (index, work) {
                slides.append(
                    $('<li>').addClass('c-slides__item').append(
                        $('<img>').addClass('c-slider-img').attr('src', work.link)
                    )
                );
                pagerList.append(
                    $('<li>').addClass('c-pager__item').append(
                        $($('<svg><circle cx="5" cy="5" r="5"/></svg>'))
                            .addClass('c-pager__symbol').attr('viewBox', '0 0 10 10')
                    )
                );
            });
            // set active values
            slides.find('.c-slides__item').first().addClass('active');
            pagerList.find('.c-pager__item').first().addClass('active');
            title.text(works.work1.title);
            skills.text(works.work1.skills);
            siteLink.attr('href', works.work1.site);
        }
    };
})();

$(document).ready(function () {
    console.log('document.ready');
    slider.init();
    parallax.init();
    skills.init();
    // preloader
    (function () {
        var imgs = [];
        $('*').each(function () {
            var $this = $(this);
            var background = $this.css('background-image');
            var isImg = $this.is('img');
            var path = '';
            if (background !== 'none') {
                path = background.replace('url("', '').replace('")', '');
                if (path.indexOf('-gradient(') !== -1)
                    return;
                imgs.push(path);
            }
            if (isImg) {
                path = $this.attr('src');
                if (!path)
                    return;
                imgs.push(path);
            }
        });
        var percentsTotal = 1;
        for (var i = 0; i < imgs.length; i++) {
            var image = $('<img>', {
                attr: {
                    src: imgs[i]
                }
            });
            image.one({
                load: function () {
                    setPercents(imgs.length, percentsTotal);
                    percentsTotal++;
                },
                error: function () {
                    percentsTotal++;
                }
            });
        }
        function setPercents(total, current) {
            var percent = Math.ceil(current / total * 100);
            if (percent >= 100) {
                $('.preloader').fadeOut();
            }
            $('.preloader__value').text(percent);
        }
    })();


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
        var clouds = $('.c-stars-parallax__layer');
        $(window).on('mousemove', function (e) {
            var mouseX = e.pageX;
            var mouseY = e.pageY;
            var w = (window.innerWidth / 2) - mouseX;
            var h = (window.innerHeight / 2) - mouseY;
            layerAll.map(function (i, item) {
                var wPos = w * ((i + 1) / 40);
                var hPos = h * ((i + 1) / 30);
                $(item).css({
                    'transform': 'translate3d(' + wPos + 'px,' + hPos + 'px, 0)'
                });
            });
            clouds.map(function (i, item) {
                var wPos = w * ((i * 9 + 1) / 90);
                var hPos = h * ((i * 4 + 1) / 120);
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
                changeDescription(description, nextSlide.index())
            } else {
                removeActiveClass(firstSlide);
                removeActiveClass(firstPage);
                changeDescription(description, firstSlide.index())
            }

        } else {
            if (prevSlide.length) {
                removeActiveClass(prevSlide);
                removeActiveClass(prevPage);
                changeDescription(description, prevSlide.index())
            } else {
                removeActiveClass(lastSlide);
                removeActiveClass(lastPage);
                changeDescription(description, lastSlide.index())
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

    // nav
    (function () {
        $(document).on('click', '.c-menu-icon', function (e) {
            var trigger = $(this);
            var wrapper = trigger.closest('.c-menu-wrapper_main');
            var menu = wrapper.find('.c-menu');
            console.log(wrapper);
            if (wrapper.hasClass('open')) {
                menu.fadeOut(500, function () {
                    wrapper.removeClass('open');
                });
            } else {
                menu.show(0, function () {
                    wrapper.addClass('open');
                });
            }
        });
    })();

    // blog

    (function () {
        var container = $('.c-blog');
        var sidebar = container.find('.c-blog-sidebar');
        if (sidebar.length === 0 || isMobile)
            return;
        //var containerBottom = container.offset().top + container.height() - 40;
        var edgeTop = sidebar.offset().top;
        //var sidebarHeight = sidebar.height();
        $(window).on('scroll', function () {
            if (edgeTop < $(window).scrollTop()) {
                sidebar.addClass('c-blog-sidebar_fixed');
            } else {
                sidebar.removeClass('c-blog-sidebar_fixed');
            }
        });
    })();

    (function () {
        var articleAll = $('.c-article');
        var linksAll = $('.c-blog-sidebar__link');
        if (articleAll.length === 0)
            return;
        showSection(window.location.hash, false);
        function showSection(section, isAnimate) {
            var target = section.replace('#', '');
            var reqSection = articleAll.filter('[data-id="' + target + '"]');
            var duration = 750;
            if (reqSection.length === 0)
                return;
            var reqSectionPos = reqSection.offset().top;
            if (isAnimate) {
                $('body, html').animate({
                    scrollTop: reqSectionPos
                }, duration);
            } else {
                $('body, html').scrollTop(reqSectionPos);
            }
        }

        function checkSection() {
            articleAll.each(function (i, item) {
                var article = $(item);
                var topEdge = article.offset().top - 300;
                var bottomEdge = topEdge + article.height();
                var topScroll = $(window).scrollTop();
                if (topEdge < topScroll && bottomEdge > topScroll) {
                    var currentId = article.data('id');
                    var reqLink = linksAll.filter('[href="#' + currentId + '"]');
                    reqLink.closest('.c-blog-sidebar__item').addClass('active').siblings().removeClass('active');
                    window.location.hash = currentId;
                }
            });
        }

        $(window).on('scroll', function () {
            checkSection();
        });
        $(document).on('click', '.c-blog-sidebar__link', function (e) {
            e.preventDefault();
            var sidebar = $(this).closest('.c-blog-sidebar');
            if (sidebar.hasClass('active')) sidebar.removeClass('active');
            showSection($(this).attr('href'), true);
        });

        $(document).on('click', '.c-blog-sidebar__button', function (e) {
            e.preventDefault();
            var trigger = $(this);
            var sidebar = trigger.closest('.c-blog-sidebar');
            sidebar.toggleClass('active');
        });
    })();

    // next/prev sections scroll
    (function () {
        $(document).on('click', '[data-move]', function (e) {
            e.preventDefault();
            var btn = $(this);
            var target = btn.attr('data-move');
            var container = null;

            function scrollToPosition(position, duration) {
                console.log(position);
                var position = position || 0;
                var duration = duration || 1000;
                $("body, html").animate({
                    scrollTop: position
                }, duration);
            }

            if (target == 'top') {
                scrollToPosition();
            }
            if (target == 'next') {
                container = btn.closest('.l-section');
                console.log(container.height());
                scrollToPosition(container.height());
            }
        });
    })();

});

// Events
$(window).on('load', function () {
    $('body').addClass('loaded');
});

window.onscroll = function () {
    var winScroll = window.pageYOffset;
    parallax.init(winScroll);
    if (winScroll > innerHeight / 1.8) {
        skills.setValue();
    }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcbnZhciBpc01vYmlsZSA9IC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuXHJcbi8vIE1vZHVsZXNcclxudmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXBhcmFsbGF4X19iZycpLFxyXG4gICAgICAgIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1kZXZlbG9wZXJfX2NvbnRhaW5lciAuYy11c2VyJyksXHJcbiAgICAgICAgdXNlckJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtZGV2ZWxvcGVyX19jb250YWluZXIgLmMtZGV2ZWxvcGVyX19iZycpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbW92ZTogZnVuY3Rpb24gKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUNvZWZmaWNpZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBzdHJhZmUgPSAtKHdpbmRvd1Njcm9sbCAvIHN0cmFmZUNvZWZmaWNpZW50KSArICclJztcclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gYmxvY2suc3R5bGU7XHJcbiAgICAgICAgICAgIC8vIFZhciBmb3IgcmVuZGVyaW5nIGJ5IHZpZGVvIHByb2Nlc3NvciAoei1heGlzKVxyXG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsICcgKyBzdHJhZmUgKyAnLCAwKSc7XHJcbiAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdpblNjcm9sbCkge1xyXG4gICAgICAgICAgICBpZiAodXNlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3aW5TY3JvbGwsIDEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyLCAtd2luU2Nyb2xsLCA3KTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXJCZywgLXdpblNjcm9sbCwgMTApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuXHJcbnZhciBza2lsbHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNraWxsSXRlbXMgPSBudWxsO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNraWxsSXRlbXMgPSAkKCcuYy1za2lsbF9fY2lyY2xlX291dGVyJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNraWxsSXRlbXMpO1xyXG4gICAgICAgICAgICBpZiAoc2tpbGxJdGVtcy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdza2lsbEl0ZW1zJyk7XHJcbiAgICAgICAgICAgIHNraWxsSXRlbXMuZWFjaChmdW5jdGlvbiAoaSwgc2tpbGwpIHtcclxuICAgICAgICAgICAgICAgIHNraWxsLnZhbHVlID0gJChza2lsbCkuYXR0cignc3Ryb2tlLWRhc2hhcnJheScpO1xyXG4gICAgICAgICAgICAgICAgJChza2lsbCkuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsICcwIDEwMCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChza2lsbEl0ZW1zLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgc2tpbGxJdGVtcy5lYWNoKGZ1bmN0aW9uIChpLCBza2lsbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gc2tpbGwudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2tpbGxPcGFjaXR5ID0gdmFsdWUuc3Vic3RyaW5nKDAsIHZhbHVlLmxlbmd0aCAtIDQpIC8gMTAwICsgMC4xO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNraWxsT3BhY2l0eSA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGxPcGFjaXR5ID0gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2tpbGxPcGFjaXR5KTtcclxuICAgICAgICAgICAgICAgIHNraWxsLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLWRhc2hhcnJheScsIHNraWxsLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICQoc2tpbGwpLmNzcygnb3BhY2l0eScsIHNraWxsT3BhY2l0eSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG4vLyBtYXBcclxuXHJcbnZhciBtYXA7XHJcbmZ1bmN0aW9uIGluaXRNYXAoKSB7XHJcbiAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICB2YXIgbGF0TG5nQ2VudGVyID0ge2xhdDogNTUuOTAyLCBsbmc6IDM3LjczNzV9O1xyXG4gICAgLy8gaWYgKCQod2luZG93KS53aWR0aCgpPDYwMCl7XHJcbiAgICAvLyAgICAgbGF0TG5nQ2VudGVyID0ge2xhdDogNTUuOTAyLCBsbmc6IDM3LjczNzV9O1xyXG4gICAgLy8gfVxyXG4gICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcclxuICAgICAgICBjZW50ZXI6IGxhdExuZ0NlbnRlcixcclxuICAgICAgICB6b29tOiAxNyxcclxuICAgICAgICBkcmFnZ2FibGU6ICEoXCJvbnRvdWNoZW5kXCIgaW4gZG9jdW1lbnQpLFxyXG4gICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgICAgIHN0eWxlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmVcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM0NDQ0NDRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZjJmMmYyXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5hdHRyYWN0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogLTEwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiA0NVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdC5zdGF0aW9uLnJhaWxcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNDM2OWFhXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaHVlXCI6IFwiIzAwNWVmZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbi8vIG1hcmtlclxyXG4gICAgdmFyIGxhdExuZ0hvbWUgPSB7bGF0OiA1NS45MDA4NSwgbG5nOiAzNy43Mzg4NX07XHJcbiAgICB2YXIgaW1hZ2UgPSAnYXNzZXRzL2ltZy9tYXJrZXIucG5nJztcclxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBwb3NpdGlvbjogbGF0TG5nSG9tZSxcclxuICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICBpY29uOiBpbWFnZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIHNsaWRlciBpbml0aWFsaXphdGlvblxyXG52YXIgd29ya3MgPSB7XHJcbiAgICB3b3JrMToge1xyXG4gICAgICAgIGxpbms6ICcuL2Fzc2V0cy9pbWcvd29yay0xLnBuZycsXHJcbiAgICAgICAgdGl0bGU6ICfRgdCw0LnRgiDRiNC60L7Qu9GLINC+0L3Qu9Cw0LnQvSDQvtCx0YDQsNC30L7QstCw0L3QuNGPJyxcclxuICAgICAgICBza2lsbHM6ICdIVE1MLCBDU1MsIEphdmFTY3JpcHQnLFxyXG4gICAgICAgIHNpdGU6ICdodHRwczovL2xvZnRzY2hvb2wuY29tLydcclxuICAgIH0sXHJcbiAgICB3b3JrMjoge1xyXG4gICAgICAgIGxpbms6ICcuL2Fzc2V0cy9pbWcvd29yay0yLnBuZycsXHJcbiAgICAgICAgdGl0bGU6ICfRgdCw0LnRgiDQsNCz0LXQvdGB0YLQstCwINC40L3RgtC10YDQvdC10YIg0YDQtdGI0LXQvdC40LknLFxyXG4gICAgICAgIHNraWxsczogJ25vZGUuanMsIG1vbmdvZGIsIGFuZ3VsYXInLFxyXG4gICAgICAgIHNpdGU6ICdodHRwczovL2l0bG9mdC5ydS8nXHJcbiAgICB9LFxyXG4gICAgd29yazM6IHtcclxuICAgICAgICBsaW5rOiAnLi9hc3NldHMvaW1nL3dvcmstMy5wbmcnLFxyXG4gICAgICAgIHRpdGxlOiAn0YHQsNC50YIg0L/QvtGA0YLQsNC70LAg0L7QsdGD0YfQsNGO0YnQuNGFINGD0YDQvtC60L7QsicsXHJcbiAgICAgICAgc2tpbGxzOiAncGhwLCBsYXJhdmVsJyxcclxuICAgICAgICBzaXRlOiAnaHR0cHM6Ly9sb2Z0YmxvZy5ydS8nXHJcbiAgICB9LFxyXG4gICAgd29yazQ6IHtcclxuICAgICAgICBsaW5rOiAnLi9hc3NldHMvaW1nL3dvcmstNC5wbmcnLFxyXG4gICAgICAgIHRpdGxlOiAn0YHQsNC50YIgXCLQsNGC0LzQsCDQudC+0LPQsFwiJyxcclxuICAgICAgICBza2lsbHM6ICdVWC9VSSBEZXNpZ24sIFNFTycsXHJcbiAgICAgICAgc2l0ZTogJ2h0dHA6Ly9hdG1heW9nYS5ydS8nXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGZvciBzbGlkZXJcclxudmFyIHJlbW92ZUFjdGl2ZUNsYXNzID0gKGZ1bmN0aW9uIChyZXFDbGFzcykge1xyXG4gICAgcmVxQ2xhc3MuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG59KTtcclxuXHJcbnZhciBjaGFuZ2VEZXNjcmlwdGlvbiA9IChmdW5jdGlvbiAoZGVzY3JpcHRpb24sIGluZGV4KSB7XHJcbiAgICB2YXIgc2xpZGVyVGl0bGUgPSBkZXNjcmlwdGlvbi5maW5kKCcuYy1zbGlkZXItdGl0bGUnKSxcclxuICAgICAgICBzbGlkZXJTa2lsbHMgPSBkZXNjcmlwdGlvbi5maW5kKCcuYy1zbGlkZXItaXRlbV9fc2tpbGxzJyksXHJcbiAgICAgICAgc2xpZGVyTGluayA9IGRlc2NyaXB0aW9uLmZpbmQoJy5jLXNsaWRlci1idG4nKTtcclxuICAgIHZhciB3b3Jrc0FycmF5ID0gJC5tYXAod29ya3MsIGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIHJldHVybiBlbFxyXG4gICAgfSk7XHJcbiAgICBzbGlkZXJUaXRsZS5jc3MoJ29wYWNpdHknLCAnMCcpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2xpZGVyVGl0bGUudGV4dCh3b3Jrc0FycmF5W2luZGV4XS50aXRsZSk7XHJcbiAgICAgICAgc2xpZGVyVGl0bGUuY3NzKCdvcGFjaXR5JywgJzEnKTtcclxuICAgIH0sIDQwMCk7XHJcbiAgICBzbGlkZXJTa2lsbHMuY3NzKCdvcGFjaXR5JywgJzAnKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNsaWRlclNraWxscy50ZXh0KHdvcmtzQXJyYXlbaW5kZXhdLnNraWxscyk7XHJcbiAgICAgICAgc2xpZGVyU2tpbGxzLmNzcygnb3BhY2l0eScsICcxJyk7XHJcbiAgICB9LCA0MDApO1xyXG4gICAgc2xpZGVyTGluay5hdHRyKCdocmVmJywgKHdvcmtzQXJyYXlbaW5kZXhdLnNpdGUpKTtcclxuICAgIGNvbnNvbGUubG9nKHdvcmtzQXJyYXkpO1xyXG5cclxufSk7XHJcblxyXG52YXIgc2xpZGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVyID0gJCgnLmMtc2xpZGVyJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNsaWRlcik7XHJcbiAgICAgICAgICAgIGlmIChzbGlkZXIubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXMgPSBzbGlkZXIuZmluZCgnLmMtc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgdmFyIHRpdGxlID0gc2xpZGVyLmZpbmQoJy5jLXNsaWRlci10aXRsZScpO1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxzID0gc2xpZGVyLmZpbmQoJy5jLXNsaWRlci1pdGVtX19za2lsbHMnKTtcclxuICAgICAgICAgICAgdmFyIHNpdGVMaW5rID0gc2xpZGVyLmZpbmQoJy5jLXNsaWRlci1idG4nKTtcclxuICAgICAgICAgICAgdmFyIHBhZ2VyTGlzdCA9IHNsaWRlci5maW5kKCcuYy1wYWdlcl9fbGlzdCcpO1xyXG4gICAgICAgICAgICAkLmVhY2god29ya3MsIGZ1bmN0aW9uIChpbmRleCwgd29yaykge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAkKCc8bGk+JykuYWRkQ2xhc3MoJ2Mtc2xpZGVzX19pdGVtJykuYXBwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCc8aW1nPicpLmFkZENsYXNzKCdjLXNsaWRlci1pbWcnKS5hdHRyKCdzcmMnLCB3b3JrLmxpbmspXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHBhZ2VyTGlzdC5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnPGxpPicpLmFkZENsYXNzKCdjLXBhZ2VyX19pdGVtJykuYXBwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCQoJzxzdmc+PGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNVwiLz48L3N2Zz4nKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYy1wYWdlcl9fc3ltYm9sJykuYXR0cigndmlld0JveCcsICcwIDAgMTAgMTAnKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBzZXQgYWN0aXZlIHZhbHVlc1xyXG4gICAgICAgICAgICBzbGlkZXMuZmluZCgnLmMtc2xpZGVzX19pdGVtJykuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHBhZ2VyTGlzdC5maW5kKCcuYy1wYWdlcl9faXRlbScpLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB0aXRsZS50ZXh0KHdvcmtzLndvcmsxLnRpdGxlKTtcclxuICAgICAgICAgICAgc2tpbGxzLnRleHQod29ya3Mud29yazEuc2tpbGxzKTtcclxuICAgICAgICAgICAgc2l0ZUxpbmsuYXR0cignaHJlZicsIHdvcmtzLndvcmsxLnNpdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnZG9jdW1lbnQucmVhZHknKTtcclxuICAgIHNsaWRlci5pbml0KCk7XHJcbiAgICBwYXJhbGxheC5pbml0KCk7XHJcbiAgICBza2lsbHMuaW5pdCgpO1xyXG4gICAgLy8gcHJlbG9hZGVyXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpbWdzID0gW107XHJcbiAgICAgICAgJCgnKicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgYmFja2dyb3VuZCA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpO1xyXG4gICAgICAgICAgICB2YXIgaXNJbWcgPSAkdGhpcy5pcygnaW1nJyk7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChiYWNrZ3JvdW5kICE9PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGF0aC5pbmRleE9mKCctZ3JhZGllbnQoJykgIT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGltZ3MucHVzaChwYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNJbWcpIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSAkdGhpcy5hdHRyKCdzcmMnKTtcclxuICAgICAgICAgICAgICAgIGlmICghcGF0aClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpbWdzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgcGVyY2VudHNUb3RhbCA9IDE7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogaW1nc1tpXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaW1hZ2Uub25lKHtcclxuICAgICAgICAgICAgICAgIGxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gc2V0UGVyY2VudHModG90YWwsIGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcclxuICAgICAgICAgICAgaWYgKHBlcmNlbnQgPj0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJlbG9hZGVyJykuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJy5wcmVsb2FkZXJfX3ZhbHVlJykudGV4dChwZXJjZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuXHJcbiAgICAvLyBmbGlwcGVyJnBhcmFsbGF4XHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB3ZWxjb21lU2VjdGlvbiA9ICQoJy5sLXdlbGNvbWUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh3ZWxjb21lU2VjdGlvbik7XHJcbiAgICAgICAgaWYgKHdlbGNvbWVTZWN0aW9uLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2luIHdlbGNvbWUnKTtcclxuICAgICAgICAvLyBmbGlwcGVyXHJcbiAgICAgICAgd2VsY29tZVNlY3Rpb24ub24oJ2NsaWNrJywgJ1tkYXRhLWZsaXA9XCJ0b2dnbGVcIl0nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2tlZCcpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyID0gd2VsY29tZVNlY3Rpb24uZmluZCgnLmwtd2VsY29tZV9fYXV0aC1idG4nKVxyXG4gICAgICAgICAgICB2YXIgZmxpcHBlciA9IHdlbGNvbWVTZWN0aW9uLmZpbmQoJy5sLWZsaXBwZXInKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZmxpcHBlcik7XHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IDYwMDtcclxuICAgICAgICAgICAgZmxpcHBlci50b2dnbGVDbGFzcygnbC1mbGlwcGVyX2JhY2snKTtcclxuICAgICAgICAgICAgaWYgKGZsaXBwZXIuaGFzQ2xhc3MoJ2wtZmxpcHBlcl9iYWNrJykpIHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXIuZmFkZU91dChkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyLmZhZGVJbihkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBwYXJhbGxheFxyXG4gICAgICAgIHZhciBsYXllckFsbCA9ICQoJy5sLXBhcmFsbGF4X19iZycpO1xyXG4gICAgICAgIHZhciBjbG91ZHMgPSAkKCcuYy1zdGFycy1wYXJhbGxheF9fbGF5ZXInKTtcclxuICAgICAgICAkKHdpbmRvdykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciBtb3VzZVggPSBlLnBhZ2VYO1xyXG4gICAgICAgICAgICB2YXIgbW91c2VZID0gZS5wYWdlWTtcclxuICAgICAgICAgICAgdmFyIHcgPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIG1vdXNlWDtcclxuICAgICAgICAgICAgdmFyIGggPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBtb3VzZVk7XHJcbiAgICAgICAgICAgIGxheWVyQWxsLm1hcChmdW5jdGlvbiAoaSwgaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdQb3MgPSB3ICogKChpICsgMSkgLyA0MCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaFBvcyA9IGggKiAoKGkgKyAxKSAvIDMwKTtcclxuICAgICAgICAgICAgICAgICQoaXRlbSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcgKyB3UG9zICsgJ3B4LCcgKyBoUG9zICsgJ3B4LCAwKSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2xvdWRzLm1hcChmdW5jdGlvbiAoaSwgaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdQb3MgPSB3ICogKChpICogOSArIDEpIC8gOTApO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhQb3MgPSBoICogKChpICogNCArIDEpIC8gMTIwKTtcclxuICAgICAgICAgICAgICAgICQoaXRlbSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcgKyB3UG9zICsgJ3B4LCcgKyBoUG9zICsgJ3B4LCAwKSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIC8vIHNsaWRlciBwcmV2X25leHQgYnV0dG9uc1xyXG4gICAgJCgnLmMtc2xpZGVyX19idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBzbGlkZXIgPSAkKHRoaXMpLmNsb3Nlc3QoJy5jLXNsaWRlcicpLFxyXG4gICAgICAgICAgICAvLyB2aWV3IHZhcnNcclxuICAgICAgICAgICAgc2xpZGVzID0gc2xpZGVyLmZpbmQoJy5jLXNsaWRlcl9fc2xpZGVzJyksXHJcbiAgICAgICAgICAgIGl0ZW1zID0gc2xpZGVyLmZpbmQoJy5jLXNsaWRlc19faXRlbScpLFxyXG4gICAgICAgICAgICBhY3RpdmVTbGlkZSA9IGl0ZW1zLmZpbHRlcignLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICBuZXh0U2xpZGUgPSBhY3RpdmVTbGlkZS5uZXh0KCksXHJcbiAgICAgICAgICAgIHByZXZTbGlkZSA9IGFjdGl2ZVNsaWRlLnByZXYoKSxcclxuICAgICAgICAgICAgZmlyc3RTbGlkZSA9IGl0ZW1zLmZpcnN0KCksXHJcbiAgICAgICAgICAgIGxhc3RTbGlkZSA9IGl0ZW1zLmxhc3QoKSxcclxuICAgICAgICAgICAgLy8gZGVzY3JpcHRpb24gdmFyc1xyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA9IHNsaWRlci5maW5kKCcuYy1zbGlkZXJfX2Rlc2NyaXB0aW9uJyksXHJcblxyXG4gICAgICAgICAgICAvLyBwYWdlciB2YXJzXHJcbiAgICAgICAgICAgIHBhZ2VyTGlzdCA9IHNsaWRlci5maW5kKCcuYy1wYWdlcl9fbGlzdCcpLFxyXG4gICAgICAgICAgICBwYWdlcyA9IHNsaWRlci5maW5kKCcuYy1wYWdlcl9faXRlbScpLFxyXG4gICAgICAgICAgICBhY3RpdmVQYWdlID0gcGFnZXMuZmlsdGVyKCcuYWN0aXZlJyksXHJcbiAgICAgICAgICAgIG5leHRQYWdlID0gYWN0aXZlUGFnZS5uZXh0KCksXHJcbiAgICAgICAgICAgIHByZXZQYWdlID0gYWN0aXZlUGFnZS5wcmV2KCksXHJcbiAgICAgICAgICAgIGZpcnN0UGFnZSA9IHBhZ2VzLmZpcnN0KCksXHJcbiAgICAgICAgICAgIGxhc3RQYWdlID0gcGFnZXMubGFzdCgpXHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoJ2Mtc2xpZGVyX19idXR0b25fbmV4dCcpKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXh0U2xpZGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmVDbGFzcyhuZXh0U2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MobmV4dFBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlRGVzY3JpcHRpb24oZGVzY3JpcHRpb24sIG5leHRTbGlkZS5pbmRleCgpKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MoZmlyc3RTbGlkZSk7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmVDbGFzcyhmaXJzdFBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlRGVzY3JpcHRpb24oZGVzY3JpcHRpb24sIGZpcnN0U2xpZGUuaW5kZXgoKSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAocHJldlNsaWRlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MocHJldlNsaWRlKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKHByZXZQYWdlKTtcclxuICAgICAgICAgICAgICAgIGNoYW5nZURlc2NyaXB0aW9uKGRlc2NyaXB0aW9uLCBwcmV2U2xpZGUuaW5kZXgoKSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKGxhc3RTbGlkZSk7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmVDbGFzcyhsYXN0UGFnZSk7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VEZXNjcmlwdGlvbihkZXNjcmlwdGlvbiwgbGFzdFNsaWRlLmluZGV4KCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBzbGlkZXIgcGFnZXIgYnV0dG9uc1xyXG4gICAgJCgnLmMtcGFnZXJfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBpbmRleCA9ICR0aGlzLmluZGV4KCksXHJcbiAgICAgICAgICAgIHNsaWRlciA9ICQodGhpcykuY2xvc2VzdCgnLmMtc2xpZGVyJyksXHJcbiAgICAgICAgICAgIC8vIHZpZXcgdmFyc1xyXG4gICAgICAgICAgICBzbGlkZXMgPSBzbGlkZXIuZmluZCgnLmMtc2xpZGVyX19zbGlkZXMnKSxcclxuICAgICAgICAgICAgaXRlbXMgPSBzbGlkZXIuZmluZCgnLmMtc2xpZGVzX19pdGVtJyksXHJcbiAgICAgICAgICAgIHNsaWRlVG9TaG93ID0gaXRlbXMuZXEoaW5kZXgpLFxyXG4gICAgICAgICAgICAvLyBkZXNjcmlwdGlvbiB2YXJzXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gc2xpZGVyLmZpbmQoJy5jLXNsaWRlcl9fZGVzY3JpcHRpb24nKSxcclxuICAgICAgICAgICAgc2xpZGVyVGl0bGUgPSBkZXNjcmlwdGlvbi5maW5kKCcuYy1zbGlkZXItdGl0bGUnKSxcclxuICAgICAgICAgICAgc2xpZGVyU2tpbGxzID0gZGVzY3JpcHRpb24uZmluZCgnLmMtc2xpZGVyLWl0ZW1fX3NraWxscycpLFxyXG4gICAgICAgICAgICBzbGlkZXJMaW5rID0gZGVzY3JpcHRpb24uZmluZCgnLmMtc2xpZGVyLWJ0bicpLFxyXG4gICAgICAgICAgICAvLyBwYWdlciB2YXJzXHJcbiAgICAgICAgICAgIHBhZ2VyTGlzdCA9IHNsaWRlci5maW5kKCcuYy1wYWdlcl9fbGlzdCcpLFxyXG4gICAgICAgICAgICBwYWdlcyA9IHNsaWRlci5maW5kKCcuYy1wYWdlcl9faXRlbScpLFxyXG4gICAgICAgICAgICBjbGlja2VkUGFnZSA9IHBhZ2VzLmVxKGluZGV4KVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xyXG4gICAgICAgIGlmICghJHRoaXMuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUFjdGl2ZUNsYXNzKHNsaWRlVG9TaG93KTtcclxuICAgICAgICAgICAgcmVtb3ZlQWN0aXZlQ2xhc3MoY2xpY2tlZFBhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG5hdlxyXG4gICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmMtbWVudS1pY29uJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIHRyaWdnZXIgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgd3JhcHBlciA9IHRyaWdnZXIuY2xvc2VzdCgnLmMtbWVudS13cmFwcGVyX21haW4nKTtcclxuICAgICAgICAgICAgdmFyIG1lbnUgPSB3cmFwcGVyLmZpbmQoJy5jLW1lbnUnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cod3JhcHBlcik7XHJcbiAgICAgICAgICAgIGlmICh3cmFwcGVyLmhhc0NsYXNzKCdvcGVuJykpIHtcclxuICAgICAgICAgICAgICAgIG1lbnUuZmFkZU91dCg1MDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lbnUuc2hvdygwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgLy8gYmxvZ1xyXG5cclxuICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoJy5jLWJsb2cnKTtcclxuICAgICAgICB2YXIgc2lkZWJhciA9IGNvbnRhaW5lci5maW5kKCcuYy1ibG9nLXNpZGViYXInKTtcclxuICAgICAgICBpZiAoc2lkZWJhci5sZW5ndGggPT09IDAgfHwgaXNNb2JpbGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvL3ZhciBjb250YWluZXJCb3R0b20gPSBjb250YWluZXIub2Zmc2V0KCkudG9wICsgY29udGFpbmVyLmhlaWdodCgpIC0gNDA7XHJcbiAgICAgICAgdmFyIGVkZ2VUb3AgPSBzaWRlYmFyLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAvL3ZhciBzaWRlYmFySGVpZ2h0ID0gc2lkZWJhci5oZWlnaHQoKTtcclxuICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGVkZ2VUb3AgPCAkKHdpbmRvdykuc2Nyb2xsVG9wKCkpIHtcclxuICAgICAgICAgICAgICAgIHNpZGViYXIuYWRkQ2xhc3MoJ2MtYmxvZy1zaWRlYmFyX2ZpeGVkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyLnJlbW92ZUNsYXNzKCdjLWJsb2ctc2lkZWJhcl9maXhlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFydGljbGVBbGwgPSAkKCcuYy1hcnRpY2xlJyk7XHJcbiAgICAgICAgdmFyIGxpbmtzQWxsID0gJCgnLmMtYmxvZy1zaWRlYmFyX19saW5rJyk7XHJcbiAgICAgICAgaWYgKGFydGljbGVBbGwubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgc2hvd1NlY3Rpb24od2luZG93LmxvY2F0aW9uLmhhc2gsIGZhbHNlKTtcclxuICAgICAgICBmdW5jdGlvbiBzaG93U2VjdGlvbihzZWN0aW9uLCBpc0FuaW1hdGUpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHNlY3Rpb24ucmVwbGFjZSgnIycsICcnKTtcclxuICAgICAgICAgICAgdmFyIHJlcVNlY3Rpb24gPSBhcnRpY2xlQWxsLmZpbHRlcignW2RhdGEtaWQ9XCInICsgdGFyZ2V0ICsgJ1wiXScpO1xyXG4gICAgICAgICAgICB2YXIgZHVyYXRpb24gPSA3NTA7XHJcbiAgICAgICAgICAgIGlmIChyZXFTZWN0aW9uLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIHJlcVNlY3Rpb25Qb3MgPSByZXFTZWN0aW9uLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgaWYgKGlzQW5pbWF0ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogcmVxU2VjdGlvblBvc1xyXG4gICAgICAgICAgICAgICAgfSwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keSwgaHRtbCcpLnNjcm9sbFRvcChyZXFTZWN0aW9uUG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tTZWN0aW9uKCkge1xyXG4gICAgICAgICAgICBhcnRpY2xlQWxsLmVhY2goZnVuY3Rpb24gKGksIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBhcnRpY2xlID0gJChpdGVtKTtcclxuICAgICAgICAgICAgICAgIHZhciB0b3BFZGdlID0gYXJ0aWNsZS5vZmZzZXQoKS50b3AgLSAzMDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgYm90dG9tRWRnZSA9IHRvcEVkZ2UgKyBhcnRpY2xlLmhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvcFNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0b3BFZGdlIDwgdG9wU2Nyb2xsICYmIGJvdHRvbUVkZ2UgPiB0b3BTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudElkID0gYXJ0aWNsZS5kYXRhKCdpZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXFMaW5rID0gbGlua3NBbGwuZmlsdGVyKCdbaHJlZj1cIiMnICsgY3VycmVudElkICsgJ1wiXScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcUxpbmsuY2xvc2VzdCgnLmMtYmxvZy1zaWRlYmFyX19pdGVtJykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gY3VycmVudElkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjaGVja1NlY3Rpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmMtYmxvZy1zaWRlYmFyX19saW5rJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgc2lkZWJhciA9ICQodGhpcykuY2xvc2VzdCgnLmMtYmxvZy1zaWRlYmFyJyk7XHJcbiAgICAgICAgICAgIGlmIChzaWRlYmFyLmhhc0NsYXNzKCdhY3RpdmUnKSkgc2lkZWJhci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHNob3dTZWN0aW9uKCQodGhpcykuYXR0cignaHJlZicpLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jLWJsb2ctc2lkZWJhcl9fYnV0dG9uJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgdHJpZ2dlciA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBzaWRlYmFyID0gdHJpZ2dlci5jbG9zZXN0KCcuYy1ibG9nLXNpZGViYXInKTtcclxuICAgICAgICAgICAgc2lkZWJhci50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8vIG5leHQvcHJldiBzZWN0aW9ucyBzY3JvbGxcclxuICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLW1vdmVdJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgYnRuID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGJ0bi5hdHRyKCdkYXRhLW1vdmUnKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzY3JvbGxUb1Bvc2l0aW9uKHBvc2l0aW9uLCBkdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gcG9zaXRpb24gfHwgMDtcclxuICAgICAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IGR1cmF0aW9uIHx8IDEwMDA7XHJcbiAgICAgICAgICAgICAgICAkKFwiYm9keSwgaHRtbFwiKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICB9LCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gJ3RvcCcpIHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09ICduZXh0Jykge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gYnRuLmNsb3Nlc3QoJy5sLXNlY3Rpb24nKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRhaW5lci5oZWlnaHQoKSk7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb1Bvc2l0aW9uKGNvbnRhaW5lci5oZWlnaHQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pKCk7XHJcblxyXG59KTtcclxuXHJcbi8vIEV2ZW50c1xyXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2xvYWRlZCcpO1xyXG59KTtcclxuXHJcbndpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB3aW5TY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICBwYXJhbGxheC5pbml0KHdpblNjcm9sbCk7XHJcbiAgICBpZiAod2luU2Nyb2xsID4gaW5uZXJIZWlnaHQgLyAxLjgpIHtcclxuICAgICAgICBza2lsbHMuc2V0VmFsdWUoKTtcclxuICAgIH1cclxufTtcclxuIl19
