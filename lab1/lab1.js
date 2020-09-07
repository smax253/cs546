const questionOne = function questionOne(arr) {
    const result = {};
    arr && arr.forEach((number) => {
        for(let i = 2; i<number/2; i++){
            if (number % i == 0) {
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
        '|`~@#$%^&*=+_\\<>{}': 'specialCharacters',
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
        result[keys[c]] += 1
    }
    return result
};

const questionFour = function questionFour(num1, num2, num3) {
    const PV = num1;
    const i = (num2 / 100) / 12;
    const n = num3 * 12;
    const PVi = PV * i;
    const fraction = 1 - (1 / Math.pow(1+i, n));
    return (PVi/fraction).toFixed(2);
};

module.exports = {
    firstName: "Max", 
    lastName: "Shi", 
    studentId: "10439248",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};