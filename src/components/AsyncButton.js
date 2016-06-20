export default React.createClass({
  getInitialState() {
    return {
      pending: false,
      promiseFulFilled: false,
      promiseRejected: false
    };
  },

  resetState() {
    this.setState({
      pending: false,
      promiseFulfilled: false,
      promiseRejected: false
    });
  },

  handleClick() {
    this.setState({
      pending: true
    });

    let promise = this.props.onClick(...arguments);
    if (promise && promise.then) {
      promise.then(() => {
        this.setState({
          pending: false,
          promiseRejected: false,
          promiseFulfilled: true
        });
      }).catch((error) => {
        this.setState({
          pending: false,
          promiseRejected: true,
          promiseFulfilled: false
        });
        throw error;
      });
    } else {
      this.resetState();
    }
  },

  render() {
    let isPending = this.state.pending;
    let isFulfilled = this.state.promiseFulfilled;
    let isRejected = this.state.promiseRejected;
    let isDisabled = this.props.disabled || isPending;
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
      <button {...this.props} disabled={isDisabled} onClick={this.handleClick}>
        {buttonText}
      </button>
		);
	}
});
