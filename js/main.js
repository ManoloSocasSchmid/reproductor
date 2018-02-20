var videos = ['video1.mp4','music1.mp3','burbuja.mp4','music2.mp3','musica.mp4','music3.mp3'];

var posicion = 0;

function loadElements (){
  var play = document.getElementById("player");
  play.src = "multimedia/"+videos[posicion];
  play.play();
  play.volume = 0.5;
  crearLista();
}

$(document).ready(function(){
  $('#screen').attr('hidden',true)
  $('#player').on('ended',reproduceNext);
  $('.playPause').on('click',play);
  $('.for').on('click',forward);
  $('.back').on('click',backwards);
  loadElements();
});

function crearLista(){
  for (var i = 0; i < videos.length; i++) {
    var name = videos[i].split('.');
    var elemento = $("<div class='elementosLista' onclick='change("+i+")'> "+name[0]+"<div>")
    if(i==0){
      elemento.addClass('actual');
    }
    else{
      elemento.addClass('noActual');
    }
    $('.mmlist').first().append(elemento)
  }
}

function play(){
  var play = document.getElementById("player");
  if(play.paused == true ){
    play.play();
  }
  else{
    play.pause();
  }
}

function forward(){
  var play = document.getElementById("player");
  play.currentTime += 10;
}

function backwards(){
  var play = document.getElementById("player");
  play.currentTime -= 10;
}

function reproduceNext(){
  if(posicion < videos.length-1){
      posicion ++;
  }
  else{
    posicion = 0;
  }
  var play = document.getElementById("player");
  play.src = "multimedia/"+videos[posicion];
  cambiar();
  comprobar();
  play.play();
}

function comprobar(){
    var play = document.getElementById('player')
    var split = play.src.split('.');
    if(split[1] == 'mp3'){
      $('#screen').attr('hidden',false);
      $('#player').attr('hidden',true)
    }
    else{
      $('#screen').attr('hidden',true);
      $('#player').attr('hidden',false)
    }
}

function cambiar(){
  $('.actual').first().addClass('noActual');
  $('.actual').first().removeClass('actual');
  $(".elementosLista:nth-child(0n+"+(parseInt(posicion)+parseInt(2))+")").removeClass('noActual');
  $(".elementosLista:nth-child(0n+"+(parseInt(posicion)+parseInt(2))+")").addClass('actual');
}

function change(number){
  posicion = parseInt(number)-1;
  reproduceNext();
}
