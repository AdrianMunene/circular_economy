let token = document.cookie.split(';')[1]

let loginButton = document.getElementById('logout');

if (!token) {
    loginButton.value = 'Login';
    loginButton.addEventListener('click', () => {
        window.location.href = '/login'
    });
} else {
    loginButton.value = 'Logout';
    loginButton.addEventListener('click', () => {
        window.location.href = '/logout';
    });
};

