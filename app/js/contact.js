/*-----Модуль формы обратной связи----*/
var contactValid = function () {
	//Инициализирует модуль
	var init = function() {
		_setUpListiner();
	};
	//Слушает события
	var _setUpListiner = function() {
		$('.contact_form').on('submit', addFormValid); //валидация формы контактов добавления проекта
	};
	 var _getRecapcha = function (form){
	 	   capcha =true;
	 	    if ($(form).find('.g-recaptcha').length) {
            capcha =  grecaptcha.getResponse().length;
            }
            if (!capcha){
           	$('.g-recaptcha iframe').qtip({
           		content: 'Докажите, что Вы не робот, щелкните в поле',
                position: {
                    my: 'left center',
                    at: 'right center'
                },
                style: {
                    classes: ' mytooltip qtip-rounded'
                },
                 hide: {
                    event: 'mouseover hideTooltip'
                },
                show: {
                        ready: true
                    }
 
           	})
           }
           return capcha;
        };
 

	//Делает запрос ajax на добавление, получает ответ положительный или отрицательный
	var addFormValid = function(e) {
		e.preventDefault();
		var form = $(this);
		url = 'php/contact.php'
		 if (!validation.validateForm(form) || _getRecapcha(form) ) {
            serverPostAnswer = _ajaxForm(form, url);
            	if (serverPostAnswer) {
			serverPostAnswer.done(function(ans) {
				if (ans.status === 'OK') {
					form.find('.error-mes').hide();
					form.find('.success-mes').text(ans.text).show();//скрываем блок если отображен другой
					form.find('input, textarea').val(''); //очищаем поля формы если прошел положительный ответ
				} else {
					form.find('.success-mes').hide();
					form.find('.error-mes').text(ans.text).show();//скрываем блок если отображен другой
				}
			});
		}
		} //вызываем универсальный ajax запрос
	
	};
	//Универсальный ajax запрос.
	var _ajaxForm = function(form, url) {
		//if(!valid) return false;
		if (!validation.validateForm(form)) return false;
		var data = form.serialize();

		var result = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		}).fail(function() {
			form.find('.error-mes').text('На сервере произошла ошибка').show();
		});
		return result;
	};
	return {
		init: init,
		addFormValid: addFormValid
	};
}();
contactValid.init();