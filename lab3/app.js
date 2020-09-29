const people = require('./people');
const work = require('./work');

async function main() {
    try {
        const personById = await people.getPersonById(43);
        if (personById.ssn !== '648-97-2273') throw 'wrong output';
        console.log('getPersonById passed');
    } catch (e) {
        console.error('getPersonById failed with', e);
    }
    try {
        const numberInCO = await people.howManyPerState('CO');
        if (numberInCO !== 27) throw 'wrong output';
        console.log('howManyPerState passed');
    } catch (e) {
        console.error('howManyPerState failed with', e);
    }
    try {
        const personByAge = await people.personByAge(43);
        if (personByAge.age !== 85) throw 'wrong output';
        console.log('personByAge passed');
    } catch (e) {
        console.error('personByAge failed with', e);
    }
    try {
        const peopleMetrics = await people.peopleMetrics();
        console.log('peopleMetrics passed');
    } catch (e) {
        console.error('peopleMetrics failed with', e);
    }
    try {
        const employees = await work.listEmployees();
        console.log('listEmployees passed');
    } catch (e) {
        console.error('listEmployees failed with', e);
    }

    try {
        const fourOneOne = await work.fourOneOne('240-144-7553');
        if (fourOneOne.company_name !== 'Kassulke, Towne and Davis')
            throw 'wrong output';
        console.log('fourOneOne passed');
    } catch (e) {
        console.error('fourOneOne failed with', e);
    }
    try {
        const whereDoTheyWork = await work.whereDoTheyWork('299-63-8866');
        if (whereDoTheyWork !== 'Marga Dawidowitsch works at Durgan LLC.')
            throw 'wrong output: ' + whereDoTheyWork;

        console.log('whereDoTheyWork passed');
    } catch (e) {
        console.error('whereDoTheyWork failed with', e);
    }
}

main();
