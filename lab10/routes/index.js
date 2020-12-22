const loginRoute = require('./login');
const logoutRoute = require('./logout');

const constructor = (app) => {
    app.use('/private', (req, res) => {
        const user = req.session.user;
        res.render('profile_data', {
            title: `${user.firstName} ${user.lastName}'s Profile`,
            user,
        });
    });
    app.use('/login', loginRoute);
    app.use('/logout', logoutRoute);
    app.use('/', (req, res) => {
        if (req.session.user) {
            return res.redirect('/private');
        } else {
            res.render('login', { title: 'Login Page' });
        }
    });
    app.use('*', (req, res) => {
        res.status(404).render('not_found', { title: 'Page not found!' });
    });
};

module.exports = constructor;
