// Поддержка placeholder в IE8	
$(document).ready(function(){
	if ($('input, textarea').length) {
        $('input, textarea').placeholder();
   }
});

