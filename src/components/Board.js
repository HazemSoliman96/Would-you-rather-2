import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AssistantIcon from '@material-ui/icons/Assistant';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}));

function Board(props) {
  const { users } = props;

  const awardColors = ['red', 'blue', 'green'];
  let rank = 0;
  const scoreSorted = {};

  Object.keys(users)
    .map((id) => users[id])
    .sort((a, b) => b.score - a.score)
    .forEach((user) => {
      scoreSorted[user.id] = user;
    });

  const classes = useStyles();

  const userCards = Object.keys(scoreSorted).map((id) => {
    const user = scoreSorted[id];
    let label = null;
    let awardColor = awardColors[rank++];

    if (awardColor) {
      label = {
        as: 'div',
        corner: 'left',
        icon: 'trophy',
        color: awardColor
      };
    }
    const answer = Object.keys(user.answers).length;
    const question = user.questions.length;
    const score = answer + question;

    return (
      <List className={classes.root}>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {label && <AssistantIcon color={label.color} />}
            <Avatar alt={user.name} src={user.avatarURL} />
          </ListItemAvatar>
          <ListItemText
            primary={rank}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  score: {score}
                </Typography>
                Answered: {answer}
                <br />
                Created: {question}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    );
  });
  return <div>{userCards}</div>;
}

const mapStateToProps = (state) => {
  return { users: state.users };
};

export default connect(mapStateToProps)(Board);
