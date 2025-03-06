import { deleteTicket } from './loadTickets'; // функция удаление тикета.

export default class Modal {
  constructor() {
      this.ticketElement = [];
      this.windowTarget = undefined;

      // Создаем модальное окно
      this.modal = document.createElement('div');
      this.modal.className = 'modalOkCancel';
      this.modal.style.display = 'none'; // Скрываем модальное окно по умолчанию
      // Привязываем контекст this к функции open
      this.open = this.open.bind(this);

      // Создаем содержимое модального окна
      const modalContent = document.createElement('div');
      modalContent.className = 'modal-content';

      const modalTitle = document.createElement('span');
      modalTitle.textContent = 'Удалить тикет';
      modalContent.appendChild(modalTitle);

      const modalText = document.createElement('p');
      modalText.textContent = 'Вы уверены, что хотите удалить тикет? Это действие необратимо.';
      modalContent.appendChild(modalText);

      // Кнопки "OK" и "Cancel"
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'modal-buttons';

      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Отмена';
      cancelButton.className = 'cancel-delete';
      buttonsContainer.appendChild(cancelButton);

      const okButton = document.createElement('button');
      okButton.textContent = 'Ок';
      okButton.className = 'confirm-delete';
      buttonsContainer.appendChild(okButton);

      modalContent.appendChild(buttonsContainer);
      this.modal.appendChild(modalContent);
      document.body.appendChild(this.modal);

      // Обработчики для кнопок
      this.okHandler = null;
      this.cancelHandler = null;

      okButton.addEventListener('click', () => {
          if (this.okHandler) {
              this.okHandler();
          }
          this.close();
      });

      cancelButton.addEventListener('click', () => {
          if (this.cancelHandler) {
              this.cancelHandler();
          }
          this.close();
      });
  }

    // Метод для открытия модального окна
    open(ticket, e) {
        this.ticketElement = ticket;
        this.windowTarget = e;
        this.modal.style.display = 'flex';
    }

    // Метод для закрытия модального окна
    close() {
        this.modal.style.display = 'none';
    }

    // Метод для назначения обработчика на кнопку "OK"
    onOk(handler) {
        this.okHandler = handler;
    }

    // Метод для назначения обработчика на кнопку "Cancel"
    onCancel(handler) {
        this.cancelHandler = handler;
    }
}