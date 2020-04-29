/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let request = new XMLHttpRequest();
    request.withCredentials = true;
    try {
        if (options.method === 'GET') {
            let url = `${options.url}?mail=${options.data.email}?password=${options.data.password}`;
            request.open('GET', url);
            request.send();
        } else {
            let formData = new FormData();
            formData.append('mail', `${options.data.email}`);
            formData.append('password', `${options.data.password}`);
            request.open(`${options.method}`, `${options.url}`);
            request.send(formData);
        };
        request.onreadystatechange = function() {
            if(request.readyState === 4 && request.status === 200) {
                options.callback(null, request.response);
            } else {
                options.callback(request.statusText, null);
            }
        };
    }
    catch ( e ) {
        options.callback( e );
    };
};

