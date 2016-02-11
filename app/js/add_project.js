/*-----Модуль добавления проекта----*/
var addProject = function () {
//Инициализирует модуль
  "use strict";
  var init = function () {
      _setUpListiner ();
  };
//Слушает события
    var _setUpListiner = function () {
        $('#add_work').on('click', _showModal); //вызов модального окна
        $('#add-project').on('submit', addProjectValid); //валидация добавления проекта
        $('.server-responce').on('click', function () {
        $(this).fadeOut(250);
        });
    };

//Вывод модального окна
    var _showModal = function (e) {
       e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var divPopup = $('#add_work_popup'),
            form = divPopup.find('.form');
        divPopup.bPopup({
            speed: 350,
            transition: 'fadeIn',
            positionStyle: 'fixed',
            onClose: function () {
                form.find('.server-responce').text('').hide(); //Очищаем форму
                form.trigger('reset');
                $('.input-text').html('Загрузите изображение');
            }
        });
    };

//Делает запрос ajax на добавление, получает ответ положительный или отрицательный
    var addProjectValid = function (e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var form = $(this),
        url = 'php/add_project.php',
        serverPostAnswer = _ajaxForm(form, url); //вызываем универсальный ajax запрос
        if (serverPostAnswer) {
            serverPostAnswer.done(function (ans) {
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
    };
//Универсальный ajax запрос.
    var _ajaxForm = function (form, url) {
        //if(!valid) return false;
        if (!validation.validateForm(form)) {return false;}
        var data = form.serialize();

        var result = $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data
        }).fail(function (){
            form.find('.error-mes').text('На сервере произошла ошибка, повторите отправку чуть позже.').show();
        });
        return result;
    };
    return {
        init: init,
        addProjectValid: addProjectValid
    };
}();
addProject.init();