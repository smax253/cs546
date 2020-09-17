// I pledge my honor that I have abided by the Stevens Honor System.

const questionOne = function questionOne(arr) {
    const result = {};
    arr && arr.forEach((number) => {
        if(number === 1) {
            result[number] = false;
            return;
        }
        for(let i = 2; i<=number/2; i++){
            if (number % i === 0) {
                result[number] = false;
                return;
            }
        }
        result[number] = true;
    })
    return result;
};

const questionTwo = function questionTwo(arr) { 
    const sumOfSquares = arr.reduce((prev, next) => prev + next*next, 0)
    const sixthPower = Math.pow(sumOfSquares, 6)
    return Math.sqrt(sixthPower)
};

const questionThree = function questionThree(text) {
    const result = {
        consonants: 0,
        vowels: 0,
        numbers: 0,
        spaces: 0,
        punctuation: 0,
        specialCharacters: 0
    }
    const legend = {
        ',.:;"/\'!-()[]?': 'punctuation',
        'aeiou': 'vowels',
        ' ': 'spaces',
        '0123456789': 'numbers',
        'bcdfghjklmnpqrstvwxyz': 'consonants'
    }
    const keys = {}
    Object.keys(legend).forEach((chars) => {
        const category = legend[chars]
        for(const c of chars){
            keys[c] = category
        }
    })
    for(const c of text.toLowerCase()){
        if (!keys[c]) result['specialCharacters'] += 1
        else result[keys[c]] += 1
    }
    return result
};

const questionFour = function questionFour(num1, num2, num3) {
    let result
    if (num2 === 0) result = (num1/(num3*12)).toFixed(2)
    else {
        const PV = num1;
        const i = (num2 / 100) / 12;
        const n = num3 * 12;
        const PVi = PV * i;
        const fraction = 1 - (1 / Math.pow(1+i, n));
        result = (PVi/fraction).toFixed(2)
    }
    return +result
};

// TODO: fix 1 being prime and assign any characters not in list to special characters.
module.exports = {
    firstName: "Max", 
    lastName: "Shi", 
    studentId: "10439248",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};