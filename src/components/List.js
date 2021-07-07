import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Menu, Tab } from 'semantic-ui-react';



function QuestionList(props) {
  const getCards = (filter) => {
    const { questions, users } = props;
    const cards = Object.keys(questions)
      .filter(filter)
      .map((id) => {
        const question = questions[id];
        const user = users[question.author];
        return (
          <Card
            key={id}
            image={user.avatarURL}
            header={user.name}
            description={'Would you rather ' + question.optionOne.text + ' or '
                        + question.optionTwo.text + '?' }
            extra={<div className="ui two buttons">
                <Link to={`/questions/${id}`} style={{ width: '100%' }}>
                  <Button fluid basic color="black">
                    Vote
                  </Button>
                </Link>
              </div>}
          />
        );
      });

    return cards.length
      ? [cards.length, <Card.Group itemsPerRow={2}>{cards}</Card.Group>]
      : [cards.length];
  };

  const { questions, User, Index, handleTabChange } = props;

  const [
    unansweredQuestions,
    unansweredQuestionsContent = 'There are no unanswered Questions.'
  ] = getCards(
    (id) =>
      !questions[id].optionOne.votes.includes(User) &&
      !questions[id].optionTwo.votes.includes(User)
  );

  const [
    answeredQuestions,
    answeredQuestionsContent = 'There are no answered questions available.'
  ] = getCards(
    (qid) =>
      questions[qid].optionOne.votes.includes(User) ||
      questions[qid].optionTwo.votes.includes(User)
  );

  const panes = [
    {
      menuItem: (
        <Menu.Item key="unanswered-questions">
          Unanswered Questions {unansweredQuestions}
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{unansweredQuestionsContent}</Tab.Pane>
    },
    {
      menuItem: (
        <Menu.Item key="answered-questions">
          Answered Questions {answeredQuestions}
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{answeredQuestionsContent}</Tab.Pane>
    }
  ];

  return (
    <div>
      <div>
        <Tab
          panes={panes}
          activeIndex={Index}
          onTabChange={(e, data) => handleTabChange(e, data)}
        />
      </div>
    </div>
  );
}

const sortQuestions = (questions) => {
  const questionsSorted = {};
  Object.keys(questions)
    .map((key) => questions[key])
    .sort((a, b) => b.timestamp - a.timestamp)
    .forEach((question) => {
      questionsSorted[question.id] = question;
    });
  return questionsSorted;
};

const mapStateToProps = (state) => {
  return {
    questions: sortQuestions(state.questions),
    users: state.users,
    User: state.User
  };
};

export default connect(mapStateToProps)(QuestionList);
