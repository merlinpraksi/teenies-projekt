
const socket = io();

// server
socket.on('connection', userId => {
  console.log("Connection established");
});


socket.on('send-data', dataObj => {
  jss = JSON.stringify(dataObj);
  ChangeAudio(dataObj);
});

function ChangeAudio(data) {
var sample = data.sample;

// Show username
if (data.username) {
document.getElementById('username').innerHTML = "<div style='float:center;text-align:center;'>Hello "+data.username+"</div>";
} else {
document.getElementById('username').innerHTML = "<div style='float:center;text-align:center;'>Hello Arduino</div>";
}

	if (sample === 7) {
		// If sample 7 then show & remove gif 
		if ($("#santa")[0]) {
			$('.gifc').remove();
		} else {
			$(".gif").html("<div class='gifc'> <img src='/public/img/santa1.gif' width='150px;' id='santa' loop='infinite'></div>");
		}
		$('.example-left').simplemarquee('destroy');
		$(".example-left").html("Ho-ho-ho, merry christmas!");
		$(".example-left").simplemarquee('update');
	} else
	if (sample === 6) {
		// If sample 6 then show & remove snow
		if ($(".flake")[0]){
   	 	     $.snowfall.stop();
		} else {
	             $.snowfall.start({
  	                content: '<i class="fa fa-snowflake-o"></i>',
        	        size: {
                	    min: 20,
        	            max: 50
	             	}
	            });
		}
	} else {
		playMusic(sample);
	}

}



function playMusic(sample) {
if (sample === 0) {
	$(".example-left").html("Now playing: Parvepoisid - tiliseb tiliseb");
	$('.example-left').simplemarquee('destroy');
        $(".example-left").simplemarquee();
} else 
if (sample === 1) {
        $(".example-left").html("Now playing: Karavan - talve võlumaa");
	$('.example-left').simplemarquee('destroy');
        $(".example-left").simplemarquee();
} else
if (sample === 2) {
        $(".example-left").html("Now playing: Karavan - aisakell");
        $('.example-left').simplemarquee('destroy');
	$(".example-left").simplemarquee();
} else
if (sample === 3) {
        $(".example-left").html("Now playing: Getter Jaani - oh kuusepuu");
        $('.example-left').simplemarquee('destroy');
	$(".example-left").simplemarquee();
} else
if (sample === 4) {
        $(".example-left").html("Now playing: Karavan - püha öö");
        $('.example-left').simplemarquee('destroy');
	$(".example-left").simplemarquee();
} else 
if (sample === 5) {
        $(".example-left").html("Now playing: Michael Bublé - white christmas");
        $('.example-left').simplemarquee('destroy');
	$(".example-left").simplemarquee();
} 

sam = $("#audio").data("id");

if (sam === sample) {
	 $('audio').each(function(){
              this.pause(); // Stop playing
              this.currentTime = 0; // Reset time
           });
} else {
$("#audio").data("id",sample);
	var myAudio = document.getElementById('audio');
           $('audio').each(function(){
              this.pause(); // Stop playing
              this.currentTime = 0; // Reset time
           });

	audio.src = "/public/music/"+sample+".mp3";
	audio.load();
        audio.play();
	var context = new AudioContext();
    	var src = context.createMediaElementSource(audio);
   	 var analyser = context.createAnalyser();
 	var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var r = barHeight + (25 * (i/bufferLength));
        var g = 250 * (i/bufferLength);
        var b = 50;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
}
}
