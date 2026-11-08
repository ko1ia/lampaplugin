
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
