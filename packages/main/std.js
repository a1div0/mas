'use strict';

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

function form_sketch__getMeta(attrName, attrValue) {
  const metas = document.getElementsByTagName('meta');

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute(attrName) === attrValue) {
      return metas[i].getAttribute('content');
    }
  }

  return '';
}
