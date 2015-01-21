alert("ok!");

  context = new webkitAudioContext();


function loadAudio( object, url) {

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      console.log("changing buffer!");
      object.buffer = buffer;
    });
  }
  request.send();
}

//Step 5
function addAudioProperties(object) {
  object.name = object.id;
  object.source = $(object).data('sound');
  loadAudio(object, object.source);
  object.play = function () {
    var s = context.createBufferSource();
    s.buffer = object.buffer;
    s.connect(context.destination);
    s.start(0);
    object.s = s;
  }
}

//Step 6
function stopSound() {
  if (source) {
    source.stop();
    //source.noteOff(0); //see note in Step 6 text
  }
}

$(function() {
  $('#sp div').each(function() {
    addAudioProperties(this);
  });

  $('#sp div').click(function() {
    this.play();
  });
});

var sawmillUrls = {
  bass: "http://0.0.0.0:8080/sawmill_tuning/bass.wav",
  ditty: "http://0.0.0.0:8080/sawmill_tuning/ditty.wav",
  hat: "http://0.0.0.0:8080/sawmill_tuning/hat.wav",
  leg: "http://0.0.0.0:8080/sawmill_tuning/leg.wav",
  tin: "http://0.0.0.0:8080/sawmill_tuning/tin.wav",
}

var meadowlandsUrls = {
  bass: "http://0.0.0.0:8080/meadowlands_tuning/basses.wav",
  ditty: "http://0.0.0.0:8080/meadowlands_tuning/tins.wav",
  hat: "http://0.0.0.0:8080/meadowlands_tuning/hats.wav",
  leg: "http://0.0.0.0:8080/meadowlands_tuning/legs.wav",
  tin: "http://0.0.0.0:8080/meadowlands_tuning/tins.wav",
}

function updateAttrs() {
  loadAudio("pad1", "http://0.0.0.0:8080/meadowlands_tuning/dittys.wav");
  document.getElementById("pad1").setAttribute("data-sound", "http://0.0.0.0:8080/meadowlands_tuning/dittys.wav");
}
