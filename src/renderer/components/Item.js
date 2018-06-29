import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default class extends React.PureComponent {
  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <Card className="item">
        <CardContent>
          <Typography color="textSecondary">{item.channel_id}</Typography>
          <Typography variant="headline" component="h2">
            {item.user}
          </Typography>
          <Typography color="textSecondary">{new Date(item.created * 1000).toLocaleString()}</Typography>
          <Typography component="p">{item.content}</Typography>
        </CardContent>
      </Card>
    );
  }
}
