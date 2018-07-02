import React from 'react';
import Card from '@material-ui/core/Card';
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
        <CardContent>
          <Typography color="textSecondary">{item.channelName ? '#' + item.channelName : item.channelId}</Typography>
          <Typography variant="headline" component="h2">
            {item.userName}
          </Typography>
          <Typography color="textSecondary">
            <b>{moment(date).fromNow()}</b> - {date.toLocaleString()}
          </Typography>
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
