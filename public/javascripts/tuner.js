alert("ok!"); 

  context = new webkitAudioContext();


function loadAudio( object, url) {

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
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
