import { createTickets } from './modalEditWrite';
import { createTicket, updateById } from './loadTickets'; // работа с сервером
import { loadTicketsWindow } from './app';

export default class ModalEdit {
  constructor() {
        // массив
        this._ticketElement = [];
        // дочерний элемент
        this.windowTarget = undefined;
        // редактирование или добавление тикета
        this.addWriteTicket = undefined;
    }

  windowCreate () {
    return new Promise((resolve) => {
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
        modalTitle.textContent = 'Изменить тикет';
        modalContent.appendChild(modalTitle);

        const modalText1 = document.createElement('p');
        modalText1.textContent = 'Краткое описание';
        modalContent.appendChild(modalText1);
        
        const modalText2 = document.createElement('textarea');
        modalText2.className = 'confirm-textarea-title';
        modalContent.appendChild(modalText2);
        // загрузка заголовка в окно для редактирования.
        // Если требуется обновление тикета
        if (this.addWriteTicket === 'write') {
            modalText2.value = this._ticketElement.name;
        }
        // функция для занесения заголовка в массив при потере фокуса окном.
        modalText2.addEventListener('blur', () => {
            this._ticketElement.name = modalText2.value;
        });

        const modalText3 = document.createElement('p');
        modalText3.textContent = 'Подробное описание';
        modalContent.appendChild(modalText3);

        const modalText4 = document.createElement('textarea');
        modalText4.className = 'confirm-textarea';
        modalContent.appendChild(modalText4);
        // Если требуется обновление тикета
        if (this.addWriteTicket === 'write') {
            modalText4.value = this._ticketElement.description;
        }

        // Кнопки "OK" и "Cancel"
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'modal-buttons';

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Отмена';
        cancelButton.className = 'cancel-edit';
        buttonsContainer.appendChild(cancelButton);

        const okButton = document.createElement('button');
        okButton.textContent = 'Ок';
        okButton.className = 'confirm-edit';
        buttonsContainer.appendChild(okButton);

        modalContent.appendChild(buttonsContainer);
        this.modal.appendChild(modalContent);
        document.body.appendChild(this.modal);

        okButton.addEventListener('click', () => {
            
                this._ticketElement.description = modalText4.value;
            
            if (this.addWriteTicket === "add") {
                // создание тикета
                createTicket(this._ticketElement);
                // Закрыть окно
                this.close();
            } else {
                // создание тикета
                updateById(this._ticketElement.id, this._ticketElement);
                // Закрыть окно
                this.close();
            }
            location.reload();
        });

        cancelButton.addEventListener('click', () => {
            this.close();
        });
        resolve(); // Разрешаем Promise, когда модальное окно готово
    });
  }
  // Метод для открытия модального окна
  async open(ticket, e, value) {
    this._ticketElement = ticket;
    this.windowTarget = e;
    this.addWriteTicket = value;
    await this.windowCreate(); // Ожидаем завершения создания модального окна
    this.modal.style.display = 'flex';
    window.onload = loadTicketsWindow;
  }

  // Метод для закрытия модального окна
  close() {
      this.modal.style.display = 'none';
  }
}