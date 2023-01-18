const showErrorMessage = (errorMessage) => {
  const messageElement = document.createElement('div');

  messageElement.style.zIndex = 1000;
  messageElement.style.position = 'absolute';
  messageElement.style.top = '252px';
  messageElement.style.right = '50%';
  messageElement.style.transform = 'translateX(50%)';
  messageElement.style.width = '700px';
  messageElement.style.padding = '18px';
  messageElement.style.textAlign = 'center';
  messageElement.style.fontSize = '18px';
  messageElement.style.color = '#ffffff';
  messageElement.style.textTransform = 'uppercase';
  messageElement.style.borderRadius = '8px';
  messageElement.style.backgroundColor = '#ff5533';

  messageElement.textContent = errorMessage;

  document.body.append(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, 10000);
};

export {showErrorMessage}
