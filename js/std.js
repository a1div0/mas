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
    } else if (description.type == 'checkbox') {
        return createCheckbox(description);
    }
}

function getClassName(description, element_name) {
    var name = description.type + (element_name ? '__' + element_name : '');
    var className = name + ' ' + name + '__style_'
        + (description.style ? description.style : 'classic')
        + (description.disabled ? '-disabled' : '')
        ;
    return className;
}

function createButton(description) {
    var block = document.createElement('a');
    block.className = getClassName(description);
    block.innerHTML = description.name;
    block.href = '#';
    return block;
}

function createCheckbox(description) {

    var elem0 = document.createElement('span');
    elem0.innerHTML = description.name;

    var elem1 = document.createElement('input');
    //elem1.id = 'id1';
    elem1.type = 'checkbox';
    elem1.className = getClassName(description, 'input');
    elem1.checked = !!description.checked;
    elem1.disabled = !!description.disabled;

    var elem2 = document.createElement('div');
    elem2.className = 'checkbox_v';
    elem2.innerHTML = `<svg width="24px" height="24px" viewBox="0 0 24 24">
            <path d="M 3 0 L 19 0 C 20.65685424949238 1.0145306266472667e-16 22 1.3431457505076199 22 3 L 22 19 C 22 20.65685424949238 20.65685424949238 22 19 22 L 3 22 C 1.3431457505076203 22 2.0290612532945335e-16 20.65685424949238 0 19 L 0 3 C -2.0290612532945335e-16 1.3431457505076203 1.3431457505076199 3.0435918799418e-16 3 0 Z" stroke-width="2" stroke="#000000" fill="none" selected="true" transform="matrix(1 0 0 1 0.960788 1.03335)"></path>
            <polyline points="4 10 10 18 20 6"></polyline>
        </svg>`;

    var block = document.createElement('label');
    block.className = getClassName(description);

    block.appendChild(elem0);
    block.appendChild(elem1);
    block.appendChild(elem2);

    return block;
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
