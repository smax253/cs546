const axios = require('axios');

let peopleData;

const getPeople = async () => {
    const { data } = await axios.get(
        'https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json',
    );
    return data;
};

const getPersonById = async (id) => {
    if (typeof id !== 'number') throw 'id must be a number';
    if (!peopleData) peopleData = await getPeople();
    if (id < 1 || id > peopleData.length)
        throw 'id must be in the bounds of the amount of people';
    return peopleData.find((person) => person.id === id);
};

const howManyPerState = async (stateAbbrv) => {
    if (!stateAbbrv || typeof stateAbbrv !== 'string')
        throw 'stateAbbrv must be a string';
    if (!peopleData) peopleData = await getPeople();
    const result = peopleData.filter(
        (person) => person.address.state === stateAbbrv,
    ).length;
    if (!result) throw 'there is no one living in this state';
    else return result;
};

const personByAge = async (index) => {
    if (typeof index !== 'number') throw 'index must be a number';
    if (!peopleData) peopleData = await getPeople();
    if (index < 0 || index >= peopleData.length)
        throw 'index must be in the bounds of the amount of people';
    const { first_name, last_name, date_of_birth } = peopleData.sort((a, b) => {
        const aDate = new Date(a.date_of_birth);
        const bDate = new Date(b.date_of_birth);
        return aDate.getTime() - bDate.getTime();
    })[index];
    const age =
        new Date(Date.now() - new Date(date_of_birth).getTime()).getFullYear() -
        1970;
    return {
        first_name,
        last_name,
        date_of_birth,
        age,
    };
};

const peopleMetrics = async () => {
    if (!peopleData) peopleData = await getPeople();
    let totalLetters = 0,
        totalVowels = 0,
        totalConsonants = 0,
        longestName = '',
        shortestName = '',
        cities = {},
        totalAge = 0;
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    peopleData.forEach((person) => {
        const { first_name, last_name, address, date_of_birth } = person;
        if (cities[address.city]) cities[address.city] += 1;
        else cities[address.city] = 1;
        const full_name = `${first_name} ${last_name}`;
        if (
            !longestName ||
            longestName.replace(/ /g, '').length <
                full_name.replace(/ /g, '').length
        )
            longestName = full_name;
        if (
            !shortestName ||
            shortestName.replace(/ /g, '').length >
                full_name.replace(/ /g, '').length
        )
            shortestName = full_name;
        for (const c of first_name.concat(last_name).toLowerCase()) {
            if (vowels.includes(c)) {
                totalVowels += 1;
                totalLetters += 1;
            } else if (consonants.includes(c)) {
                totalConsonants += 1;
                totalLetters += 1;
            }
        }
        totalAge +=
            new Date(
                Date.now() - new Date(date_of_birth).getTime(),
            ).getFullYear() - 1970;
    });

    const mostRepeatingCity = Object.keys(cities).sort((a, b) => {
        return cities[b] - cities[a];
    })[0];
    return {
        totalLetters,
        totalVowels,
        totalConsonants,
        longestName,
        shortestName,
        mostRepeatingCity,
        averageAge: totalAge / peopleData.length,
    };
};
/*
getPersonById(500)
    .then((item) => {
        console.log(item);
    })
    .catch((error) => {
        console.log(error);
    });

howManyPerState('NY').then((item) => console.log(item));

personByAge(500).then((result) => {
    console.log(result);
});
peopleMetrics().then((result) => {
    console.log(result);
});*/

module.exports = {
    getPeople,
    getPersonById,
    howManyPerState,
    peopleMetrics,
    personByAge,
};
