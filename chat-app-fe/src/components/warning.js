import React from 'react';
import {compose, withPropsOnChange} from 'recompose';

const Warning = ({warn}) => warn && <h2>Green is not a creative color!</h2>;

const contains = (props, str) => props.message.indexOf('green') > -1;
const tocheck = 'green';

export default compose(
  withPropsOnChange(
    (props, nextProps) => contains(nextProps, tocheck) ||
      (contains(props, tocheck) && !contains(nextProps, tocheck)),
    props => contains(props, tocheck) ? {...props, warn: true} : {...props, warn: false}
  )
)(Warning);