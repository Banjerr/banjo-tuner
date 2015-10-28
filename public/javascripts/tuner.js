
  var sets = {
    sawmill: {
      tin: "sawmill_tuning/tin.wav",
      leg: "sawmill_tuning/leg.wav",
      hat: "sawmill_tuning/hat.wav",
      bass: "sawmill_tuning/bass.wav",
      ditty: "sawmill_tuning/ditty.wav",
    },
    meadowlands: {
      tin: "meadowlands_tuning/basses.wav",
      leg: "meadowlands_tuning/dittys.wav",
      hat: "meadowlands_tuning/legs.wav",
      bass: "meadowlands_tuning/tins.wav",
      ditty: "meadowlands_tuning/hats.wav",
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

  $('body').on('change', '#options', function() {
    var set = $(this).val();
    loadSet(sets[set])
  })

  $('body').on('change', '#options', function(){
    if($('#options').val() === 'meadowlands'){
      $('#pad1').text('d');
      $('#pad2').text('C');
      $('#pad3').text('G');
      $('#pad4').text('C');
      $('#pad5').text('g');
    };
  })

  $('body').on('click', '#sp div', function() {
    if(this.buffer) {
      this.play();
    }
  });

  // deafult
  loadSet(sets['sawmill'])
