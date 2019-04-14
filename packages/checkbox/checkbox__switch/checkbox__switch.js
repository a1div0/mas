'use strinct';

function checkbox__style_switch(description, block) {

    let elem3 = document.createElement('div');
    elem3.className = form_sketch__getClassName(description, 'thumb');

    let elem2 = document.createElement('div');
    elem2.className = form_sketch__getClassName(description, 'track');
    elem2.appendChild(elem3);
    block.appendChild(elem2);

}

checkbox__AddStyle('switch', checkbox__style_switch);