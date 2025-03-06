import ModalEdit from './modalEdit'; // создание тикета
import ModalDelete from './modalDelete' // удаление тикета
import { formatDate } from './date'; // формирование даты
import { loadTickets, deleteTicket, updateById } from './loadTickets'; // работа с сервером

// Создаём экземпляры модального окна
const modalEdit = new ModalEdit();
const modalDelete = new ModalDelete();

const container = document.querySelector('.tickets-container');
container.innerHTML = '';

/* ****************************************** */
// Удаляем тикет из сервера.
// Назначаем обработчики для кнопок "OK" и "Cancel"
modalDelete.onOk(() => {
    // удаляем тикет из сервера.
    deleteTicket(modalDelete.ticketElement.id)
    // ищем родителя и удаляем его.
    const parentDelete = modalDelete.windowTarget.parentNode.parentNode.parentNode;
    parentDelete.remove();
});

modalDelete.onCancel(() => {
    console.log('Отмена!');
});
/* ****************************************** */
// Обработчик для кнопки "Добавить тикет"
document.querySelector('.add-ticket-btn').addEventListener('click', () => {
    /* Добавление тикета. Данные о тикете не нужны; данные о элементе
    не нужны; метод - добавление тикета. */
    const ticket = {
        id: "",
        name: "",
        description: "",
        status: "",
        created: ""
    }
    let eventElement = undefined;
    modalEdit.open(ticket, eventElement, "add");
});
      
export async function loadTicketsWindow() {
    const ticket = await loadTickets();
    let i = 0;

    for(i=0; i<ticket.length; i++) {
        let currentTicket = ticket[i];

        const ticketElement = document.createElement('div');
        ticketElement.className = 'ticket';

        const ticketHeader = document.createElement('div');
        ticketHeader.className = 'ticket-header';

        const ticketNoticeTitle = document.createElement('div');
        ticketNoticeTitle.className = 'notice-title';
        ticketHeader.appendChild(ticketNoticeTitle);
        // проверка статуса тикета
        const ticketNotice = document.createElement('div');
        ticketNotice.className = 'ticket-notice';
        if (currentTicket.status === 'true') {
            ticketNotice.className = 'ticket-notice active';;
        }
        ticketNoticeTitle.appendChild(ticketNotice);

        ticketNotice.addEventListener('click', (event) => {
            event.stopPropagation();
            ticketNotice.classList.toggle('active');
            if (ticketNotice.classList.contains('active')) {
                currentTicket.status = 'true'
            } else {
                currentTicket.status = 'false';
            }
            updateById(currentTicket.id, currentTicket);
        });
        // внесение заголовка тикета
        const title = document.createElement('h3');
        title.textContent = currentTicket.name;
        ticketNoticeTitle.appendChild(title);

        const dateAndWrite = document.createElement('div');
        dateAndWrite.className = 'date-write';

        const date = document.createElement('div');
        date.className = 'date';
        date.textContent = formatDate(currentTicket.created);
        dateAndWrite.appendChild(date);

        const ticketRead = document.createElement('div');
        ticketRead.className = 'ticket-read';        
        dateAndWrite.appendChild(ticketRead);

        const ticketDelete = document.createElement('div');
        ticketDelete.className = 'ticket-delete';
        dateAndWrite.appendChild(ticketDelete);

        // Обработчик для кнопки удаления
        ticketDelete.addEventListener('click', (e) => {
            e.stopPropagation();
            const eTarget = e.target;
            modalDelete.open(currentTicket, eTarget);
        });
        
        // Обработчик для кнопки редактирования
        ticketRead.addEventListener('click', (e) => {
            e.stopPropagation();
            const eTarget = e.target;
            modalEdit.open(currentTicket, eTarget, "write");
        });

        ticketHeader.appendChild(dateAndWrite);
        ticketElement.appendChild(ticketHeader);

        if (currentTicket.description) {
            const description = document.createElement('div');
            description.className = 'description';
            description.textContent = currentTicket.description;
            ticketElement.appendChild(description);
        }

        ticketElement.addEventListener('click', () => {
            const desc = ticketElement.querySelector('.description');
            if (desc) {
            desc.style.display = desc.style.display === 'block' ? 'none' : 'block';
            }
        });

        container.appendChild(ticketElement);
    }
}

// Загружаем тикеты при загрузке страницы
window.onload = loadTicketsWindow;