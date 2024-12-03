const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

function validateEmail(email) {
    return emailRegex.test(email);
}

function validatePassword(password) {
    return passwordRegex.test(password);
}

module.exports = {
    validateEmail,
    validatePassword
};