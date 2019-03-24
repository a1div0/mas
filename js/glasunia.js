function plan_go(Plan) {

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

    var block = document.createElement('label');
    block.className = getClassName(description);

    var elem0 = document.createElement('span');
    elem0.innerHTML = description.name;
    block.appendChild(elem0);

    var elem1 = document.createElement('input');
    //elem1.id = 'id1';
    elem1.type = 'checkbox';
    elem1.className = getClassName(description, 'input');
    elem1.checked = !!description.checked;
    elem1.disabled = !!description.disabled;
    block.appendChild(elem1);

    if (description.style == 'classic') {
        var elem2 = document.createElement('div');
        elem2.className = 'checkbox_v';
        elem2.innerHTML = '<svg width="24px" height="24px" viewBox="0 0 24 24"><polyline points="4 10 10 18 20 6"></polyline></svg>';
        block.appendChild(elem2);
    }else if (description.style == 'checkbox-blue') {
        var elem2 = document.createElement('div');
        elem2.className = 'checkbox_v';
        elem2.innerHTML = '<svg width="24px" height="24px" viewBox="0 0 24 24"><path d="M 3 0 L 19 0 C 20.65685424949238 1.0145306266472667e-16 22 1.3431457505076199 22 3 L 22 19 C 22 20.65685424949238 20.65685424949238 22 19 22 L 3 22 C 1.3431457505076203 22 2.0290612532945335e-16 20.65685424949238 0 19 L 0 3 C -2.0290612532945335e-16 1.3431457505076203 1.3431457505076199 3.0435918799418e-16 3 0 Z" stroke-width="2" stroke="#000000" fill="none" selected="true" transform="matrix(1 0 0 1 0.960788 1.03335)"></path><polyline points="4 10 10 18 20 6"></polyline></svg>';
        block.appendChild(elem2);
    }else if (description.style == 'switch') {
        var elem3 = document.createElement('div');
        elem3.className = getClassName(description, 'thumb');

        var elem2 = document.createElement('div');
        elem2.className = getClassName(description, 'track');
        elem2.appendChild(elem3);
        block.appendChild(elem2);


    }

    return block;
}

function createGroup(description) {
    // var block = document.createElement('a');
    // block.className = getClassName(description);
    // block.innerHTML = description.name;
    // block.href = '#';
    return null;
}
