/**
 * a collection of methods for validating fields
 */
let Validator = {};

// Checks if the string is a valid email address.
Validator.validateEmail = (email) => {
    let regexp = /(^\w[\w\-.+]{1,19})@([\w.!$%&’*+/=?^\- ]{1,15})\.([a-z]{1,5}$)/i;
    return email.match(regexp) !== null;
}

// Checks if the phone number is valid.
Validator.validatePhone = (phone) => {
    let regexp = /^([\s\-]*)(\+?\d{0,2}[\s\-]*)([(\d\s\-)]{3,})([\d\s\-]{7,25})$/;
    return phone.match(regexp) !== null;
}

//Checks if the password is valid.
Validator.validatePassword = (password) => {
    let regexp = /^(?=\w*[a-z])(?=\w*[A-Z])(?=\w*\d)\w{8,}$/;
    return password.match(regexp) !== null;
}

// Tests.
let mails = [
    'fi@secondpart.end',
    'first-part@.se=cond%p.art.end',
    'first.part@se=cond%part.r',
    'f@secondart.end,',
    'first-part@.se=cond@part.end',
    '-firstpart@.se=cond%.enddeded',
    'firs_tpart@.se.en',
];
console.log('Mail validation:')
for (let i = 0; i < mails.length; i++) {
    console.log(Validator.validateEmail(mails[i]));
}

let phones = [
    '+38 (099) 567 8901',
    '+38 099 5 6 7 8 9  01',
    '(09-9) 567-890-1',
    '+38 (099) 567 8901 0',
    '+38 099 a0000000',
    '+38 (0989) 567 8901',
    '+48 (0989) 567 8901',
];
console.log('Phone validation:')
for (let i = 0; i < phones.length; i++) {
    console.log(Validator.validatePhone(phones[i]));
}

let passwords = [
    'C00l_Pass',
    'SupperPas1',
    'Cool_pass',
    'C00l'
]
console.log('Password validation: ');
for (let i = 0; i < passwords.length; i++) {
    console.log(Validator.validatePassword(passwords[i]));
}
