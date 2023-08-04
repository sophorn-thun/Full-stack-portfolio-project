export const viewAllMessages = async () => {
  try {
    const token = sessionStorage.getItem('jwt');
    if (!token) throw new Error('No authorization token found!');

    const res = await fetch('http://127.0.0.1:3000/messages', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (!res.ok) {
      const errorData = await res.json(); 
      throw new Error(`Error ${errorData.status}: ${errorData.error}`);
    }
    
    const messages = await res.json();
    const tableBody = document.querySelector('#all-messages');
    const tableHead = document.querySelector('#table-head');

    tableBody.innerHTML = '';
    tableHead.innerHTML = '';
    
    const headerRow = document.createElement('tr');
    const nameHeader = document.createElement('th');
    const emailHeader = document.createElement('th');
    const messageHeader = document.createElement('th');

    nameHeader.textContent = 'Name';
    emailHeader.textContent = 'Email';
    messageHeader.textContent = 'Message';

    headerRow.appendChild(nameHeader);
    headerRow.appendChild(emailHeader);
    headerRow.appendChild(messageHeader);

    tableHead.appendChild(headerRow);

    messages.forEach(message => {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const emailCell = document.createElement('td');
      const messageCell = document.createElement('td');

      nameCell.textContent = message.name;
      emailCell.textContent = message.email;
      messageCell.textContent = message.message;

      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(messageCell);

      tableBody.appendChild(row);
    })
  } catch (error) {
    console.error('Error viewing all messages', error)
    alert('Error viewing all messages!')
  }
}