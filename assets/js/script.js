document.addEventListener('DOMContentLoaded', function() {
  var terminalContainer = document.getElementById('terminal');
  var terminalText = document.getElementById('terminal-text');
  var videoBackground = document.getElementById('myVideo');
  var audioBackground = document.getElementById('myAudio');
  var blurredBox = document.getElementById('blurred-box');
  var closeButton = document.getElementById('close-button');

  var terminalTextContent = [
      "IP: Loading...",
      "Press Enter To Continue",
  ];
  var currentIndex = 0;

  videoBackground.pause();
  audioBackground.pause();

  function typeWriter() {
      var line = currentIndex === 0 ? getAsciiArt() : terminalTextContent[currentIndex - 1];
      var i = 0;

      function typeChar() {
          if (i < line.length) {
              terminalText.textContent += line.charAt(i);
              i++;
              setTimeout(typeChar, 30);
          } else {
              terminalText.textContent += "\n";
              currentIndex++;
              if (currentIndex < terminalTextContent.length + 1) {
                  typeWriter();
              } else {
                  addEventListeners();
              }
          }
      }

      typeChar();
  }

  function handleInput() {
      terminalContainer.style.display = 'none';
      videoBackground.play();
      audioBackground.play();
      blurredBox.style.display = 'block';
      removeEventListeners();
  }

  function addEventListeners() {
      document.addEventListener('keydown', handleKeyPress);
      terminalContainer.addEventListener('click', handleInput);
  }

  function removeEventListeners() {
      document.removeEventListener('keydown', handleKeyPress);
      terminalContainer.removeEventListener('click', handleInput);
  }

  function handleKeyPress(event) {
      if (event.key === 'Enter') {
          handleInput();
      }
  }

  closeButton.addEventListener('click', function() {
      handleInput();
  });

  fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
          var ipAddress = data.ip;
          terminalTextContent[0] = "IP: " + ipAddress;
          typeWriter();
      })
      .catch(error => {
          console.error('Error fetching IP address:', error);
          terminalTextContent[0] = "IP: Unable to fetch IP address";
          typeWriter();
      });

  function centerTerminal() {
      var terminalWidth = terminalContainer.offsetWidth;
      var terminalHeight = terminalContainer.offsetHeight;
      var centerX = (window.innerWidth - terminalWidth) / 2;
      var centerY = (window.innerHeight - terminalHeight) / 2;

      terminalContainer.style.position = 'absolute';
      terminalContainer.style.left = centerX + 'px';
      terminalContainer.style.top = centerY + 'px';
  }

  centerTerminal();
  window.addEventListener('resize', centerTerminal);

  terminalText.style.textAlign = 'center';

  function getAsciiArt() {
      return `
⣿⣧⣿⣿⣿⣿⡟⢸⣿⣿⣿⣿⣿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣿⣏⣿⣿
⣿⢸⣿⡏⣿⣿⣹⢸⣿⣿⣿⣿⣿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿
⣿⢼⡟⣤⣿⣧⣿⣸⣿⣿⣿⣿⣿⣿⣿⢻⣸⣿⢿⣿⣿⣿⣿⣿⣿⡇
⣿⢸⢧⣽⡼⣟⣛⣃⣿⠿⣿⣿⣿⣿⣿⢸⣏⣿⡘⣿⣿⣿⣿⡿⣿⢳
⣿⡜⣸⡿⠷⠿⢿⣿⡼⡟⣼⡿⣿⣿⡿⡼⣿⣞⣆⡄⢭⢟⣻⡇⡿⣾
⡜⣷⢻⣤⣿⡒⠄⠄⠉⣺⣿⣿⣾⣽⣇⣥⡯⠿⠾⣞⣮⣃⢻⣧⣇⣿
⣿⣮⡞⣷⣯⣗⣙⣿⣧⣣⣿⣿⣿⣿⣿⣿⣇⠟⡂⣀⣀⠉⡫⢸⣸⣿
⢿⣿⣿⣮⡻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣷⣬⣍⣎⣿⣿
⣦⣭⣟⡿⣿⣿⣝⢿⣿⣿⣿⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣜⣼⣿⣿
⠋⠄⠄⠄⠄⠉⠻⢷⣝⡿⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⣼⣿⣿⣿
⠄⠄⠄⠄⠄⠄⠄⠄⢙⢿⣮⡻⣿⣷⣿⣿⠿⣟⡯⢡⣾⣠⣿⣿⣿⣿
  `;
  }

  var audio = document.getElementById("myAudio");

  var maxVolume = 0.1;

  function limitVolume(volume) {
      if (volume > maxVolume) {
          audio.volume = maxVolume;
      } else {
          audio.volume = volume;
      }
  }

  limitVolume(0.1);
});
