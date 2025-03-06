import { formatDate } from './date';
import ModalEdit from './modalEdit';

export function createTickets() {
    // получаем последний массив, который вносился через модальное окно.
    const lastTicket = new ModalEdit();
    //console.log(lastTicket._ticketElement);
    // Контейнер для тикетов имеет id.
    const container = document.querySelector('tickets-container');

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
    lastTicket._ticketElement.status == true ? ticketNoticeTitle.classList.add('image-ticket'):
    ticketNoticeTitle.appendChild(ticketNotice);

    ticketNotice.addEventListener('click', (event) => {
        event.stopPropagation();
        ticketNotice.classList.toggle('active');
    });
    // внесение заголовка тикета
    const title = document.createElement('h3');
    title.textContent = lastTicket._ticketElement.name;
    ticketNoticeTitle.appendChild(title);

    const dateAndWrite = document.createElement('div');
    dateAndWrite.className = 'date-write';

    const date = document.createElement('div');
    date.className = 'date';
    date.textContent = formatDate(lastTicket._ticketElement.created);
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
        modalDelete.open(lastTicket._ticketElement, e.target);
    });

    // Обработчик для кнопки редактирования
    ticketRead.addEventListener('click', (e) => {
        e.stopPropagation();
        const eTarget = e.target;
        lastTicket.open(lastTicket._ticketElement, e.target, lastTicket.addWriteTicket);
    });
    

    ticketHeader.appendChild(dateAndWrite);
    ticketElement.appendChild(ticketHeader);

    if (lastTicket._ticketElement.description) {
        const description = document.createElement('div');
        description.className = 'description';
        description.textContent = lastTicket._ticketElement.description;
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