//Step 1
var context;
function initContext() {
  try {
    context = new webkitAudioContext();
    alert("context created"); //test
  }
  catch(e) {
    alert('Sorry, your browser does not support the Web Audio API.');
  }
}

//Step 2
var myAudioBuffer = null;

//Steps 3 and 4
var url = "http://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2014/08/1407409274kick.wav";
function loadSound(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  // . . . step 3 code above this line, step 4 code below
  request.onload = function() {
    alert("sound loaded"); //test
    context.decodeAudioData(request.response, function(buffer) {
      myAudioBuffer = buffer;
      alert("sound decoded"); //test
    });
  }
  request.send();
}

//Step 5
var source = null;
function playSound(anybuffer) {
  source = context.createBufferSource();
  source.buffer = anybuffer;
  source.connect(context.destination);
  source.start();
  //source.noteOn(0); //see note in Step 6 text
}

//Step 6
function stopSound() {
  if (source) {
    source.stop();
    //source.noteOff(0); //see note in Step 6 text
  }
}

initContext();
loadSound("http://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2014/08/1407409274kick.wav");
