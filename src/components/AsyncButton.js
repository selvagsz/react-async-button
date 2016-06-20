import React, { PropTypes } from 'react';

export default class AsyncButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: false,
      promiseFulfilled: false,
      promiseRejected: false,
    };
  }

  resetState() {
    this.setState({
      pending: false,
      promiseFulfilled: false,
      promiseRejected: false,
    });
  }

  handleClick(...args) {
    this.setState({
      pending: true,
    });

    const promise = this.props.onClick(args);
    if (promise && promise.then) {
      promise.then(() => {
        this.setState({
          pending: false,
          promiseRejected: false,
          promiseFulfilled: true,
        });
      }).catch((error) => {
        this.setState({
          pending: false,
          promiseRejected: true,
          promiseFulfilled: false,
        });
        throw error;
      });
    } else {
      this.resetState();
    }
  }

  render() {
    const isPending = this.state.pending;
    const isFulfilled = this.state.promiseFulfilled;
    const isRejected = this.state.promiseRejected;
    const isDisabled = this.props.disabled || isPending;
    let buttonText;

    if (isPending) {
      buttonText = this.props.pendingText;
    } else if (isFulfilled) {
      buttonText = this.props.fulFilledText;
    } else if (isRejected) {
      buttonText = this.props.rejectedText;
    }
    buttonText = buttonText || this.props.text;

    return (
      <button {...this.props} disabled={isDisabled} onClick={() => this.handleClick()}>
        {buttonText}
      </button>
		);
  }
}

AsyncButton.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string,
  pendingText: PropTypes.string,
  fulFilledText: PropTypes.string,
  rejectedText: PropTypes.string,
  onClick: PropTypes.func,
};
