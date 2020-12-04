function startGame() {
  // starting a new game

  let playerName: String = 'Audrey';
  logPlayer(playerName);

  var messageElemenet = document.getElementById('messages');
  messageElemenet!.innerText = 'Welcome to MultiMath! Starting a new game...';
}

function logPlayer(name) {
  console.log(`New game starting for player ${name}.`);
}

document.getElementById('startGame')!.addEventListener('click', startGame);
