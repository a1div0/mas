function createButton(description) {
    var block = document.createElement('a');
    block.className = form_sketch__getClassName(description);
    block.innerHTML = form_sketch__getLocalStr(description.caption);
    block.href = '#';
    return block;
}

form_sketch__addType('button', createButton);
