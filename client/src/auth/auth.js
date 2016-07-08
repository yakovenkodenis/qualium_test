import { sha224 } from 'js-sha256';


export default {

    authenticate(name, email, password) {
        return new Promise((resolve, reject) => {
            localStorage.name = name;
            localStorage.email = email;
            localStorage.password = sha224(password);
            localStorage.token = sha224(
                `${localStorage.name}${localStorage.email}${localStorage.password}`
            );

            if (localStorage.name && localStorage.email &&
                localStorage.password && localStorage.token)
                resolve(localStorage.token);
            else reject();
        });
    },

    getToken() {
        return localStorage.token;
    },

    getName() {
        return localStorage.name;
    },

    getEmail() {
        return localStorage.email;
    },

    logout() {
        return new Promise((resolve, reject) => {
            delete localStorage.token;
            delete localStorage.name;
            delete localStorage.email;
            delete localStorage.password;

            if (!localStorage.token) resolve();
            else reject();
        });
    },

    loggedIn() {
        const token = sha224(`${localStorage.name}${localStorage.email}${localStorage.password}`);
        return token === localStorage.token;
    }
}
