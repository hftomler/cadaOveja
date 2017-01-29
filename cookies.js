function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return decodeURIComponent(c.substring(name.length, c.length));
        }
    }
    return null;
}


function delCookie (name,path,domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" + ((path == null) ? "" : "; path=" + path) + ((domain == null) ? "" : "; domain=" + domain) + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        return true;
    } else {
        return false;
    }
}

function delAllCookies() {
    var cooks = document.cookie.split("; ");
    for (var i = 0; i<cooks.length; i++) {
        var nombre = cooks[i].split("=");
        delCookie(nombre[0]);
    }
}
