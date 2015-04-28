(function($){  'use strict';$('#contact-form').on('submit', function(){
    sendContact();
});

$('#contact-form button').on('click', function(){
    sendContact();
});


function sendContact(){
    var name = $('#contact-form #name').val(), email = $('#contact-form #email').val(), text = $('#contact-form #text').val();
    var msg = $('#contact-form-msg');

    $.ajax({
        url: "Ajax/SendContact/",
        type: "post",
        data: {
            'name': name,
            'email': email,
            'text': text
        },
        beforeSend : function (){
            msg.show().html('<img src="/static/img/loader.gif" alt="Ładowanie" />');
        },
        success: function(data){
            var obj = jQuery.parseJSON(data);
            if(obj.type == 1){
                msg.html(obj.text);
            }
            else if(obj.type == 0)
                msg.html(obj.text);
            else
                msg.html('Wystąpił błąd, przepraszamy.');
        }
    });
}

var map;
	var opole = new google.maps.LatLng(50.6675682,17.9267782);

	var MY_MAPTYPE_ID = 'custom_style';


function initialize() {

  var featureOpts = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#58dfc1"},{"visibility":"on"}]}];

  var mapOptions = {
    zoom: 16,
    center: opole,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
    },
    mapTypeId: MY_MAPTYPE_ID
  };

  var map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

  var marker = new google.maps.Marker({
      position: opole,
      map: map,
      title: 'Znajdziesz nas tutaj!',
      icon: 'static/img/icons/marker.png'
  });


  var styledMapOptions = {
    name: 'Custom Style'
  };

  var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

  map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}

google.maps.event.addDomListener(window, 'load', initialize);

$("#menu-responsive a").click(function(e){
	e.preventDefault();
	$(this).parent().children("ul").slideToggle("slow");	
    
});
$('.scroll').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);

    $('#menu-responsive ul').slideToggle("slow");
    return false;
});
$( "#services a" ).click(function(e) {
	e.preventDefault()
  $(this).parent().children(".text").slideToggle( "slow", function(e) {

   	 ($(this).parent().children("#services a").text() === "rozwiń \u02C5") ? $(this).parent().children("#services a").text("zwiń \u02C4") : $(this).parent().children("#services a").text("rozwiń \u02C5");
  });
});}(jQuery));