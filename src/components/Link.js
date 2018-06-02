import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Link extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.link.title} ({this.props.link.url})
        </div>
      </div>
    )
  }
}

Link.propTypes = {
  link: PropTypes.object.isRequired
};
export default Link
