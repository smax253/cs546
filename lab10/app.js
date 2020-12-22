const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');

const handleBars = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === 'number')
                return new Handlebars.SafeString(
                    JSON.stringify(obj, null, spacing)
                );

            return new Handlebars.SafeString(JSON.stringify(obj));
        },
    },
});

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        name: 'AuthCookie',
        secret: 'the secret string!',
        resave: false,
        saveUninitialized: true,
    })
);

app.engine('handlebars', handleBars.engine);
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
    const auth = req.session.user ? '' : 'Non-';
    console.log(
        `[${new Date().toUTCString()}]: ${req.method} ${
            req.originalUrl
        } (${auth}Authenticated User)`
    );
    next();
});

app.use('/private', (req, res, next) => {
    if (!req.session.user) {
        res.status(403).render('unauthorized', { title: 'Not logged in!' });
        return;
    }
    next();
});

configRoutes(app);

app.listen(3000, () => {
    console.log('server running on port 3000');
});
