process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const {createStrapi} = require('@strapi/strapi');

createStrapi().start();
