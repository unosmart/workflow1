$(document).ready(function(){

	$('input,textarea').placeholder();
});
$(function() {
      $('#add_work').bind('click', function(e) {
            e.preventDefault();
                $('#add_work_popup').bPopup();
            });
        });
