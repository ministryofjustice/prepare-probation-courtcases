import merge from 'deepmerge';

class ViewController {
  constructor(model) {
    this.model = model;

    // Auto-bind class methods
    Reflect.ownKeys(this.constructor.prototype).forEach((key) => {
      this[key] = this[key].bind(this);
    });
  }

  save(req) {
    const { body } = req;
    const data = merge(req.session.data || {}, this.model);

    // Merge existing data with POST body
    Object.keys(this.model).forEach((key) => {
      if (body[key] && typeof body[key] === 'object') {
        data[key] = merge(data[key] || {}, body[key]);
      }
    });

    // Write to cookie
    req.session.data = data;
    return data;
  }
}

export default ViewController;
