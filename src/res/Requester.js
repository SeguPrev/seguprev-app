class Requester {
  constructor(url) {
    this.url = url;
    this.config = {
      method: 'POST',
      body: {},
      params: {},
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }

  async get(route, params) {
    this.config.params = params;
    const response = await fetch(this.url + route, this.config);
    return await response.json();
  }

  async post(route, params) {
    this.config.body = JSON.stringify(params);
    console.log(this.url + route);
    const response = await fetch(this.url + route, this.config);
    return await response.json();
  }

}

module.exports = Requester;
