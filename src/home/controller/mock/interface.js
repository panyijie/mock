'use strict';

import Base from '../base.js';

export default class extends Base {
  listAction() {
    return this.display();
  }

  editAction() {
    return this.display();
  }

  editCompletingAction() {
    return this.display();
  }

  createAction() {
    return this.display();
  }

  completeAction() {
    return this.display();
  }

  docsAction() {
    let componentId = this.http.get('id');
    if (think.isEmpty(componentId)) {
      this.controller('error', 'common').displayError(404);
    } else {
      return this.display();
    }
  }

  mockRandomListAction() {
    return this.display();
  }

  mockRandomFormAction() {
    return this.display();
  }

  mockRandomDocsAction() {
    return this.display();
  }
}
