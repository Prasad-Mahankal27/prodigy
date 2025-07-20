window.addEventListener('scroll', function() {
            const nav = document.getElementById('main-nav');
            if(window.scrollY > 60) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });