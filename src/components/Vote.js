import { connect } from 'react-redux';
import { handleAnswer } from '../actions/shared';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0)
  }
}));

function Vote(props) {
  const [vote, setVote] = useState(null);
  const [message, setMessage] = useState({ hidden: true, content: '' });
  const { push } = useHistory();
  const classes = useStyles();

  const handleChange = (e) => {
    setVote(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!vote) {
      setMessage({
        hidden: false,
        content: 'Please select an option'
      });
      return;
    } else {
      setMessage({
        hidden: true,
        content: ''
      });
    }

    const id = props.match.params.question_id;
    const answer = vote;
    const { User, handleAnswer } = props;
    handleAnswer({ User, id, answer });
  };

  const questionResult = () => {
    const id = props.match.params.question_id;
    const { User, questions, users } = props;

    const question = questions[id];
    if (!question) {
      return;
    }

    const user = users[question.author];

    const votesOptionOne = question.optionOne.votes.includes(User);
    const votesOptionTwo = question.optionTwo.votes.includes(User);
    const CountOptionOne = question.optionOne.votes.length;
    const CountOptionTwo = question.optionTwo.votes.length;
    const totalVotes = CountOptionOne + CountOptionTwo;
    const PercentOptionOne =
      Math.round((CountOptionOne / totalVotes) * 10000) / 100;
    const PercentOptionTwo =
      Math.round((CountOptionTwo / totalVotes) * 10000) / 100;

    return (
      <Box display="flex" alignItems="center">
        <Avatar alt={user.name} src={user.avatarURL} /> {user.name} asks Would
        You Rather
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            {votesOptionOne && (
              <Badge badgeContent={'YourVote'} color="secondary"></Badge>
            )}
            <Typography variant="subtitle1" color="textPrimary">
              {question.optionOne.text}
            </Typography>
            <LinearProgress variant="determinate" value={PercentOptionOne} />
            <Typography variant="body2" color="textSecondary">
              {CountOptionOne} out of {totalVotes} votes
            </Typography>
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${Math.round(
              props.value
            )}%`}</Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            {votesOptionTwo && (
              <Badge badgeContent={'YourVote'} color="secondary"></Badge>
            )}
            <Typography variant="subtitle1" color="textPrimary">
              {question.optionTwo.text}
            </Typography>
            <LinearProgress variant="determinate" value={PercentOptionTwo} />
            <Typography variant="body2" color="textSecondary">
              {CountOptionTwo} out of {totalVotes} votes
            </Typography>
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${Math.round(
              props.value
            )}%`}</Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  const questionAnswer = () => {
    const id = props.match.params.question_id;
    const { questions, users } = props;

    const question = questions[id];
    if (!question) {
      return;
    }

    const user = users[question.author];

    return (
      <form onSubmit={handleClick}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">
            <Avatar alt={user.name} src={user.avatarURL} /> {user.name} asks
            Would You Rather
          </FormLabel>
          <RadioGroup
            aria-label="quiz"
            name="quiz"
            value="options"
            onChange={handleChange}
          >
            <FormControlLabel
              value="best"
              control={<Radio />}
              label="The best!"
            />
            <FormControlLabel
              value="worst"
              control={<Radio />}
              label="The worst."
            />
          </RadioGroup>
          <FormHelperText>'Choose wisely</FormHelperText>
          <Snackbar open={message.hidden}>
            <Alert severity="error">
              {message.content}
            </Alert>
          </Snackbar>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            Vote
          </Button>
        </FormControl>
      </form>
    );
  };

  const didAnswer = () => {
    const { User, questions } = props;
    const id = props.match.params.question_id;

    const question = questions[id];
    if (!question) {
      return null;
    }

    return (
      question.optionOne.votes.includes(User) ||
      question.optionTwo.votes.includes(User)
    );
  };

  useEffect(() => {
    const { questions } = props;
    const id = props.match.params.question_id;

    const question = questions[id];
    if (!question) {
      push('/404');
    }
  }, [props, push]);

  let result;
  if (didAnswer() === true) {
    result = questionResult();
  } else {
    result = questionAnswer();
  }
  return <Box>{result}</Box>;
}

const mapStateToProps = (state) => {
  return {
    User: state.User,
    questions: state.questions,
    users: state.users
  };
};

export default connect(mapStateToProps, { handleAnswer })(Vote);
