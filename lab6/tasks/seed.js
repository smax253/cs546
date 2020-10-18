const mongoConnection = require('../config/mongoConnection');
const { books, reviews } = require('../data');

async function seedDB() {
    const book1 = await books.create(
        'Gone with the Wind',
        { authorFirstName: 'Margaret', authorLastName: 'Mitchell' },
        ['Fiction', 'Classics', 'Romance', 'Historical'],
        '6/30/1936',
        "Scarlett O'Hara, the beautiful, spoiled daughter of a well-to-do Georgia plantation owner, must use every means at her disposal to claw her way out of the poverty she finds herself in after Sherman's March to the Sea.",
    );
    const book2 = await books.create(
        'Jane Eyre',
        { authorFirstName: 'Charlotte', authorLastName: 'Bronte' },
        ['Fiction', 'Romance', 'Classics'],
        '10/16/1847',
        "Charlotte Bronte's impassioned novel is the love story of Jane Eyre, a plain yet spirited governess, and her arrogant, brooding Mr. Rochester. Published in 1847, under the pseudonym of Currer Bell, the book heralded a new kind of heroine—one whose virtuous integrity, keen intellect and tireless perseverance broke through class barriers to win equal stature with the man she loved.",
    );
    const book3 = await books.create(
        'Pride and Prejudice',
        { authorFirstName: 'Jane', authorLastName: 'Austen' },
        ['Fiction', 'Romance', 'Classics', 'Historical'],
        '1/28/1813',
        "The romantic clash between the opinionated Elizabeth and her proud beau, Mr. Darcy, is a splendid performance of civilized sparring. And Jane Austen's radiant wit sparkles as her characters dance a delicate quadrille of flirtation and intrigue, making this book the most superb comedy of manners of Regency England.",
    );
    const book4 = await books.create(
        'To Kill a Mockingbird',
        { authorFirstName: 'Harper', authorLastName: 'Lee' },
        ['Classics', 'Fiction', 'Young Adult'],
        '7/11/1960',
        'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.',
    );
    console.log('Books DB seeded!');

    await reviews.create(
        'What a classic',
        'mrtail05',
        book1._id,
        4,
        '5/4/2019',
        'This book is an absolute classic. You have to read it!',
    );

    await reviews.create(
        'A childhood favorite',
        'bluebird20',
        book1._id,
        5,
        '3/1/1993',
        'One of my favorite books from my childhood. So nostalgic.',
    );
    await reviews.create(
        'Boring',
        'illiterate30',
        book3._id,
        2,
        '5/19/2020',
        "Couldn't get past half the book. Gave up.",
    );
    console.log('Reviews DB seeded!');

    const db = await mongoConnection();
    await db.serverConfig.close();
}

seedDB();
