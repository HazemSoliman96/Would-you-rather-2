import { useState } from 'react';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/shared';
import { useHistory } from 'react-router-dom';
import { Button, Form, Image, Input, Message } from 'semantic-ui-react';

function New(props) {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [message, setMessage] = useState({ hidden: true, content: '' });
  const { push } = useHistory();

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
    <Form>
      <Image size="tiny" src={user.avatarURL} />
      <label>{user.name} asks</label>
      <div>Would you rather</div>
      <Form.Field>
        <label>First Name</label>
        <Input
          id="optionOne"
          placeholder="Enter Option One"
          value={optionOne}
          onChange={handleOnChangeOne}
        />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <Input
          id="optionTwo"
          placeholder="Enter Option One Text Here"
          value={optionTwo}
          onChange={handleOnChangeTwo}
        />
      </Form.Field>
      <Message hidden={message.hidden} negative>
        {message.content}
      </Message>
      <Button type="submit" onClick={handleClick}>Submit</Button>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return { users: state.users, User: state.User };
};

export default connect(mapStateToProps, { handleSaveQuestion })(New);
