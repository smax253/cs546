const bookRoutes = require('./books');
const reviewRoutes = require('./reviews');

const constructor = (app) => {
    app.use('/books', bookRoutes);
    app.use('/reviews', reviewRoutes);
    app.use('*', (_, res) => {
        console.warn('unknown route was accessed');
        res.status(404).json({ error: 'Resource not found!' });
    });
};

module.exports = constructor;
