  /**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    Account.create(options);
    let newAccountForm = document.getElementById('modal-new-account');
    if (response.success) {
      newAccountForm.close();
      this.reset();
      App.update();
    } else {
      alert('Ошибка при создании нового счета')
    }
  }
  

}
