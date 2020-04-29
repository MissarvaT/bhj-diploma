/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    return createRequest ({
      url: this.HOST + this.URL,
      data,
      responseType :'json',
      method: 'GET',
      callback
    })
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create ( data, callback = f => f ) {
    const dataCopy = Object.assign({}, data);
    dataCopy._method = 'PUT';
    return createRequest({
      url: this.HOST + this.URL,
      dataCopy,
      responseType: 'json',
      method: 'POST',
      callback
    })
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    data.id = id;
    return createRequest({
      url: this.HOST + this.URL,
      dataCopy,
      responseType: 'json',
      method: 'GET',
      callback
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    const dataCopy = Object.assign({}, data);
    dataCopy.id = id;
    dataCopy._method = 'DELETE';
    return createRequest({
      url: this.HOST + this.URL,
      dataCopy,
      responseType: 'json',
      method: 'POST',
      callback
    });
  }
}

Entity.HOST = 'https://bhj-diplom.letsdocode.ru';
Entity.URL = '';
