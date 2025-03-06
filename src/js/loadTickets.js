// работа с сервером
let tickets = [];
// Функция для загрузки тикетов
export async function loadTickets() {
    try {
        const response = await fetch('http://localhost:9000/?method=allTickets');
        if (!response.ok) {
            throw new Error('Ошибка при загрузке тикетов');
        }
        
        tickets = await response.json();
        return tickets;
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось загрузить тикеты');
    }
}

// удаление тикета.
export async function deleteTicket(ticketId) {
    try {
      const response = await fetch(`http://localhost:9000/?method=deleteById&id=${ticketId}`, {
        method: 'DELETE', // Используем метод DELETE
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при удалении тикета');
      }
  
      console.log('Тикет удалён');
    } catch (error) {
      console.error('Ошибка:', error.message);
      throw error;
    }
  }

  // добавление тикета.
// добавление тикета.
export async function createTicket(ticketData) {
    try {
      const response = await fetch('http://localhost:9000/?method=createTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при отправке тикета');
      }
  
      const result = await response.json();
      console.log('Результат:', result);
      return result;
    } catch (error) {
      console.error('Ошибка:', error.message);
      throw error;
    }
}
    
/*// редактирование тикета.
export async function updateById(ticketId) {
    try {
      const response = await fetch(`http://localhost:9000/?method=updateById&id=${ticketId}`, {
        method: 'POST', // Используем метод POST
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при обновлении тикета!');
      }
  
      console.log('Тикет обновлён!');
    } catch (error) {
      console.error('Ошибка:', error.message);
      throw error;
    }
  */
 // Редактирование тикета
export async function updateById(ticketId, updatedData) {
    try {
      const response = await fetch(`http://localhost:9000/?method=updateById&id=${ticketId}`, {
        method: 'POST', // Используем метод POST
        headers: {
          'Content-Type': 'application/json', // Указываем, что отправляем JSON
        },
        body: JSON.stringify(updatedData), // Передаём обновлённые данные
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при обновлении тикета!');
      }
  
      const data = await response.json(); // Парсим JSON-ответ
      console.log('Тикет обновлён:', data);
    } catch (error) {
      console.error('Ошибка:', error.message);
      throw error; // Пробрасываем ошибку для обработки в вызывающем коде
    }
  }