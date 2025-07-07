'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter('api::event.event', {
    config: {
        find: {
            auth: false,
        },
        findOne: {
            auth: false,
        },
    },
});
