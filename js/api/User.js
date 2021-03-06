/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user == undefined) {
      return undefined;
    } else {
    return JSON.parse(localStorage.user);
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    createRequest({
      url: this.HOST + this.URL + '/current',
      data,
      responseType: 'json',
      method: 'GET',
      callback: (err, response) => {
        if (response && response.user) {
          User.setCurrent(response.user);
        } else {
          User.unsetCurrent();
        };
        callback(err, response);
      }
    });
  
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    createRequest({
      url: this.HOST + this.URL + '/login',
      data,
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        if (response && response.user) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    createRequest({
      url: this.HOST + this.URL + '/register',
      data,
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        if (response && response.user) {
          User.setCurrent(response.user);
        } 
        callback(err, response);
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {  
    createRequest({
      url: this.HOST + this.URL + '/logout',
      data,
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        if (response && response.user) {
          User.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }
}

User.HOST = 'https://bhj-diplom.letsdocode.ru';
User.URL = '/user';
