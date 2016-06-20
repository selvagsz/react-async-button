import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class AsyncButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPending: false,
      isFulfilled: false,
      isRejected: false,
    };
  }

  resetState() {
    this.setState({
      isPending: false,
      isFulfilled: false,
      isRejected: false,
    });
  }

  handleClick(...args) {
    this.setState({
      isPending: true,
    });

    const promise = this.props.onClick(args);
    if (promise && promise.then) {
      promise.then(() => {
        this.setState({
          isPending: false,
          isRejected: false,
          isFulfilled: true,
        });
      }).catch((error) => {
        this.setState({
          isPending: false,
          isRejected: true,
          isFulfilled: false,
        });
        throw error;
      });
    } else {
      this.resetState();
    }
  }

  render() {
    const { isPending, isFulfilled, isRejected } = this.state;
    const {
      children,
      text,
      pendingText,
      fulFilledText,
      rejectedText,
      className,
      loadingClass,
      fulFilledClass,
      rejectedClass,
    } = this.props;
    const isDisabled = this.props.disabled || isPending;
    let buttonText;

    if (isPending) {
      buttonText = pendingText;
    } else if (isFulfilled) {
      buttonText = fulFilledText;
    } else if (isRejected) {
      buttonText = rejectedText;
    }
    buttonText = buttonText || text;
    const btnClasses = classNames(className, {
      [`${loadingClass || 'AsyncButton--loading'}`]: isPending,
      [`${fulFilledClass || 'AsyncButton--fulfilled'}`]: isFulfilled,
      [`${rejectedClass || 'AsyncButton--rejected'}`]: isRejected,
    });

    return (
      <button {...this.props} className={btnClasses} disabled={isDisabled} onClick={() => this.handleClick()}>
        {children || buttonText}
      </button>
		);
  }
}

AsyncButton.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  loadingClass: PropTypes.string,
  fulFilledClass: PropTypes.string,
  rejectedClass: PropTypes.string,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  pendingText: PropTypes.string,
  fulFilledText: PropTypes.string,
  rejectedText: PropTypes.string,
  onClick: PropTypes.func,
};
