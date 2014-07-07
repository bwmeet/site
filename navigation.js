'use strict';

if (typeof history.pushState === 'function') {
    var asyncLoadPage = function (target, bypass) {
        var httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = function (data) {
            // process the server response

            if (httpRequest.readyState !== 4 || httpRequest.status !== 200) {
                return;
            }

            if (!bypass) {
                history.pushState(target, document.title, target);
            }

            var html = data.target.responseText;

            var x = document.createElement('div');
            x.innerHTML = html;
            var article = x.querySelector('article');
            document.querySelector('article').innerHTML = article.innerHTML;
        };

        httpRequest.open('GET', target);
        httpRequest.send(null);
        return false;
    };

    var links = document.querySelectorAll('nav a:not(.exempt)');

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (event) {
            event.preventDefault();
            var active = document.getElementsByClassName('active');

            for (var i = 0; i < active.length; i++) {
                active[i].classList.remove('active');
            }

            event.target.classList.toggle('active');

            asyncLoadPage(event.target.href);
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

        asyncLoadPage(event.state, true);
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
