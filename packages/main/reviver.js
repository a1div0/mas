function revive_form_sketch(Plan) {

    var div_form = document.createElement('div');
    div_form.id = 'form';

    for (var i = 0; i < Plan.main.elements.length; i++) {
        var description = Plan.main.elements[i];
        var elem = createElement(description);
        if (elem != null) {
            div_form.appendChild(elem);
        }
    }

    document.body.appendChild(div_form);
}

function createElement(description) {
    if (description.type == 'button') {
        return createButton(description);
    } else if (description.type == 'checkbox') {
        return createCheckbox(description);
    } else if (description.type == 'group') {
        return createGroup(description);
    }
}

function getClassName(description, element_name) {
    var name = description.type + (element_name ? '__' + element_name : '');
    var className = name + ' ' + name + '__'
        + (description.style ? description.style : 'classic')
        + (description.disabled ? '-disabled' : '')
        ;
    return className;
}

function createGroup(description) {
    // var block = document.createElement('a');
    // block.className = getClassName(description);
    // block.innerHTML = description.name;
    // block.href = '#';
    return null;
}
