/* global describe, it, expect */
import { AsyncButton } from '../main.js'
import AsyncButtonComponent from '../components/AsyncButton.js'

describe('main.js', () => {
  it('should correctly export the named export', () => {
    expect(AsyncButton).toEqual(AsyncButtonComponent)
  })
})
