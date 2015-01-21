
  var sets = {
    sawmill: {
      tin: "sawmill_tuning/tin.wav",
      leg: "sawmill_tuning/leg.wav",
      hat: "sawmill_tuning/hat.wav",
      bass: "sawmill_tuning/bass.wav",
      ditty: "sawmill_tuning/ditty.wav",
    },
    meadowlands: {
      tin: "meadowlands_tuning/tins.wav",
      leg: "meadowlands_tuning/legs.wav",
      hat: "meadowlands_tuning/hats.wav",
      bass: "meadowlands_tuning/basses.wav",
      ditty: "meadowlands_tuning/tins.wav",
    }
  }

  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();

  function loadAudio(object, url) {
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

  function addAudioProperties(object) {
    loadAudio(object, $(object).attr('data-sound'));;
    object.play = function () {
      var s = context.createBufferSource();
      s.buffer = object.buffer;
      s.connect(context.destination);
      s.start(0);
    }
  }

  function loadSet(set) {
    $('#sp div').each(function(i) {
      $(this).attr('data-sound', set[Object.keys(set)[i]])
      addAudioProperties(this);
    });
  }

  $('#options').on('change', function() {
    var set = $(this).val();
    loadSet(sets[set])
  })

  $('#sp div').click(function() {
    if(this.buffer) {
      this.play();
    }
  });

  // deafult
  loadSet(sets['sawmill'])
