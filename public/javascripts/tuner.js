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

  var pad1 = document.getElementById("pad1");
  var pad2 = document.getElementById("pad2");
  var pad3 = document.getElementById("pad3");
  var pad4 = document.getElementById("pad4");
  var pad5 = document.getElementById("pad5");

  loadAudio(pad1, meadowlandsUrls.ditty);
  loadAudio(pad2, meadowlandsUrls.bass);
  loadAudio(pad3, meadowlandsUrls.hat);
  loadAudio(pad4, meadowlandsUrls.leg);
  loadAudio(pad5, meadowlandsUrls.tin);

  pad1.setAttribute("data-sound", meadowlandsUrls.ditty);
  pad2.setAttribute("data-sound", meadowlandsUrls.bass);
  pad3.setAttribute("data-sound", meadowlandsUrls.hat);
  pad4.setAttribute("data-sound", meadowlandsUrls.leg);
  pad5.setAttribute("data-sound", meadowlandsUrls.tin);
}
