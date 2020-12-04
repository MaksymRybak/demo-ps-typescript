function startGame() {
  // starting a new game
  var messageElemenet = document.getElementById('messages');
  messageElemenet.innerText = 'Welcome to MultiMath! Starting a new game...';
}

document.getElementById('startGame').addEventListener('click', startGame);
