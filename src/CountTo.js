import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

class CountTo extends Component {
  state = { current: 0 };

  componentDidUpdate(prevState, prevProps) {
    if (prevState.to != this.props.to) {
      clearTimeout(this.timer);
      this.begin();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  begin = () => {
    const {
      to,
      from,
      interval,
      slowDownDistance,
      slowDownEnabled,
    } = this.props;

    let distance = Math.abs(to - from);
    let numberOfUpdates = Math.min(distance, 50);
    let delay = interval / numberOfUpdates;
    let sign = from - to < 0 ? "positive" : "negative";

    let slowDownPoint = 0;
    let stepValue = 0;

    if (slowDownEnabled) {
      if (sign == "positive") {
        slowDownPoint = Math.max(from, to - slowDownDistance);
      } else {
        slowDownPoint = Math.min(from, to + slowDownDistance);
      }
      stepValue = Math.abs(slowDownPoint - from) / numberOfUpdates;
    } else {
      stepValue = Math.abs(to - from) / numberOfUpdates;
    }

    this.setState(
      {
        current: from,
        numberOfUpdatesLeft: numberOfUpdates,
        stepValue: stepValue,
        delay: delay,
      },
      sign == "positive" ? this.countUp : this.countDown
    );
  };

  onComplete = () => {
    this.props.onComplete();
  };

  countUp = () => {
    const { to, slowDownDistance, slowDownInterval } = this.props;
    const { numberOfUpdatesLeft, current, stepValue, delay } = this.state;
   
 if (numberOfUpdatesLeft > 0) {
      this.setState({
        current: current + stepValue,
        numberOfUpdatesLeft: numberOfUpdatesLeft - 1,
      });
      this.timer = setTimeout(this.countUp, delay);
    } else if (Math.round(current) < to) {
      this.setState({ current: current + 1 });

      this.timer = setTimeout(
        this.countUp,
        slowDownInterval / slowDownDistance
      );
    } else {
      this.onComplete();
    }
  };

  countDown = () => {
    const { to, slowDownDistance, slowDownInterval } = this.props;
    const { numberOfUpdatesLeft, current, stepValue, delay } = this.state;

    if (numberOfUpdatesLeft > 0) {
      this.setState({
        current: current - stepValue,
        numberOfUpdatesLeft: numberOfUpdatesLeft - 1,
      });
      this.timer = setTimeout(this.countDown, delay);
    } else if (Math.round(current) > to) {
      this.setState({ current: current - 1 });
      this.timeOut = setTimeout(
        this.countDown,
        slowDownInterval / slowDownDistance
      );
    } else {
      this.onComplete();
    }
  };

  render() {
    const { containerStyle, style } = this.props;
    const { current } = this.state;

    return (
      <View style={containerStyle}>
        <Text style={style}>{Math.round(current)}</Text>
      </View>
    );
  }
}

CountTo.propTypes = {
  to: PropTypes.number.isRequired,
  from: PropTypes.number,
  interval: PropTypes.number,
  slowDownInterval: PropTypes.number,
  slowDownDistance: PropTypes.number,
  slowDownEnabled: PropTypes.bool,
  style: PropTypes.any,
  containerStyle: PropTypes.any,
  onComplete: PropTypes.func,
};

CountTo.defaultProps = {
  from: 0,
  interval: 500,
  slowDownInterval: 1200,
  slowDownDistance: 3,
  slowDownEnabled: false,
  style: {},
  containerStyle: {},
  onComplete: () => {},
};

export default CountTo;
