'use strict';

function plan_go(Plan) {

    var div_form = document.createElement('div');
    div_form.id = 'form';

    for (var i = 0; i < Plan.main.elements.length; i++) {
        var description = Plan.main.elements[i];
        var elem = createElement(description);
        div_form.appendChild(elem);
    }

    document.body.appendChild(div_form);
}

function createElement(description) {
    if (description.type == 'button') {
        return createButton(description);
    }
}

function createButton(description) {
    var elem = document.createElement('a');

    if (!elem.style)
        elem.style = 'filled';

    elem.className = 'button button__style_' + description.style;
    if (description.disabled) {
        elem.className = elem.className + '-disabled';
    }
    elem.innerHTML = description.name;
    elem.href = '#';
    return elem;
}

function web_get(url, onrecieve)
{
    var h = new XMLHttpRequest();
    h.open('GET', url, true);
    h.onreadystatechange = function() {

        if(h.readyState != 4) {
            return;
        }

        if(h.status == 200)
        {
            if (onrecieve != null) {
                onrecieve(res.data);
            }
        }
        else
        {
            alert('Ошибка HTTP-запроса! Код ошибки: ' + h.status + '. ' + h.responseText);
        }

    }
    h.send();
}

function web_post_json(url, json_str, onrecieve)
{
    var h = new XMLHttpRequest();
    h.open('POST', url, true);
    h.setRequestHeader('Content-Type','application/json');
    h.onreadystatechange = function() {

        if(h.readyState != 4) {
            return;
        }

        if(h.status == 200)
        {
            var res = JSON.parse(h.responseText);
            if (res.status == 'error') {
                alert(res.message);
            }else if (res.status == 'warning') {
                alert(res.message);
            }else if (res.status != 'success') {
                alert('Неизвестный статус ответа: ' + res.status);
            }else{
                if (onrecieve != null) {
                    onrecieve(res.data);
                }
            }
        }
        else
        {
            alert('Ошибка HTTP-запроса! Код ошибки: ' + h.status + '. ' + h.responseText);
        }

    }
    h.send( json_str );
}
