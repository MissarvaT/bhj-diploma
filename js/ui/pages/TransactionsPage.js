/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (element == null) {
      alert('Элемент не найден!');
    } else {
      this.element = element;
      this.registerEvents();
    }

  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render();
    if (options) {
      this.render(options);
    }

  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const accountRemoveButton = this.element.querySelector('.remove-account');
    accountRemoveButton.addEventListener('click', () => {
      this.removeAccount();
    });
    const transactionRemoveButton = this.element.querySelector('.transaction__remove');
    if (transactionRemoveButton != null) {
    transactionRemoveButton.addEventListener('click', (e) => {
      this.removeTransaction(e.target.dataset.id);
    });}
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions == null) {
      return;
    };
    Account.remove(this.dataset.id, data, (err, response) => {
      if (response.sucess) {
        alert ('Вы действительно хотите удалить счет?');
        App.update();
      }
    } );
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    Transaction.remove(id, data, (err, response) => {
      if (response.success) {
        alert('Вы действительно хотите удалить транзакцию?')
        App.update();
      } else {
        response.data;
      }
    })
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (options == null) {
      console.error('Ошибка');
    };
    this.lastOptions = options;
    Account.get( options.account_id , {}, (err, response) => {
      if (response.success) {
        this.renderTitle();
      } 
    });
    Transaction.list(options, (err, response) => {
      if (response.sucess) {
        TransactionsPage.renderTransactions(response.data);
      }
    })

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счета');
    delete this.lastOptions;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    const accountTitle = document.querySelector('.content-title');
    accountTitle.innerHTML = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    const newDate = new Date(date);
    const dateString = newDate.toLocaleString('ru', {day: 'numeric', month: 'long', year: 'numeric'});
    const time = newDate.toLocaleString('ru', {hour: 'numeric', minute: 'numeric'});
    return `${dateString} в ${time}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    const date = formatDate(item.date);
    return `<div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${date}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
          ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    let html;
    for (let i = 0; i < data.length; i++) {
      html += getTransactionHTML ( data[i] );
    };
    const accountsContent = document.querySelector('.content');
    accountsContent.innerHTML = html;
  }
}
