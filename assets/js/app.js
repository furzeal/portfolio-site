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
            this.move(user, winScroll, 6);
            this.move(userBg, winScroll, 20);
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
                var wPos = w * ((i + 1) / 40);
                var hPos = h * ((i + 1) / 30);
                $(item).css({
                    'transform': 'translate3d(' + wPos + 'px,' + hPos + 'px, 0)'
                });
            });
        });
    })();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG4vLyBNb2R1bGVzXHJcblxyXG52YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtcGFyYWxsYXhfX2JnJyksXHJcbiAgICAgICAgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLWRldmVsb3Blcl9fY29udGFpbmVyIC5jLXVzZXInKSxcclxuICAgICAgICB1c2VyQmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1kZXZlbG9wZXJfX2NvbnRhaW5lciAuYy1kZXZlbG9wZXJfX2JnJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQ29lZmZpY2llbnQpIHtcclxuICAgICAgICAgICAgdmFyIHN0cmFmZSA9IC0od2luZG93U2Nyb2xsIC8gc3RyYWZlQ29lZmZpY2llbnQpICsgJyUnO1xyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuICAgICAgICAgICAgLy8gVmFyIGZvciByZW5kZXJpbmcgYnkgdmlkZW8gcHJvY2Vzc29yICh6LWF4aXMpXHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwgJyArIHN0cmFmZSArICcsIDApJztcclxuICAgICAgICAgICAgc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAod2luU2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdpblNjcm9sbCwgMTAwKTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXIsIHdpblNjcm9sbCwgNik7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyQmcsIHdpblNjcm9sbCwgMjApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuXHJcbnZhciBza2lsbHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNraWxsSXRlbXMgPSBudWxsO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNraWxsSXRlbXMgPSAkKCcuYy1za2lsbF9fY2lyY2xlX291dGVyJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNraWxsSXRlbXMpO1xyXG4gICAgICAgICAgICBpZiAoc2tpbGxJdGVtcy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdza2lsbEl0ZW1zJyk7XHJcbiAgICAgICAgICAgIHNraWxsSXRlbXMuZWFjaChmdW5jdGlvbiAoaSwgc2tpbGwpIHtcclxuICAgICAgICAgICAgICAgIHNraWxsLnZhbHVlID0gJChza2lsbCkuYXR0cignc3Ryb2tlLWRhc2hhcnJheScpO1xyXG4gICAgICAgICAgICAgICAgJChza2lsbCkuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsICcwIDEwMCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChza2lsbEl0ZW1zLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgc2tpbGxJdGVtcy5lYWNoKGZ1bmN0aW9uIChpLCBza2lsbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gc2tpbGwudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2tpbGxPcGFjaXR5ID0gdmFsdWUuc3Vic3RyaW5nKDAsIHZhbHVlLmxlbmd0aCAtIDQpIC8gMTAwICsgMC4xO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNraWxsT3BhY2l0eSA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGxPcGFjaXR5ID0gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2tpbGxPcGFjaXR5KTtcclxuICAgICAgICAgICAgICAgIHNraWxsLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLWRhc2hhcnJheScsIHNraWxsLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICQoc2tpbGwpLmNzcygnb3BhY2l0eScsIHNraWxsT3BhY2l0eSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICBwYXJhbGxheC5pbml0KCk7XHJcbiAgICBjb25zb2xlLmxvZygnZG9jdW1lbnQucmVhZHknKTtcclxuICAgIHNraWxscy5pbml0KCk7XHJcbiAgICAvLyBmbGlwcGVyJnBhcmFsbGF4XHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB3ZWxjb21lU2VjdGlvbiA9ICQoJy5sLXdlbGNvbWUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh3ZWxjb21lU2VjdGlvbik7XHJcbiAgICAgICAgaWYgKHdlbGNvbWVTZWN0aW9uLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2luIHdlbGNvbWUnKTtcclxuICAgICAgICAvLyBmbGlwcGVyXHJcbiAgICAgICAgd2VsY29tZVNlY3Rpb24ub24oJ2NsaWNrJywgJ1tkYXRhLWZsaXA9XCJ0b2dnbGVcIl0nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2tlZCcpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyID0gd2VsY29tZVNlY3Rpb24uZmluZCgnLmwtd2VsY29tZV9fYXV0aC1idG4nKVxyXG4gICAgICAgICAgICB2YXIgZmxpcHBlciA9IHdlbGNvbWVTZWN0aW9uLmZpbmQoJy5sLWZsaXBwZXInKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZmxpcHBlcik7XHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IDYwMDtcclxuICAgICAgICAgICAgZmxpcHBlci50b2dnbGVDbGFzcygnbC1mbGlwcGVyX2JhY2snKTtcclxuICAgICAgICAgICAgaWYgKGZsaXBwZXIuaGFzQ2xhc3MoJ2wtZmxpcHBlcl9iYWNrJykpIHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXIuZmFkZU91dChkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyLmZhZGVJbihkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBwYXJhbGxheFxyXG4gICAgICAgIHZhciBsYXllckFsbCA9ICQoJy5sLXBhcmFsbGF4X19iZycpO1xyXG4gICAgICAgICQod2luZG93KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIG1vdXNlWCA9IGUucGFnZVg7XHJcbiAgICAgICAgICAgIHZhciBtb3VzZVkgPSBlLnBhZ2VZO1xyXG4gICAgICAgICAgICB2YXIgdyA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gbW91c2VYO1xyXG4gICAgICAgICAgICB2YXIgaCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIG1vdXNlWTtcclxuICAgICAgICAgICAgbGF5ZXJBbGwubWFwKGZ1bmN0aW9uIChpLCBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd1BvcyA9IHcgKiAoKGkgKyAxKSAvIDQwKTtcclxuICAgICAgICAgICAgICAgIHZhciBoUG9zID0gaCAqICgoaSArIDEpIC8gMzApO1xyXG4gICAgICAgICAgICAgICAgJChpdGVtKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoJyArIHdQb3MgKyAncHgsJyArIGhQb3MgKyAncHgsIDApJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSkoKTtcclxufSk7XHJcblxyXG4vLyBFdmVudHNcclxud2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHdpblNjcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgIHBhcmFsbGF4LmluaXQod2luU2Nyb2xsKTtcclxuICAgIGNvbnNvbGUubG9nKHdpblNjcm9sbCk7XHJcbiAgICBpZiAod2luU2Nyb2xsID4gaW5uZXJIZWlnaHQgLyAyKSB7XHJcbiAgICAgICAgc2tpbGxzLnNldFZhbHVlKCk7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==
