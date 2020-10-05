class ReqConfg {
  constructor(method) {
    this.baseURL = "http://localhost:5000/api";
    this.method = method;
    this.body = {};
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  toUrlParams(obj) {
    var str = "";
    for (var key in obj) {
      if (str != "") {
        str += "&";
      }
      str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
  }
}

module.exports = ReqConfg;
