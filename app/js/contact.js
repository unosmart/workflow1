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
	//Делает запрос ajax на добавление, получает ответ положительный или отрицательный
	var addFormValid = function(e) {
		e.preventDefault();
		var form = $(this);
		url = 'add_project1.php'
		serverPostAnswer = _ajaxForm(form, url); //вызываем универсальный ajax запрос
		if (serverPostAnswer) {
			serverPostAnswer.done(function(ans) {
				console.log(ans);
				if (ans.status === 'OK') {
					console.log(ans.text);
					console.log('Ура! все прошло успешно');
					form.find('.error-mes').hide();
					form.find('.success-mes').text(ans.text).show();//скрываем блок если отображен другой
				} else {
					console.log(ans.text);
					form.find('.success-mes').hide();
					form.find('.error-mes').text(ans.text).show();//скрываем блок если отображен другой
				}
			});
		}
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
			console.log("Проблемы в PHP");
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