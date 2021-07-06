import { useState } from 'react';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/shared';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0)
  }
}));

function New(props) {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [message, setMessage] = useState({ hidden: true, content: '' });
  const { push } = useHistory();
  const classes = useStyles();

  const handleOnChangeOne = (e, data) => {
    setOptionOne(data.value);
  };

  const handleOnChangeTwo = (e, data) => {
    setOptionTwo(data.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { User: author, resetIndexToZero } = props;

    if (!optionOne || !optionTwo) {
      setMessage({
        hidden: false,
        content: 'Please enter the Options.'
      });
      return;
    } else {
      setMessage({
        hidden: true,
        content: ''
      });
    }
    props.handleSaveQuestion({
      optionOne,
      optionTwo,
      author
    });
    resetIndexToZero();
    push('/');
  };

  const { User, users } = props;
  const user = users[User];

  return (
    <Box display="flex" alignItems="center">
      <Avatar alt={user.name} src={user.avatarURL} />
      <Typography variant="subtitle1" color="textPrimary">
        {user.name} asks Would You Rather
      </Typography>
      <form onSubmit={handleClick}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="optionOne">Amount</InputLabel>
            <OutlinedInput
              id="optionOne"
              value={optionOne}
              onChange={handleOnChangeOne}
              placeholder="Enter Option One Text Here"
              labelWidth={60}
            />
          </FormControl>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="optionTwo">Amount</InputLabel>
            <OutlinedInput
              id="optionTwo"
              value={optionTwo}
              onChange={handleOnChangeTwo}
              labelWidth={60}
            />
          </FormControl>
          <Snackbar open={message.hidden}>
            <Alert severity="error">{message.content}</Alert>
          </Snackbar>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            Create
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return { users: state.users, User: state.User };
};

export default connect(mapStateToProps, { handleSaveQuestion })(New);
