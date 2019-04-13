function createButton(description) {
    var block = document.createElement('a');
    block.className = getClassName(description);
    block.innerHTML = description.name;
    block.href = '#';
    return block;
}

form_sketch__add_type('button', createButton);
