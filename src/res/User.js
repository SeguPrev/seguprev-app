class User {
  constructor() {
    this.template = [];
    this.Int = -1;
  }

  init(user) {
    if(user.email)
      this.template.push({name: 'email', type: 35, value: user.email});
    if(user.name)
      this.template.push({name: 'name', type: 45, value: user.name});
    if(user.pass)
      this.template.push({name: 'pass', type: 18, value: user.pass});
    if(user.tel)
      this.template.push({name: 'tel', type: 10, value: user.tel});
    if(user.type)
      this.template.push({name: 'type', type: this.Int, value: user.type});
  }
}

module.exports = User;
