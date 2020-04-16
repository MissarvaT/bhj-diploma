/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */

class RegisterForm extends  AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  
  onSubmit( options ) {
    User.register();
    if (response.success) {
      this.reset();
      App.setState( 'user-logged' );
      Modal.close();
    } else {
      alert ('Ошибка при регистрации');
    }
  }
}
