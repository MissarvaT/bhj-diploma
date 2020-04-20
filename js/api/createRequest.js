/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const request = new XMLHttpRequest();
    request.withCredentials = true;
    try {
        if (options.method === 'GET') {
            let url = `${options.url}?mail=${options.data.mail}?password=${options.data.password}`;
            request.open('GET', url);
            request.send();
        } else {
            const formData = new FormData();
            formData.append('mail', `${options.data.mail}`);
            formData.append('password', `${options.data.password}`);
            request.open(`${options.method}`, `${options.url}`);
            request.send(formData);
        };
        options.callback(err, response);
    }
    catch ( e ) {
        options.callback( err );
    };
};
