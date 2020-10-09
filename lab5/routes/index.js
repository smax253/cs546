const showsRoutes = require('./shows');
const aboutRoutes = require('./about');

const constructor = (app) => {
    app.use('/shows', showsRoutes);
    app.use('/about', aboutRoutes);
    app.use('*', (_, res) => {
        console.warn('unknown route was accessed');
        res.status(404).json({ error: 'Resource not found!' });
    });
};

module.exports = constructor;
