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

var skills = (function() {
    var skillItems = null;
    return {
        init: function() {
            skillItems = $('.c-skill__circle_outer');
            console.log(skillItems);
            if (skillItems.length === 0)
                return;
            console.log('skillItems');
            skillItems.each(function(i, skill) {
                skill.value = $(skill).attr('stroke-dasharray');
                $(skill).attr('stroke-dasharray', '0 100');
            });
        },
        setValue: function() {
            if (skillItems.length === 0)
                return;
            skillItems.each(function(i, skill) {
                skill.setAttribute('stroke-dasharray', skill.value);
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
        if (welcomeSection.length==0) {
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
        $(window).on('mousemove', function(e) {
            var mouseX = e.pageX;
            var mouseY = e.pageY;
            var w = (window.innerWidth / 2) - mouseX;
            var h = (window.innerHeight / 2) - mouseY;
            layerAll.map(function(i, item) {
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
    if (winScroll>innerHeight/2) {
        skills.setValue();
    }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuLy8gTW9kdWxlc1xyXG5cclxudmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXBhcmFsbGF4X19iZycpLFxyXG4gICAgICAgIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1kZXZlbG9wZXJfX2NvbnRhaW5lciAuYy11c2VyJyksXHJcbiAgICAgICAgdXNlckJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtZGV2ZWxvcGVyX19jb250YWluZXIgLmMtZGV2ZWxvcGVyX19iZycpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbW92ZTogZnVuY3Rpb24gKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUNvZWZmaWNpZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBzdHJhZmUgPSAtKHdpbmRvd1Njcm9sbCAvIHN0cmFmZUNvZWZmaWNpZW50KSArICclJztcclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gYmxvY2suc3R5bGU7XHJcbiAgICAgICAgICAgIC8vIFZhciBmb3IgcmVuZGVyaW5nIGJ5IHZpZGVvIHByb2Nlc3NvciAoei1heGlzKVxyXG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsICcgKyBzdHJhZmUgKyAnLCAwKSc7XHJcbiAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdpblNjcm9sbCkge1xyXG4gICAgICAgICAgICBpZiAodXNlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3aW5TY3JvbGwsIDEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyLCB3aW5TY3JvbGwsIDYpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUodXNlckJnLCB3aW5TY3JvbGwsIDIwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG52YXIgc2tpbGxzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNraWxsSXRlbXMgPSBudWxsO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2tpbGxJdGVtcyA9ICQoJy5jLXNraWxsX19jaXJjbGVfb3V0ZXInKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2tpbGxJdGVtcyk7XHJcbiAgICAgICAgICAgIGlmIChza2lsbEl0ZW1zLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NraWxsSXRlbXMnKTtcclxuICAgICAgICAgICAgc2tpbGxJdGVtcy5lYWNoKGZ1bmN0aW9uKGksIHNraWxsKSB7XHJcbiAgICAgICAgICAgICAgICBza2lsbC52YWx1ZSA9ICQoc2tpbGwpLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknKTtcclxuICAgICAgICAgICAgICAgICQoc2tpbGwpLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCAnMCAxMDAnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChza2lsbEl0ZW1zLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgc2tpbGxJdGVtcy5lYWNoKGZ1bmN0aW9uKGksIHNraWxsKSB7XHJcbiAgICAgICAgICAgICAgICBza2lsbC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNoYXJyYXknLCBza2lsbC52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICBwYXJhbGxheC5pbml0KCk7XHJcbiAgICBjb25zb2xlLmxvZygnZG9jdW1lbnQucmVhZHknKTtcclxuICAgIHNraWxscy5pbml0KCk7XHJcbiAgICAvLyBmbGlwcGVyJnBhcmFsbGF4XHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB3ZWxjb21lU2VjdGlvbiA9ICQoJy5sLXdlbGNvbWUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh3ZWxjb21lU2VjdGlvbik7XHJcbiAgICAgICAgaWYgKHdlbGNvbWVTZWN0aW9uLmxlbmd0aD09MCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiB3ZWxjb21lJyk7XHJcbiAgICAgICAgLy8gZmxpcHBlclxyXG4gICAgICAgIHdlbGNvbWVTZWN0aW9uLm9uKCdjbGljaycsICdbZGF0YS1mbGlwPVwidG9nZ2xlXCJdJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrZWQnKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgdHJpZ2dlciA9IHdlbGNvbWVTZWN0aW9uLmZpbmQoJy5sLXdlbGNvbWVfX2F1dGgtYnRuJylcclxuICAgICAgICAgICAgdmFyIGZsaXBwZXIgPSB3ZWxjb21lU2VjdGlvbi5maW5kKCcubC1mbGlwcGVyJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZsaXBwZXIpO1xyXG4gICAgICAgICAgICB2YXIgZHVyYXRpb24gPSA2MDA7XHJcbiAgICAgICAgICAgIGZsaXBwZXIudG9nZ2xlQ2xhc3MoJ2wtZmxpcHBlcl9iYWNrJyk7XHJcbiAgICAgICAgICAgIGlmIChmbGlwcGVyLmhhc0NsYXNzKCdsLWZsaXBwZXJfYmFjaycpKSB7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyLmZhZGVPdXQoZHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlci5mYWRlSW4oZHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gcGFyYWxsYXhcclxuICAgICAgICB2YXIgbGF5ZXJBbGwgPSAkKCcubC1wYXJhbGxheF9fYmcnKTtcclxuICAgICAgICAkKHdpbmRvdykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdmFyIG1vdXNlWCA9IGUucGFnZVg7XHJcbiAgICAgICAgICAgIHZhciBtb3VzZVkgPSBlLnBhZ2VZO1xyXG4gICAgICAgICAgICB2YXIgdyA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gbW91c2VYO1xyXG4gICAgICAgICAgICB2YXIgaCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIG1vdXNlWTtcclxuICAgICAgICAgICAgbGF5ZXJBbGwubWFwKGZ1bmN0aW9uKGksIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHZhciB3UG9zID0gdyAqICgoaSArIDEpIC8gNDApO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhQb3MgPSBoICogKChpICsgMSkgLyAzMCk7XHJcbiAgICAgICAgICAgICAgICAkKGl0ZW0pLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgnICsgd1BvcyArICdweCwnICsgaFBvcyArICdweCwgMCknXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KSgpO1xyXG59KTtcclxuXHJcbi8vIEV2ZW50c1xyXG53aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgd2luU2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgcGFyYWxsYXguaW5pdCh3aW5TY3JvbGwpO1xyXG4gICAgY29uc29sZS5sb2cod2luU2Nyb2xsKTtcclxuICAgIGlmICh3aW5TY3JvbGw+aW5uZXJIZWlnaHQvMikge1xyXG4gICAgICAgIHNraWxscy5zZXRWYWx1ZSgpO1xyXG4gICAgfVxyXG59O1xyXG4iXX0=
