import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { line } from '../reducers/lines';

export class Track extends React.Component {
  static propTypes = {
    track: PropTypes.object,
    line: PropTypes.object,
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { track } = this.props;

    const path = 'M' + [track.x1, track.y1, track.x2, track.y2].join(' ');
    const strokeWidth = 0;

    return (
      <g className='track' id={this.props.track.id}>
        <path
          d={path}
          stroke={'black'}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          fill="none"
        />
      </g>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { lineId } = ownProps.track;
  return {
    line: line(state.lines, lineId),
  };
}

export default connect(mapStateToProps)(Track);