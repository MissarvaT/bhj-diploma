/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let request = new XMLHttpRequest();
    request.withCredentials = true;
    try {
        if (options.method === 'GET') {
            options.url += '?';
            for (let option in options.data) {
                options.url += `${option}=${options.data[option]}&`;
            };
        } else {
            let formData = new FormData();
            for (let option in options.data) {
                formData.append(option, options.data[option]);
            };
        };
        request.onreadystatechange = function() {
            if(request.readyState === 4 && request.status === 200) {
                options.callback(null, request.response);
            } else {
                options.callback(request.statusText, null);
            }
        };
        request.open(`${options.method}`, options.url);
        request.send(formData);
    }
    catch ( e ) {
        options.callback( e );
    };
    return request;
};

