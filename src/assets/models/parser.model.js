class Template {
  constructor() {}

  static zip(object) {
    let bundle = [];
    let keys = Object.keys(object);
    keys.forEach((key) => {
      if(object[key] != '' && object[key] != null) {
        bundle.push({ name: key, value: object[key] });
      }
    });
    return bundle;
  }
}

module.exports = Template;
