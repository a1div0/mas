package main

import (
    "fmt"
    "os"
    "io/ioutil"
    "flag"
    "strings"
    "net/http"
    "net/url"
    "strconv"
)

type ResultSet struct {
    css string
    js string
    js_htm string
}

const is_css int = 1;
const is_htm int = 2;
const is_js int = 3;

func main() {

    var src_path string
    var dst_path string
    var debug_flag bool
    var result ResultSet
    var err error

    flag.StringVar(&src_path, "src", ".", "set source path")
    flag.StringVar(&dst_path, "dst", "", "set destination path")
    flag.BoolVar(&debug_flag, "d", false, "set debug mode: disable minimizer und so veiter")
    flag.Parse()

    if (dst_path == "") {
        if (debug_flag) {
            dst_path = src_path + "\\!debug"
        }else{
            dst_path = src_path + "\\!release"
        }
    }

    if _, err = os.Stat(dst_path); os.IsNotExist(err) {
    	err := os.MkdirAll(dst_path, os.ModePerm)
        if err != nil {
    		fmt.Println(err.Error())
            return
    	}
    }

    compile_path(src_path, &result)

    err = ioutil.WriteFile(dst_path + "\\form-sketch-reviver.min.css", []byte(result.css), 0)
	if err != nil {
        fmt.Println(err.Error())
        return
	}

    var js string
    js = "'use strict';\nvar component_templates = {};\n" + result.js_htm + "\n" + result.js

    if (!debug_flag) {
        js = minimize_js(js);
    }

    err = ioutil.WriteFile(dst_path + "\\form-sketch-reviver.min.js", []byte(js), 0)
	if err != nil {
        fmt.Println(err.Error())
        return
	}
}

func minimize_js(orig_js string) string {

    // https://developers.google.com/closure/compiler/docs/api-ref
    data := url.Values{}
    data.Set("js_code", orig_js)
    data.Set("compilation_level", "SIMPLE_OPTIMIZATIONS") // ADVANCED_OPTIMIZATIONS
    data.Set("output_format", "text")
    data.Set("output_info", "compiled_code")

    client := &http.Client{}
    r, _ := http.NewRequest("POST", "https://closure-compiler.appspot.com/compile", strings.NewReader(data.Encode())) // URL-encoded payload
    r.Header.Add("Content-Type", "application/x-www-form-urlencoded")
    r.Header.Add("Content-Length", strconv.Itoa(len(data.Encode())))

    resp, err := client.Do(r)
    if err != nil {
        fmt.Println(err.Error())
        return orig_js
	}

    b, err := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()

    if (resp.StatusCode != 200) {
        fmt.Println(resp.Status + ":" + string(b))
        return orig_js
    }
    if err != nil {
		fmt.Println(err.Error())
		return orig_js
	}

    return string(b);
}

func compile_path(src_path string, result *ResultSet) {
    files, err := ioutil.ReadDir(src_path)
	if err != nil {
		fmt.Println(err.Error())
        return
	}

	for _, file := range files {
        var file_name = file.Name();
        var full_name = src_path + "\\" + file_name;
        if (file.IsDir()) {
            compile_path(full_name, result)
        }else{
            compile_file(full_name, file_name, result)
        }
	}
}

func get_type(file_name string) int {
    var s string = strings.ToLower(file_name)
    var n int = len(s)
    if (s[n - 4:] == ".css") {
        return is_css
    }else if(s[n - 4:] == ".htm") {
        return is_htm
    }else if(s[n - 3:] == ".js") {
        return is_js
    }else{
        return 0
    }
}

func compile_file(full_name string, file_name string, result *ResultSet) {

    var t int = get_type(full_name)
    if (t != 0) {
        content, err := ioutil.ReadFile(full_name)
    	if err != nil {
    		fmt.Println(err.Error())
            return
    	}else if (t == is_css) {
            result.css += string(content) + "\n"
        }else if (t == is_js) {
            result.js += string(content) + "\n"
        }else if (t == is_htm) {
            result.js_htm += htm2js(string(content), file_name) + "\n"
        }
    }

}

func htm2js(htm string, file_name string) string {
    var short_name = file_name[:len(file_name) - 4]
    var js string = "component_templates['" + short_name + "']=`" + htm + "`;"
    return strings.Replace(js, "\n", "", -1)
}
