// Randomize Header

// Store & Generate Number
//var maxRand = 5;
//var numRand = Math.floor( Math.random() * maxRand );
//console.log(numRand);

// Store images
//var img0 = '/img/fullsize/asad.jpg';
//var img1 = '/img/fullsize/ewuframe.jpg';
//var img2 = '/img/fullsize/poachedsign.jpg';
//var img3 = '/img/fullsize/swcan.jpg';
//var img4 = '/img/fullsize/whiskeyad2.jpg';

// Show Images
//$('header img').attr('src', eval('img' + numRand) );

// Activate Gallery
$('figure').lightGallery({
    selector: 'a'
});


// Credits go all to Florian Zoubek from codepen

var duration = 30; // duration in seconds
var fadeAmount = 0.3; // fade duration amount relative to the time the image is visible

$(document).ready(function (){
  var images = $("#slideshow img");
  var numImages = images.size();
  var durationMs = duration * 1000;
  var imageTime = durationMs / numImages; // time the image is visible 
  var fadeTime = imageTime * fadeAmount; // time for cross fading
  var visibleTime = imageTime  - (imageTime * fadeAmount * 2);// time the image is visible with opacity == 1
  var animDelay = visibleTime * (numImages - 1) + fadeTime * (numImages - 2); // animation delay/offset for a single image 
  
  images.each( function( index, element ){
    if(index != 0){
      $(element).css("opacity","0");
      setTimeout(function(){
        doAnimationLoop(element,fadeTime, visibleTime, fadeTime, animDelay);
      },visibleTime*index + fadeTime*(index-1));
    }else{
      setTimeout(function(){
        $(element).animate({opacity:0},fadeTime, function(){
          setTimeout(function(){
            doAnimationLoop(element,fadeTime, visibleTime, fadeTime, animDelay);
          },animDelay )
        });
      },visibleTime);
    }
  });
});

// creates a animation loop
function doAnimationLoop(element, fadeInTime, visibleTime, fadeOutTime, pauseTime){
  fadeInOut(element,fadeInTime, visibleTime, fadeOutTime ,function(){
    setTimeout(function(){
      doAnimationLoop(element, fadeInTime, visibleTime, fadeOutTime, pauseTime);
    },pauseTime);
  });
}

// shorthand for in- and out-fading
function fadeInOut( element, fadeIn, visible, fadeOut, onComplete){
  return $(element).animate( {opacity:1}, fadeIn ).delay( visible ).animate( {opacity:0}, fadeOut, onComplete);
}