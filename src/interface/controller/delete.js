'use strict';

import Base from './base.js';

export default class extends Base {
  async deleteInterfaceById(id) {
    let interfaceModel = this.model("interface/interface");
    return await interfaceModel.deleteInterfaceById(id);
  }
}
