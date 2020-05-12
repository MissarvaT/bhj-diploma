/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const request = new XMLHttpRequest();
    const formData = new FormData();
    request.withCredentials = true;
    request.responseType = 'json';
    console.log(options.data);
    try {
        if (options.method === 'GET') {
            options.url += '?';
            for (let option in options.data) {
                options.url += `${option}=${options.data[option]}&`;
            };
        } else {
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
        if (options.method === 'GET') {
            request.send(); 
        } else {
            request.send(formData);
        };

        return request.response;
    }
    catch ( e ) {
        options.callback( e );
    };
};

