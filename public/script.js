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

