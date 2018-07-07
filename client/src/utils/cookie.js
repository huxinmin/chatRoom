const setCookie = (key, val)=>{
  var exp = new Date();
  exp.setTime(exp.getTime() + 3 * 24 * 60 * 60 * 1000); //3天过期
  document.cookie = key + "=" + encodeURIComponent(val)+ ";expires=" + exp.toGMTString() + ";path=/";
};

const getCookie =(key)=>{
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(key + "=");
    if (c_start != -1) {
      c_start = c_start + key.length + 1;
      var c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1)
        c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
};

const deleteCookie = (key)=>{
  document.cookie = key+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

export {setCookie, getCookie, deleteCookie,};
