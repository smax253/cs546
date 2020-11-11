const mainRoute = require('./mainRoute');
const searchRoute = require('./searchRoute');
const showRoute = require('./showsRoute');

const constructRoutes = (app) => {
    app.use('/', mainRoute);
    app.use('/search', searchRoute);
    app.use('/shows', showRoute);
    app.use('*', (req, res) => {
        res.status(404).render('not_found', { title: 'Page not found!' });
    });
};

module.exports = constructRoutes;
