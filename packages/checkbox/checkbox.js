'use strinct';

var g_checkbox_styles = {};

function checkbox__AddStyle(style_name, on_before_create_function) {
    g_checkbox_styles[style_name] = on_before_create_function;
}

function checkbox__style_classic(description, block) {

    let elem2 = document.createElement('div');
    elem2.className = 'checkbox_v';
    elem2.innerHTML = '<svg width="24px" height="24px" viewBox="0 0 24 24"><polyline points="4 10 10 18 20 6"></polyline></svg>';
    block.appendChild(elem2);

}

checkbox__AddStyle('classic', checkbox__style_classic);

function createCheckbox(description) {

    let block = document.createElement('label');
    block.className = form_sketch__getClassName(description);

    let elem0 = document.createElement('span');
    elem0.innerHTML = form_sketch__getLocalStr(description.caption);
    block.appendChild(elem0);

    let elem1 = document.createElement('input');
    //elem1.id = 'id1';
    elem1.type = 'checkbox';
    elem1.className = form_sketch__getClassName(description, 'input');
    elem1.checked = !!description.checked;
    elem1.disabled = !!description.disabled;
    block.appendChild(elem1);

    let f = g_checkbox_styles[description.style];
    if (f) {
        f(description, block);
    }else{
        throw form_sketch__getLocalStr({
            'ru':'Галочка неизвестного стиля - ',
            'cn':'未知风格的复选框 - ',
            'en':'Checkbox of unknown style - '
        }) + description.style;
    }

    return block;
}

form_sketch__addType('checkbox', createCheckbox);
