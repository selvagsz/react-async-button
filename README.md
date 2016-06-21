# react-async-button

React button component for handling async actions. Inspired from [ember-async-button](https://github.com/DockYard/ember-async-button)

[![Build Status](https://travis-ci.org/selvagsz/react-async-button.svg?branch=master)](https://travis-ci.org/selvagsz/react-async-button)

## Installation

```bash
$ npm install react-async-button --save
```

## DEMO

[JS BIN DEMO](https://jsbin.com/hugigok/18/edit?js,output)

## Example

```js

import React from 'react';
import { render } from 'react-dom';
import AsyncButton from 'react-async-button';

export default App extends Component {
  clickHandler() {
    return new Promise((resolve, reject) => {
      // some async stuff
      setTimeout(resolve, 500);
    })
  }

  render() {
    return (
      <AsyncButton
      className="btn"
      text="Save"
      pendingText="Saving..."
      fulFilledText="Saved Successfully!"
      rejectedText="Failed! Try Again"
      loadingClass="isSaving"
      fulFilledClass="btn-primary"
      rejectedClass="btn-danger"
      onClick={this.clickHandler}/>
    );
  }
}

render(<App/>, document.getElementById('root'));

```

**Note** `clickHandler` should return a promise for the pending state
