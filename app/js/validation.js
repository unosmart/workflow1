var validation = (function() {
	//Инициализирует модуль
	var init = function() {
		_setUpListiner();
	};
	var _imgValid = /\.(jpeg|jpg|png|gif)$/i;

	//Слушает события
	var _setUpListiner = function() {
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

	return {
		init: init,
		validateForm: validateForm
	};
})();
validation.init();