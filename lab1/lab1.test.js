const lab1 = require('./lab1')

console.log(lab1.questionOne([4, 1, 6])); 
// {1: false, 4: false, 6: false} 

console.log(lab1.questionOne([32])); 
// {32: false} 

console.log(lab1.questionOne([416, 113, 973])); 
// {113: true, 416: false, 973: false}

console.log(lab1.questionOne([2, 7, 9, 1013])); 
// {2: true, 7: true, 9: false, 1013: true}

console.log(lab1.questionOne([])); 
// {}

console.log(lab1.questionOne()); 
// {}

console.log(lab1.questionTwo([5, 3, 10, 14])); 
//35937000

console.log(lab1.questionTwo([5])); 
// 15625 

console.log(lab1.questionTwo([123,3,21])); 
// 3781104949539

console.log(lab1.questionTwo([2, 9, 10])); 
// 6331625

console.log(lab1.questionTwo([])); 
// 0

console.log(lab1.questionThree("this is an example sentence !!!")); 
// {consonants: 14, vowels: 9, numbers: 0, spaces: 5, punctuation: 3, specialCharacters: 0}

console.log(lab1.questionThree("h0\\/\\/ do yo|_| |Ik3 these speci@l ch@r@cterZ"));
// {consonants: 18, vowels: 8, numbers: 2, spaces: 6, punctuation: 2, specialCharacters: 9}


console.log(lab1.questionThree("Fragile huntress main gets obliterated by monsoon on this sunny labor day."));
// {consonants: 40, vowels: 22, numbers: 0, spaces: 11, punctuation: 1, specialCharacters: 0}


console.log(lab1.questionThree("No.")); 
// {consonants: 1, vowels: 1, numbers: 0, spaces: 0, punctuation: 1, specialCharacters: 0}

console.log(lab1.questionThree("")); 
// {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}

console.log(lab1.questionFour(25000, 10, 5)); 
//531.18

console.log(lab1.questionFour(43987, 5, 6)); 
//708.41

console.log(lab1.questionFour(12331, 7, 3)); 
//380.75

console.log(lab1.questionFour(60583, 2, 6)); 
//893.63

console.log(lab1.questionFour(43565, 4.5, 2)); 
//1901.52