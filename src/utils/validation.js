//password validation
const passwordCond1 = /^(?=.*[a-z]).{6,20}$/;
const passwordCond2 = /^(?=.*[A-Z]).{6,20}$/;
const passwordCond3 = /^(?=.*[0-9]).{6,20}$/;
const emailCond = /\S+@\S+\.\S+/;
const decimalCond = /^[-+]?[0-9]+\.[0-9]+$/;

export {
    passwordCond1,
    passwordCond2,
    passwordCond3,
    emailCond,
    decimalCond
}