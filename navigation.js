(function () {
    'use strict';

    if (typeof history.pushState === 'function') {
        var showPage = function (target, bypass) {
            if (!target) {
                target = 'about';
            }

            var hide = document.querySelectorAll('body > article:not(.' + target + ')');
            for (var i = 0; i < hide.length; i++) {
                hide[i].classList.add('is-hidden');
            }

            if (!bypass) {
                history.pushState(target, document.title, target);
            }

            var page = document.querySelector('body > article.' + target);
            page.classList.remove('is-hidden');

            var navPosition = page.offsetTop - 75;

            var oldY;

            var loop = function() {
                if (oldY !== scrollY) {
                    oldY = scrollY;
                    if (scrollY > navPosition) {
                        scrollBy(0, Math.min(scrollY - navPosition, -40));
                        requestAnimationFrame(loop);
                    } else if (scrollY < navPosition) {
                        scrollBy(0, Math.min(navPosition - scrollY, 40));
                        requestAnimationFrame(loop);
                    }
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
		
		// Safari has an issue that fires popstate on page load
		// to workaround this we find the history entries at load
		// and in the popstate event handler we check that something
		// has changed
		var initialOrder = window.history.length;   
        
		window.addEventListener('popstate', function (event) {
			if (window.history.length === initialOrder) {
				return;
			}
			
            event.preventDefault();
            var active = document.getElementsByClassName('active'),
                state = event.state || 'index.html';

            for (var i = 0; i < active.length; i++) {
                active[i].classList.remove('active');
            }

            var links = document.querySelectorAll('nav a:not(.exempt)');

            for (var i = 0; i < links.length; i++) {
                if (links[i].href.indexOf(state) > -1) {
                    links[i].classList.add('active');
				}
			}

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
