let online = true;

// define sample files
const files = [
  "pack-1/c.mp3", "pack-1/d.mp3", "pack-1/e.mp3", "pack-1/f.mp3", "pack-1/gsharp.mp3"
];
let sounds = Array(files.length);


// P5.js sound analyzer 
// visualization uses this
let fft;
// visualization parameters
let spectrum, energy, size;


// playing with keyboard
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  var username = localStorage.getItem('username');
  if (username && username.length > 2) {
    $(".alert").html("");
    if (online == true) {
      switch (keyName) {
        case '1':
          socket.emit("send-data", { "sample": 0 , "username": username});
          break;
        case '2':
          socket.emit("send-data", { "sample": 1 , "username": username});
          break;
        case '3':
          socket.emit("send-data", { "sample": 2 , "username": username});
          break;
        case '4':
          socket.emit("send-data", { "sample": 3 , "username": username});
          break;
        case '5':
          socket.emit("send-data", { "sample": 4 , "username": username});
          break;
      }
    } else {
      // if connection to server is not established, we just play sounds locally
      switch (keyName) {
        case '1':
          playSample(0);
          break;
        case '2':
          playSample(1);
          break;
        case '3':
          playSample(2);
          break;
        case '4':
          playSample(3);
          break;
        case '5':
          playSample(4);
          break;
      }
    }
  }
  else {
    $(".alert").html("Palun kirjuta oma nimi");
  }
});

// playing with touch

const keys = document.querySelectorAll(".key");

keys.forEach((key, idx) => {
  key.addEventListener('click', () => {
    var username = localStorage.getItem('username');
    if (username && username.length > 2) {
      $(".alert").html("");
      socket.emit("send-data", { "sample": idx, "username": localStorage.getItem('username') });
    } else {
      $(".alert").html("Palun kirjuta oma nimi");
    }
  });
});



function recieveData(data) {
  console.log(data);
  // playSample(data.sample);
}


// play sample file
function playSample(s) {
  sounds[s].play();
}


// preload music sample files and add them to sounds array
function preloadSampleFiles() {
  soundFormats('mp3', 'ogg');
  for (let i = 0; i < files.length; ++i) {
    sounds[i] = loadSound("./samples/" + files[i]);
  }
}


/*
function setup() {
  createCanvas(windowWidth, windowHeight*0.8)
  
  // https://p5js.org/reference/#/p5.FFT
  fft = new p5.FFT();
  fft.smooth();

  preloadSampleFiles();
}



// visualization
function draw() {
  blendMode(BLEND);
  background(10,5,20);
  blendMode(LIGHTEST);
  noFill();

  spectrum = fft.analyze(); 
  energy = fft.getEnergy(100, 255);
  size = map(energy, 0, 255, energy*0.2, windowHeight*0.8);

  stroke('hsla(0, 80%, 100%, 0.5)');
  strokeWeight(size*0.05);
  circle(windowWidth*0.5, windowHeight*0.4, size);
}
*/

// helper functions
// allows browser to play sounds
function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
// handles browser resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.8, false);
}