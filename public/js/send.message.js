export const postMessageHandler = async (name, email, message) => {
  try {
    const body = JSON.stringify({
      name,
      email,
      message
    });
    console.log(body);
    const res = await fetch('http://127.0.0.1:3000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        message
      })
    });

    const data = await res.json();
    const formMessageSpan = document.querySelector('#form-message');
    const formMessage = document.querySelector('#form');
    if (data.status === 'success') {
      formMessageSpan.textContent = 'Thanks for your message. I will get back to you ASAP!';
      formMessage.style.display = 'none';
      formMessageSpan.style.display = 'block';
    } else {
      formMessageSpan.textContent = 'Failed to send message!';
      formMessage.style.display = 'none';
      formMessageSpan.style.display = 'block'; 
    }
  } catch (error) {
    console.log(error);
    alert('error', "An error occurred while trying to send the message");
  }
}
