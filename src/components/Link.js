import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'url-polyfill';
import { Feed } from 'semantic-ui-react';

class Link extends Component {
  render() {
    const url = new URL(this.props.link.url);
    const domain = url.hostname;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`;
    return (
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <img style={{width:'auto', height: 'auto'}} src={faviconUrl} /><a href={this.props.link.url}>{this.props.link.title}</a>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

Link.propTypes = {
  link: PropTypes.object.isRequired
};
export default Link;
