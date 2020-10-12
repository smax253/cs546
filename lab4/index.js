const { create, getAll, get, remove, rename } = require('./data/movies');
const connection = require('./config/mongoConnection');

const main = async () => {
    const firstMovie = await create(
        'Forrest Gump',
        'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
        'PG-13',
        '2h 22min',
        'Drama, Romance',
        ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
        { director: 'Robert Zemickis', yearReleased: 1994 },
    );
    console.log(firstMovie);
    const secondMovie = await create(
        'Inception',
        'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        'PG-13',
        '2h 28min',
        'Action, Adventure, Sci-Fi',
        ['Leonardo Dicaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
        { director: 'Christopher Nolan', yearReleased: 2010 },
    );
    console.log(await getAll());

    const thirdMovie = await create(
        'Interstellar',
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        'PG-13',
        '2h 49min',
        'Adventure, Drama, Sci-Fi',
        ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
        { director: 'Christopher Nolan', yearReleased: 2014 },
    );

    console.log(thirdMovie);

    const firstMovieRenamed = await rename(
        firstMovie._id,
        'Forrest Gump: The Original',
    );

    console.log(firstMovieRenamed);

    await remove(secondMovie._id);

    console.log(await getAll());

    try {
        await create('missing plot', '', 'pg 13', 'time', 'genre', ['cast'], {
            director: 'name',
            yearReleased: 1970,
        });
        console.log('invalid creation unexpectedly passed');
    } catch (err) {
        console.log('invalid creation failed successfully');
    }

    try {
        await remove('001100');
        console.log('invalid remove unexpectedly passed');
    } catch (error) {
        console.log('invalid remove failed succesfully');
    }

    try {
        await rename('001100', 'someTitle');
        console.log('invalid rename unexpectedly passed');
    } catch (error) {
        console.log('invalid rename failed succesfully');
    }

    try {
        await rename(firstMovie._id, {});
        console.log('wrong param rename unexpectedly passed');
    } catch (error) {
        console.log('wrong param rename failed succesfully');
    }

    try {
        await get('001100');
        console.log('invalid get unexpectedly passed');
    } catch (error) {
        console.log('invalid get failed succesfully');
    }

    const db = await connection();
    await db.serverConfig.close();
};
main().catch((err) => console.error(err));
