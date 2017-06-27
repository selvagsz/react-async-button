/* global describe, it, expect */
import React from 'react';
import AsyncButton from '../AsyncButton.js';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

describe('main.js', () => {
  it('Should render `button` tag', () => {
    const wrapper = shallow(<AsyncButton />);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('Component should delegate classNames & disabled attr to button', () => {
    const wrapper = shallow(
      <AsyncButton className="btn btn-default" disabled text="Save" />
    );
    const $button = wrapper.find('button');

    expect($button.hasClass('btn btn-default')).toBe(true);
    expect($button.prop('disabled')).toBe(true);
    expect($button.text()).toBe('Save');
  });

  it('Should trigger click handler', () => {
    const clickHandler = sinon.spy();
    const wrapper = shallow(
      <AsyncButton
        className="btn btn-default"
        onClick={clickHandler}
        text="Save"
        pendingText="Saving..."
      />
    );
    const $button = wrapper.find('button');
    $button.simulate('click');
    expect(clickHandler.calledOnce).toBe(true);
  });

  it('should not call setState after unmount', () => {
    let resolve;
    const promise = new Promise(_resolve => {
      resolve = _resolve;
    });
    let onClick = () => promise;
    const wrapper = mount(<AsyncButton onClick={onClick} />);
    wrapper.find('button').simulate('click');
    wrapper.unmount();
    wrapper.node.setState = sinon.spy();

    resolve();
    return Promise.resolve().then(() => {
      expect(wrapper.node.setState.callCount).toBe(0);
    });
  });
});
