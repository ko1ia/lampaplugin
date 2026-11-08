
(function () {
    'use strict';

    if (window.lampa_hide_profile_loaded) return;
    window.lampa_hide_profile_loaded = true;

    function hideProfile() {
        var styleId = 'lampa-hide-profile-style';

        if (!document.getElementById(styleId)) {
            var style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .head .open--profile,
                .head__actions .open--profile {
                    display: none !important;
                }
            `;
            (document.head || document.documentElement)
                .appendChild(style);
        }
    }

    hideProfile();

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            hideProfile,
            { once: true }
        );
    }

    if (window.Lampa && Lampa.Listener) {
        Lampa.Listener.follow('app', function (event) {
            if (event.type === 'ready') hideProfile();
        });
    }
})();



(function () {
    'use strict';

    if (window.__lampaTorrentButtonAlwaysExpanded) return;
    window.__lampaTorrentButtonAlwaysExpanded = true;

    const style = document.createElement('style');
    style.textContent = `
        .full-start__button.lampa-torrent-expanded {
            width: auto !important;
            min-width: 0 !important;
            max-width: none !important;
            padding-left: 1.1em !important;
            padding-right: 1.1em !important;
            background: #fff !important;
            color: #111 !important;
            border-radius: 1em !important;
            opacity: 1 !important;
        }

        .lampa-torrent-expanded .full-start__button-title,
        .lampa-torrent-expanded .full-start__button__title,
        .lampa-torrent-expanded .full-start__button__text,
        .lampa-torrent-expanded .full-start__button-text,
        .lampa-torrent-expanded .full-start__button-name,
        .lampa-torrent-expanded .full-start__button__name {
            display: inline-block !important;
            visibility: visible !important;
            opacity: 1 !important;
            max-width: none !important;
            width: auto !important;
            transform: none !important;
        }
    `;

    document.head.appendChild(style);

    function update() {
        document.querySelectorAll(
            '.full-start__button, .full-start__buttons .selector'
        ).forEach(button => {
            const label = (button.textContent || '').trim();

            if (/^(торренты|torrents)$/i.test(label)) {
                button.classList.add('lampa-torrent-expanded');
            }
        });
    }

    let pending = false;

    function schedule() {
        if (pending) return;
        pending = true;

        requestAnimationFrame(() => {
            pending = false;
            update();
        });
    }

    update();

    new MutationObserver(schedule).observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
