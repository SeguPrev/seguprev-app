const ReqConfg = require("./reqconfg.model");

const GET = "get";
const POST = "post";
const PUT = "put";
const DELETE = "delete";

class Requester {
  constructor() {
    this.config = new ReqConfg(GET);
    this.backstage = null;
  }

  async get(route, params) {
    this.config.method = GET;
    this.config.body = null;
    let url_params = '';
    if(params !== null && params.length > 0) {
      params = this.config.toUrlParams(params);
    }
    return await this.call(route + url_params);
  }

  async post(route, data) {
    this.config.method = POST;
    this.config.body = JSON.stringify({ data });
    return await this.call(route);
  }

  async put(route, data) {
    this.config.method = PUT;
    this.config.body = JSON.stringify({ data });
    return await this.call(route);
  }

  async delete(route) {
    this.config.method = DELETE;
    return await this.call(route);
  }

  async call(route) {
    let response = await fetch(this.config.baseURL + route, this.config);
    return (response.ok) ? response.json() : null;
	}
}

module.exports = Requester;
