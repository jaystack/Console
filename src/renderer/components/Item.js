import React from 'react';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const URL_PATTERN = /(<((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?>)/g;
const HERE_PATTERN = /<!here>/g;
const CHANNEL_PATTERN = /<!channel>/g;

export default class extends React.PureComponent {
  render() {
    const { item } = this.props;
    const date = new Date(item.created);
    return (
      <Card className="item">
        <CardHeader
          avatar={<Avatar src="static/slack-logo.png" />}
          title={item.userName}
          classes={{ subheader: 'subheader', root: 'header-root' }}
          subheader={
            <div>
              <span title={date.toLocaleString()}>
                <b>{moment(date).fromNow()}</b>
              </span>
              <br />
              <span>{item.channelName ? '#' + item.channelName : item.channelId}</span>
            </div>
          }
        />
        <CardContent>
          <Typography component="p" dangerouslySetInnerHTML={{ __html: prepareContent(item.content) }} />
        </CardContent>
      </Card>
    );
  }
}

const prepareContent = content => {
  return content
    .replace(URL_PATTERN, (_, match) => {
      const url = match.replace(/^</, '').replace(/>$/, '');
      return `<a target="_blank" href="${url}">${url}</a>`;
    })
    .replace(HERE_PATTERN, '<b>@here</b>')
    .replace(CHANNEL_PATTERN, '<b>@channel</b>');
};
