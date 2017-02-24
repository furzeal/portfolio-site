'use strict';
// Modules

var parallax = (function () {
    var bg = document.querySelector('.l-developer__bg'),
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
            if (bg == null) {
                return;
            }
            this.move(bg, winScroll, 100);
            this.move(user, winScroll, 6);
            this.move(userBg, winScroll, 20);
        }
    }
})();

$(document).ready(function () {
    parallax.init();

    // flipper
    (function () {
        var welcomeSection = $('.l-welcome');
        console.log(welcomeSection);
        if (!welcomeSection ===0) {
            return;
        }
        console.log('in welcome');
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
    })();
});

// Events
window.onscroll = function () {
    var winScroll = window.pageYOffset;
    parallax.init(winScroll);
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuLy8gTW9kdWxlc1xyXG5cclxudmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLWRldmVsb3Blcl9fYmcnKSxcclxuICAgICAgICB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtZGV2ZWxvcGVyX19jb250YWluZXIgLmMtdXNlcicpLFxyXG4gICAgICAgIHVzZXJCZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLWRldmVsb3Blcl9fY29udGFpbmVyIC5jLWRldmVsb3Blcl9fYmcnKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1vdmU6IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVDb2VmZmljaWVudCkge1xyXG4gICAgICAgICAgICB2YXIgc3RyYWZlID0gLSh3aW5kb3dTY3JvbGwgLyBzdHJhZmVDb2VmZmljaWVudCkgKyAnJSc7XHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IGJsb2NrLnN0eWxlO1xyXG4gICAgICAgICAgICAvLyBWYXIgZm9yIHJlbmRlcmluZyBieSB2aWRlbyBwcm9jZXNzb3IgKHotYXhpcylcclxuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCAnICsgc3RyYWZlICsgJywgMCknO1xyXG4gICAgICAgICAgICBzdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3aW5TY3JvbGwpIHtcclxuICAgICAgICAgICAgaWYgKGJnID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdpblNjcm9sbCwgMTAwKTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXIsIHdpblNjcm9sbCwgNik7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyQmcsIHdpblNjcm9sbCwgMjApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIHBhcmFsbGF4LmluaXQoKTtcclxuXHJcbiAgICAvLyBmbGlwcGVyXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB3ZWxjb21lU2VjdGlvbiA9ICQoJy5sLXdlbGNvbWUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh3ZWxjb21lU2VjdGlvbik7XHJcbiAgICAgICAgaWYgKCF3ZWxjb21lU2VjdGlvbiA9PT0wKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2luIHdlbGNvbWUnKTtcclxuICAgICAgICB3ZWxjb21lU2VjdGlvbi5vbignY2xpY2snLCAnW2RhdGEtZmxpcD1cInRvZ2dsZVwiXScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGlja2VkJyk7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIHRyaWdnZXIgPSB3ZWxjb21lU2VjdGlvbi5maW5kKCcubC13ZWxjb21lX19hdXRoLWJ0bicpXHJcbiAgICAgICAgICAgIHZhciBmbGlwcGVyID0gd2VsY29tZVNlY3Rpb24uZmluZCgnLmwtZmxpcHBlcicpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmbGlwcGVyKTtcclxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gNjAwO1xyXG4gICAgICAgICAgICBmbGlwcGVyLnRvZ2dsZUNsYXNzKCdsLWZsaXBwZXJfYmFjaycpO1xyXG4gICAgICAgICAgICBpZiAoZmxpcHBlci5oYXNDbGFzcygnbC1mbGlwcGVyX2JhY2snKSkge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlci5mYWRlT3V0KGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXIuZmFkZUluKGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSkoKTtcclxufSk7XHJcblxyXG4vLyBFdmVudHNcclxud2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHdpblNjcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgIHBhcmFsbGF4LmluaXQod2luU2Nyb2xsKTtcclxufTtcclxuIl19
