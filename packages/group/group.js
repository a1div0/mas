function createGroup(description) {
    var block = document.createElement('div');
    block.className = form_sketch__getClassName(description);

    if (description.orientation) {
        block.dataset.orientation = description.orientation;
    }else{
        block.dataset.orientation = "horizontal";
    }
    group_revive(block, description.elements);
    return block;
}

form_sketch__addType('group', createGroup);
