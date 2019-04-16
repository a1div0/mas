"use strinct";

var g_create_functions = {};
var g_current_locale = "en";

function form_sketch__addType(type_name, on_before_create_function) {
    g_create_functions[type_name] = on_before_create_function;
}

function form_sketch__revive(formSketch) {

    let locale = form_sketch__getMeta('http-equiv', 'content-language');
    if (locale) {
        g_current_locale = locale;
    }

    let div_form = document.createElement("div");
    div_form.id = "form";

    try {
        group_revive(div_form, formSketch.main.elements);
    } catch(e) {

        let err_msg = form_sketch__getLocalStr({
            "ru":"ОШИБКА ВЫПОЛНЕНИЯ СЦЕНАРИЯ!",
            "cn":"执行错误！",
            "en":"ERROR OF EXECUTION!"
        }) + "\n";

        if (typeof(e) == "string") {
            err_msg += e;
        }else{
            err_msg +=
                form_sketch__getLocalStr({
                    "ru":"Название ошибки: ",
                    "cn":"错误名称：",
                    "en":"Error name: "
                }) + e.name + "\n" +
                form_sketch__getLocalStr({
                    "ru":"Сообщение: ",
                    "cn":"信息：",
                    "en":"Message: "
                }) + e.message;
        }

        alert(err_msg);
    }

    document.body.appendChild(div_form);
}

function group_revive(parentDom, elements) {

    let elements_cnt = elements.length;

    for (let i = 0; i < elements_cnt; i++) {

        let description = elements[i];
        let f = g_create_functions[description.type];
        if (f) {
            let e = f(description);
            if (e) {
                parentDom.appendChild(e);
            }
        } else {
            throw form_sketch__getLocalStr({
                "ru":"Элемент управления неизвестного типа - %1. Добавьте пакет для работы с ним.",
                "cn":"控制未知类型 - ％1. 添加一个包以使用它.",
                "en":"Control of unknown type -%1. Add a package to work with it."
            }).replace("%1", description.type);
        }
    }

}

function form_sketch__getClassName(description, element_name) {
    var name = description.type + (element_name ? "__" + element_name : "");
    var className = name + " " + name + "__"
        + (description.style ? description.style : "classic")
        + (description.disabled ? "-disabled" : "")
        ;
    return className;
}

function form_sketch__getLocalStr(data) {
    if (typeof(data) == "string") {
        return data;
    }else{
        return data[g_current_locale];
    }
}
