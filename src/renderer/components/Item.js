import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

export default class extends React.PureComponent {
  render() {
    const { item } = this.props;
    const date = new Date(item.created * 1000);
    return (
      <Card className="item">
        <CardContent>
          <Typography color="textSecondary">{item.channelName ? '#' + item.channelName : item.channel_id}</Typography>
          <Typography variant="headline" component="h2">
            {item.user}
          </Typography>
          <Typography color="textSecondary">
            <b>{moment(date).fromNow()}</b> - {date.toLocaleString()}
          </Typography>
          <Typography component="p">{item.content}</Typography>
        </CardContent>
      </Card>
    );
  }
}
