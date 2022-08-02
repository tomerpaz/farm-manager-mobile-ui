import React from 'react';
import Iframe from 'react-iframe'
import { height80 } from '../../utils';
import { withRouter } from 'react-router-dom'


const ExternalLink = (props) => {

  const { links, match: { params: { id } }, } = props;
  const link = links.find(e => '' + e.id === id);

  if (link) {
    return (
      <Iframe
        url={link.url}
        frameBorder="0"
        width="100%"
        height={height80}
        id="myId"
        display="initial"
        position="relative" />
    )
  }

  return <div></div>
}
export default withRouter(ExternalLink);



