import React, { Component } from 'react'
import { render } from 'react-dom'
import AsyncButton from 'components/AsyncButton'
import Highlight from 'react-highlight'

import 'highlight.js/styles/github.css'
import './app.css'

const basicDemoSnippet =
`<AsyncButton
  text='Save'
  pendingText='Saving...'
  fulFilledText='Saved'
  onClick={this.doSomeAsyncStuff}
/>`

const blockFormSnippet =
`<AsyncButton
  text='Save'
  pendingText='Saving...'
  fulFilledText='Saved'
  onClick={this.doSomeAsyncStuff}>
  {
    ({ buttonText, isPending }) => (
      <span>
        { isPending && <Spinner />}
        <span>{buttonText}</span>
      </span>
    )
  }
</AsyncButton>`

const Spinner = () => (
  <div className='spinner'>
    <div className='double-bounce1'></div>
    <div className='double-bounce2'></div>
  </div>
)

export default class AsyncButtonDemo extends Component {
  constructor() {
    super()
    this.doSomeAsyncStuff = ::this.doSomeAsyncStuff
  }

  doSomeAsyncStuff() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000)
    })
  }

  render() {
    return (
      <div>
        <div className="demo-container">
          <h1>Basic Demo</h1>
          <div className="demo">
            <AsyncButton
              text='Save'
              pendingText='Saving...'
              fulFilledText='Saved'
              onClick={this.doSomeAsyncStuff}
            />

            <Highlight className='jsx'>
              {basicDemoSnippet}
            </Highlight>
          </div>
        </div>

        <div className="demo-container">
          <h1>Block Form</h1>
          <div className="demo">
            <AsyncButton
              text='Save'
              pendingText='Saving...'
              fulFilledText='Saved'
              onClick={this.doSomeAsyncStuff}>
              {
                ({ buttonText, isPending }) => (
                  <span>
                    { isPending && <Spinner />}
                    <span>{buttonText}</span>
                  </span>
                )
              }
            </AsyncButton>

            <Highlight className='jsx'>
              {blockFormSnippet}
            </Highlight>
          </div>
        </div>
      </div>
    )
  }
}

render(
  <AsyncButtonDemo />,
  document.getElementById('root')
)
