const fetch = require('node-fetch');
const trackEvent = (category, action, label, value) => {
    const data = {
        // API Version.
        v: '1',
        // Tracking ID / Property ID.
        tid: 'G-R1MZ3JYQN3',
        // Anonymous Client Identifier. Ideally, this should be a UUID that
        // is associated with particular user, device, or browser instance.
        cid: '1',
        // Event hit type.
        t: 'event',
        // Event category.
        ec: category,
        // Event action.
        ea: action,
        // Event label.
        el: label,
        // Event value.
        ev: value,
    };

    return fetch('http://www.google-analytics.com/debug/collect', {
        params: data,
    });
};

exports.trackEvent = trackEvent;
