// /* global describe, it, expect */
import React from 'react';
import AsyncButton from '../AsyncButton';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

describe('<AsyncButton />', () => {
  it('should render `button` tag', () => {
    const wrapper = shallow(<AsyncButton />);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('should delegate classNames & disabled attr to button', () => {
    const wrapper = shallow(
      <AsyncButton className="btn btn-default" disabled text="Save" />
    );
    const $button = wrapper.find('button');

    expect($button.hasClass('btn btn-default')).toBe(true);
    expect($button.prop('disabled')).toBe(true);
    expect($button.text()).toBe('Save');
  });

  it('should trigger click handler', () => {
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
    const Component = <AsyncButton onClick={onClick} />;
    const wrapper = mount(Component);
    wrapper.find('button').simulate('click');
    wrapper.unmount();
    wrapper.node.setState = sinon.spy();
    resolve();
    return Promise.resolve().then(() => {
      expect(wrapper.node.setState.callCount).toBe(0);
    });
  });

  it('should not call setState after unmount on reject', () => {
    let reject;
    const promise = new Promise((_resolve, _reject) => {
      reject = _reject;
    });
    let onClick = () => promise;
    const Component = <AsyncButton onClick={onClick} />;
    const wrapper = mount(Component);
    wrapper.find('button').simulate('click');
    wrapper.unmount();
    wrapper.node.setState = sinon.spy();
    reject();
    return Promise.resolve().then(() => {
      promise.catch(() => {
        expect(wrapper.node.setState.callCount).toBe(0);
      });
    });
  });

  it('should set the fulFilledClass & fulFilledText on promise resolve', () => {
    let resolve;
    const promise = new Promise(_resolve => {
      resolve = _resolve;
    });
    let onClick = () => promise;

    const wrapper = mount(
      <AsyncButton
        text="Save"
        pendingText="Saving..."
        loadingClass="loading"
        fulFilledClass="success"
        fulFilledText="Saved!"
        onClick={onClick}
      />
    );
    const $button = wrapper.find('button');
    expect($button.text()).toBe('Save');
    expect($button.hasClass('loading')).toBe(false);
    expect($button.prop('disabled')).toBe(false);

    $button.simulate('click');
    expect($button.text()).toBe('Saving...');
    expect($button.hasClass('loading')).toBe(true);
    expect($button.prop('disabled')).toBe(true);

    resolve();
    return Promise.resolve().then(() => {
      expect($button.text()).toBe('Saved!');
      expect($button.hasClass('loading')).toBe(false);
      expect($button.hasClass('success')).toBe(true);
      expect($button.prop('disabled')).toBe(false);
    });
  });

  it('should set the rejectedClass & rejectedText on promise reject', () => {
    let reject;
    const promise = new Promise((_resolve, _reject) => {
      reject = _reject;
    });
    let onClick = () => promise;

    const wrapper = mount(
      <AsyncButton
        text="Save"
        pendingText="Saving..."
        loadingClass="loading"
        fulFilledClass="success"
        fulFilledText="Saved!"
        rejectedClass="error"
        rejectedText="Try Again!"
        onClick={onClick}
      />
    );
    const $button = wrapper.find('button');
    expect($button.text()).toBe('Save');
    expect($button.hasClass('loading')).toBe(false);
    expect($button.prop('disabled')).toBe(false);

    $button.simulate('click');
    expect($button.text()).toBe('Saving...');
    expect($button.hasClass('loading')).toBe(true);
    expect($button.prop('disabled')).toBe(true);

    reject();
    return Promise.resolve().then(() => {
      promise.catch(error => {
        expect($button.text()).toBe('Try Again!');
        expect($button.hasClass('loading')).toBe(false);
        expect($button.hasClass('success')).toBe(false);
        expect($button.hasClass('error')).toBe(true);
        expect($button.prop('disabled')).toBe(false);
      });
    });
  });
});

describe('AsyncButton :- Block form', () => {
  it('should set the fulFilledClass & fulFilledText on promise resolve', () => {
    let resolve;
    const promise = new Promise(_resolve => {
      resolve = _resolve;
    });
    let onClick = () => promise;

    const wrapper = mount(
      <AsyncButton
        text="Save"
        pendingText="Saving..."
        loadingClass="loading"
        fulFilledClass="success"
        fulFilledText="Saved!"
        onClick={onClick}
      >
        {({ buttonText, isPending, isFulfilled, isRejected }) =>
          <span>
            {buttonText}
          </span>}
      </AsyncButton>
    );
    const $button = wrapper.find('button');
    expect($button.text()).toBe('Save');
    expect($button.hasClass('loading')).toBe(false);
    expect($button.prop('disabled')).toBe(false);

    $button.simulate('click');
    expect($button.text()).toBe('Saving...');
    expect($button.hasClass('loading')).toBe(true);
    expect($button.prop('disabled')).toBe(true);

    resolve();
    return Promise.resolve().then(() => {
      expect($button.text()).toBe('Saved!');
      expect($button.hasClass('loading')).toBe(false);
      expect($button.hasClass('success')).toBe(true);
      expect($button.prop('disabled')).toBe(false);
    });
  });
});
