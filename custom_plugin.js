
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

    if (window.__lampaWatchOpensTorrents) return;
    window.__lampaWatchOpensTorrents = true;

    function setup() {
        if (!window.Lampa || !window.jQuery) return;

        var $ = window.jQuery;

        function changeButton() {
            $('.open--menu').each(function () {
                var button = $(this);

                if (button.data('torrent-redirect')) return;

                button.data('torrent-redirect', true);

                // Убираем стандартное действие кнопки
                button.off('hover:enter');

                // Открываем штатный раздел торрентов
                button.on('hover:enter', function () {
                    var container = button.closest(
                        '.full-start, .full-start-new, .full'
                    );

                    var torrent = container.find(
                        '.view--torrent'
                    ).first();

                    if (!torrent.length) {
                        torrent = $('.view--torrent').first();
                    }

                    if (torrent.length) {
                        torrent.trigger('hover:enter');
                    } else if (Lampa.Noty) {
                        Lampa.Noty.show(
                            'Кнопка торрентов не найдена'
                        );
                    }
                });
            });
        }

        changeButton();

        if (Lampa.Listener) {
            Lampa.Listener.follow('full', function (e) {
                if (e.type === 'complite') {
                    setTimeout(changeButton, 100);
                }
            });
        }
    }

    if (window.Lampa && window.jQuery) {
        setup();
    } else {
        var timer = setInterval(function () {
            if (window.Lampa && window.jQuery) {
                clearInterval(timer);
                setup();
            }
        }, 500);
    }
})();

