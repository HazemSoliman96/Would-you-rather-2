import { connect } from 'react-redux';
import { handleAnswer } from '../actions/shared';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Image, Message, Progress } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function Vote(props) {
  const [vote, setVote] = useState(null);
  const [message, setMessage] = useState({ hidden: true, content: '' });
  const { push } = useHistory();

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
      <div className="ui cards">
        <div className="card">
          <div className="content">
            <img
              className="right floated mini ui image"
              src={user.avatarURL}
              alt=""
            />
            <div className="header">{user.name}</div>
            <div className="description">asks would you rather</div>
            <div className="extra content">
              <div className="ui two segments">
                
                
                  <Progress percent={PercentOptionOne} progress>
                {CountOptionOne} out of {totalVotes} votes
              </Progress>
                  <div className="bar"></div>
                  {votesOptionOne && (
                    <div className="floating ui green label">Your Vote</div>
                  )}
                </div>

                {console.log(votesOptionTwo)}
                  <Progress percent={PercentOptionTwo} progress>
                {CountOptionTwo} out of {totalVotes} votes
              </Progress>
                  <div className="bar"></div>
                  {votesOptionTwo && (
                    <div className="floating ui green label">Your Vote</div>
                  )}
                  
                </div>
              </div>
            </div>
          </div>
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
      <form className="ui form">
        <Image floated="right" size="tiny" src={user.avatarURL} />
        <div className="grouped fields">
          <label htmlFor="fruit">{user.name} asks Would you rather</label>
          <div className="field">
            <div className="ui radio checkbox">
              <input
                name="radioVote"
                value="optionOne"
                checked={vote === 'optionOne'}
                onChange={handleChange}
                type="radio"
              />
              <label>{question.optionOne.text}</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">
              <input
                name="radioVote"
                value="optionTwo"
                checked={vote === 'optionTwo'}
                onChange={handleChange}
                type="radio"
              />
              <label>{question.optionTwo.text}</label>
            </div>
          </div>
        </div>
        <Message hidden={message.hidden} negative>
          {message.content}
        </Message>
        <button className="ui button" type="submit" onClick={handleClick}>
          Submit
        </button>
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
  return <div className="card-group">{result}</div>;
}

const mapStateToProps = (state) => {
  return {
    User: state.User,
    questions: state.questions,
    users: state.users
  };
};

export default connect(mapStateToProps, { handleAnswer })(Vote);
