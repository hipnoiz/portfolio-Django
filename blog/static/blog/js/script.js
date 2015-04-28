$(function() {
	$("#menu-responsive a").click(function(e){
		e.preventDefault();
		$(this).parent().children("ul").slideToggle("slow");	
	    
	});
});