const loginForm = document.querySelector('.form--login');
const updateDataForm = document.querySelector('.form-user-data');
const passwordForm = document.querySelector('.form-user-settings');
console.log('index');
const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) {
        el.parentElement.removeChild(el);
    }
};
showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
};

const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'api/v1/users/login',
            data: {
                email,
                password,
            },
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
};
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});

logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'api/v1/users/logout',
        });
        if (res.data.status === 'success') location.reload(true);
    } catch (error) {
        showAlert('error', 'Error logging out!,try again');
    }
};

const logoutBtn = document.querySelector('.logout');

logoutBtn?.addEventListener('click', logout);

updateDataForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form);
});
passwordForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    updateSettings({ email, password }, 'password');
});
updateSettings = async (data, type) => {
    try {
        const path = type === 'password' ? 'updateMyPassword' : 'updateMe';
        const res = await axios({
            method: 'PATCH',
            url: `api/v1/users/${path}`,
            data,
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Successfully updated!');
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
};
