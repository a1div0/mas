"use strinct";

var g_create_functions = {};

function form_sketch__add_type(type_name, on_before_create_function) {
    g_create_functions[type_name] = on_before_create_function;
}

function form_sketch__revive(formSketch) {

    let div_form = document.createElement("div");
    div_form.id = "form";

    try {
        let elements_cnt = formSketch.main.elements.length;

        for (let i = 0; i < elements_cnt; i++) {

            let description = formSketch.main.elements[i];
            let f = g_create_functions[description.type];
            if (f) {
                let e = f(description);
                if (e) {
                    div_form.appendChild(e);
                }
            } else {
                throw "Элемент управления неизвестного типа - %1. Добавьте пакет для работы с ним."
                    .replace("%1", description.type);
            }
        }
    } catch(e) {
        
        let err_msg = "ОШИБКА ВЫПОЛНЕНИЯ СЦЕНАРИЯ!\n";

        if (typeof(e) == "string") {
            err_msg += e;
        }else{
            err_msg +=
                "Название ошибки: "+e.name+"\n"+
                "Сообщение: "+e.message;
        }

        alert(err_msg);
    }

    document.body.appendChild(div_form);
}

function getClassName(description, element_name) {
    var name = description.type + (element_name ? '__' + element_name : '');
    var className = name + ' ' + name + '__'
        + (description.style ? description.style : 'classic')
        + (description.disabled ? '-disabled' : '')
        ;
    return className;
}
