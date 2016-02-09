var addProject = (function() {
	//Инициализирует модуль
	var init = function() {
		_setUpListiner();
	};
	var _imgValid = /\.(jpeg|jpg|png|gif)$/i;

	//Слушает события
	var _setUpListiner = function() {
		$('#add_work').on('click', _showModal); //вызов модального окна
		$('#add-project').on('submit', addProjectValid); //валидация добавления проекта
		$('form').on('keydown', 'valid_error', _removeClassError); // удаляем класс error_check при вводе текста
		$('form').on('focus', 'valid_error', _removeClassError); // удаляем класс error_check при вводе текста
		$('form').on('reset', _clearForm); //очищаем форму
	};

	//Вывод модального окна
	var _showModal = function(e) {
		e.preventDefault();
		console.log('Вызов окна');
		var divPopup = $('#add_work_popup'),
			form = divPopup.find('.form');
		divPopup.bPopup({
			speed: 350,
			transition: 'fadeIn',
			onClose: function() {
				form.find('.server-responce').text('').hide(); //Очищаем форму
				form.trigger('reset');
			}
		});
	};

	//Добавляет проект
	var addProjectValid = function(e) {
		e.preventDefault();
		var form = $(this);
		url = 'add_project.php'
		serverPostAnswer = _ajaxForm(form, url); //вызываем универсальный ajax запрос
		if (serverPostAnswer) {
			serverPostAnswer.done(function(ans) {
				console.log(ans);
				if (ans.status === 'OK') {
					console.log(ans.text);
					console.log('Ура! все прошло успешно');
					form.find('.error-mes').hide();
					form.find('.success-mes').text(ans.text).show();
				} else {
					console.log(ans.text);
					form.find('.success-mes').hide();
					form.find('.error-mes').text(ans.text).show();
				}
			});
		}
	};
	var validateForm = function(form) {
			var elements = form.find('input, textarea, .input-file').not('input[type="hidden"],input[type="file"]'), // Выборка элементов формы
				valid = true;
			$.each(elements, function(index, element) {
				var $element = $(element),
					value = $element.val();
				if ($element.hasClass('input-file')) {
					if (!$('#form-work-image').val()) {
						_addError($element);
						valid = false;
					}
				} else {
					if (!value.length) {
						_addError($element);
						valid = false;
					}
				}
			});
			return valid;
		},
		_addError = function(elem) { //Добавляем клас ошибки к элементу
			elem.addClass('valid_error');
			_createQtip2(elem, elem.data('pos'));
		},
		_removeClassError = function(elem) {
			elem.removeCalss('valid_error'); //удаляем класс ошибки 'valid_error'   
		},
		_createQtip2 = function(elem, pos) { //создаем тултип
			var position = {};
			if (pos === 'right') {
				position = {
					my: 'left center',
					at: 'right center'
				}
			} else {
				position = {
					my: 'right center',
					at: 'left center',
					adjust: {
						metod: 'shift none'
					}
				}
			}

			//инициализация тултипа
			elem.qtip({
				content: {
					text: function() {
						return $(this).data('text');
					}
				},
				show: {
					event: 'show'
				},
				hide: {
					event: 'keydown click focus hideTooltip'
				},
				position: position,
				style: {
					classes: 'mytooltip qtip-rounded',
					tip: {
						height: 7,
						width: 10
					}
				}
			}).trigger('show');
		},
		_clearForm = function(e) { //очищаем форму
			console.log('Очищаем форму');
			var form = $(this);
			form.find('valid_error').removeClass('valid_error');
			form.find('input, textarea').trigger('hideTooltip')
		};



	//Универсальный ajax запрос.
	var _ajaxForm = function(form, url) {
		//if(!valid) return false;
		if (!validateForm(form)) return false;
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
		addProjectValid: addProjectValid,
	};
})();
addProject.init();