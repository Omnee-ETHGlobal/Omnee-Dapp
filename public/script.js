document.addEventListener("DOMContentLoaded", function() {
    const section = document.querySelector('.section-oneee.dark-mode'); // Assurez-vous que cette section existe
    const title = document.querySelector('.section-oneee .title-base'); // Assurez-vous que ce sélecteur est correct
    const body = document.body;

    window.addEventListener('scroll', function() {
        const titleRect = title.getBoundingClientRect();
        const isVisible = titleRect.top < window.innerHeight && titleRect.bottom >= 0;

        // Active la transition avant d'ajouter ou de retirer les classes de mode sombre
        body.classList.add('transitioning');

        // Retarder légèrement l'application du mode sombre pour permettre la transition
        setTimeout(() => {
            body.classList.toggle('dark-mode', isVisible);
        }, 10);
    });
});




document.addEventListener("DOMContentLoaded", function() {
    const section = document.querySelector('.section-oneee.dark-mode'); // Assurez-vous que cette section existe
    const title = document.querySelector('.section-oneee .title-base'); // Assurez-vous que ce sélecteur est correct
    const body = document.body;

    window.addEventListener('scroll', function() {
        const titleRect = title.getBoundingClientRect();
        const isVisible = titleRect.top < window.innerHeight && titleRect.bottom >= 0;

        // Active la transition avant d'ajouter ou de retirer les classes de mode sombre
        body.classList.add('transitioning');

        // Retarder légèrement l'application du mode sombre pour permettre la transition
        setTimeout(() => {
            body.classList.toggle('dark-mode', isVisible);
        }, 10);
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const btnBuy = document.getElementById('btn-buy');
    const btnSell = document.getElementById('btn-sell');
    const buyContent = document.querySelector('.buy-content');
    const sellContent = document.querySelector('.sell-content');

    btnBuy.addEventListener('click', function () {
        btnBuy.classList.add('btn-switch-active');
        btnBuy.classList.remove('btn-switch');
        btnSell.classList.remove('btn-switch-active');
        btnSell.classList.add('btn-switch');
        buyContent.classList.remove('d-none');
        sellContent.classList.add('d-none');
    });

    btnSell.addEventListener('click', function () {
        btnSell.classList.add('btn-switch-active');
        btnSell.classList.remove('btn-switch');
        btnBuy.classList.remove('btn-switch-active');
        btnBuy.classList.add('btn-switch');
        sellContent.classList.remove('d-none');
        buyContent.classList.add('d-none');
    });
    



});


document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const extraLinks = document.getElementById('extra-links');

    menuToggle.addEventListener('click', function (e) {
        e.preventDefault();
        if (extraLinks.classList.contains('d-none')) {
            extraLinks.classList.remove('d-none');
            extraLinks.classList.add('show', 'd-block');
        } else {
            extraLinks.classList.remove('show', 'd-block');
            extraLinks.classList.add('d-none');
        }
    });
});




document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector('.container-nav'); // Assurez-vous que cela ne cible que la navbar
    let lastScrollTop = 0;

    window.addEventListener("scroll", function() {
        let st = window.pageYOffset || document.documentElement.scrollTop;

        if (st > lastScrollTop) {
            // Scroll vers le bas
            navbar.style.top = "-120px"; // Adaptez cette valeur pour assurer que la navbar est complètement cachée
        } else {
            // Scroll vers le haut
            navbar.style.top = "20px"; // La valeur initiale quand la navbar doit être visible
        }
        lastScrollTop = st <= 0 ? 0 : st; // Pour les navigateurs mobiles qui permettent de scroller au-delà du top
    }, false);
});
