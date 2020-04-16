/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (element == null) {
      alert('Ошибка! Элемент не найден');
      this.element = element;
      this.registerEvents();
    }
  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.addEventListener('submit', e => {
      e.preventDefault();
      this.submit();
    })
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const data = {},
    formData = new FormData(this),
    entries = formData.entries();
      for (let entry of entries) {
        const key = entry[ 0 ],
        value = entry[ 1 ];
        data[key] = value;
      };
      return data;
    };
  

  onSubmit( options ) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    const newData = {},
    data = this.getData(),
    url = this.getAttribute('action'),
    method = this.getAttribute('method');
    newData.url = url,
    newData.method = method,
    newData.data = data;
    this.onSubmit(newData);
    }
}
