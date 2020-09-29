const axios = require('axios');
const { getPersonById, getPeople } = require('./people');

let companies;

const getWork = async () => {
    const { data } = await axios.get(
        'https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json',
    );
    return data;
};

const listEmployees = async () => {
    if (!companies) companies = await getWork();
    const result = [];
    for (const company of companies) {
        const { company_name, employees } = company;
        const resolvedEmployees = await Promise.all(
            employees.map(async (employeeId) => {
                const { first_name, last_name } = await getPersonById(
                    employeeId,
                );
                return { first_name, last_name };
            }),
        );

        result.push({
            company_name,
            employees: resolvedEmployees,
        });
    }
    return result;
};

const fourOneOne = async (phoneNumber) => {
    if (!companies) companies = await getWork();
    if (!phoneNumber || typeof phoneNumber !== 'string')
        throw 'phone number must be a non-empty string';
    if (!phoneNumber.match(/[0-9]{3}-[0-9]{3}-[0-9]{4}/))
        throw 'phone number must be a valid phone number';
    const result = companies.find(
        (company) => company.company_phone === phoneNumber,
    );
    if (!result) throw 'there is no company with the given phone number';
    else
        return {
            company_name: result.company_name,
            company_address: result.company_address,
        };
};

const whereDoTheyWork = async (ssn) => {
    if (!companies) companies = await getWork();
    if (!ssn || typeof ssn !== 'string') throw 'ssn must be a non-empty string';
    if (!ssn.match(/[0-9]{3}-[0-9]{2}-[0-9]{4}/))
        throw 'ssn must be in the valid format';
    const people = await getPeople();
    const foundPerson = people.find((person) => person.ssn === ssn);
    if (!foundPerson) throw 'there is no person with the specified ssn';
    const foundCompany = companies.find((company) =>
        company.employees.includes(foundPerson.id),
    );
    if (!companies) throw 'this person does not work at a company';
    return `${foundPerson.first_name} ${foundPerson.last_name} works at ${foundCompany.company_name}.`;
};
/*
listEmployees()
    .then((result) => console.log(JSON.stringify(result)))
    .catch((err) => console.log(err));

fourOneOne('240-144-7553').then((result) => {
    console.log(result);
});
*/

module.exports = {
    listEmployees,
    whereDoTheyWork,
    fourOneOne,
};
