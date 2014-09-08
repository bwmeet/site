(function () {
    'use strict';

    if (typeof history.pushState === 'function') {
        var showPage = function (target, bypass) {
            if (!target) {
                target = 'index';
            }

            var hide = document.querySelectorAll('body > article:not(.' + target + ')');
            for (var i = 0; i < hide.length; i++) {
                hide[i].classList.add('is-hidden');
            }

            if (!bypass) {
                history.pushState(target, document.title, target);
            }

            document.querySelector('body > article.' + target).classList.remove('is-hidden');

            var nav = document.getElementById('site-nav');
            var navPosition = nav.offsetTop;

            var loop = function() {
                if (scrollY > navPosition) {
                    scrollBy(0, Math.min(scrollY - navPosition, -40));
                    requestAnimationFrame(loop);
                } else if (scrollY < navPosition) {
                    scrollBy(0, Math.min(navPosition - scrollY, 40));
                    requestAnimationFrame(loop);
                }
            };

            loop();
        };

        var links = document.querySelectorAll('nav a:not(.exempt)');

        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function (event) {
                event.preventDefault();
                var active = document.getElementsByClassName('active');

                for (var i = 0; i < active.length; i++) {
                    active[i].classList.remove('active');
                }

                event.currentTarget.classList.toggle('active');

                var target = event.currentTarget.href.split('/')[3].replace('.html','');
                showPage(target);
            });
        }

        window.addEventListener('popstate', function (event) {
            event.preventDefault();
            var active = document.getElementsByClassName('active'),
                state = event.state || 'index.html';

            for (var i = 0; i < active.length; i++) {
                active[i].classList.remove('active');
            }

            var links = document.querySelectorAll('nav a:not(.exempt)');

            for (var i = 0; i < links.length; i++)
                if (links[i].href.indexOf(state) > -1)
                    links[i].classList.add('active');

            showPage(event.state, true);
        });

        var scrollTo = function (event) {
            event.preventDefault();
            var clicker = event.target.tagName === 'I' ?
                event.target.parentNode : event.target;

            var target = clicker.href.split('#')[1],
                el = document.getElementById(target);

            var loop = function() {
                if (scrollY > el.offsetTop) {
                    scrollBy(0, -50);
                    requestAnimationFrame(loop);
                }
            };
            
            loop();
        };

        var pageLinks = document.querySelectorAll('a[href^="#"]');
        for (var i = 0; i < pageLinks.length; i++) {
            pageLinks[i].addEventListener('click', scrollTo);
        }
    }
})();
