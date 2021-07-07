import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


function Board(props) {
  const { users } = props;

  const awardColors = ['red', 'blue', 'green'];
  let rank = 0;
  let rankSuffix = ['1st', '2nd', '3rd'];
  const scoreSorted = {};

  Object.keys(users)
    .map((id) => users[id])
    .sort((a, b) => b.score - a.score)
    .forEach((user) => {
      scoreSorted[user.id] = user;
    });


  const userCards = Object.keys(scoreSorted).map((id) => {
    const user = scoreSorted[id];
    let label = null;
    let awardColor = awardColors[rank++];

    if (awardColor) {
      label = {
        as: 'a',
        corner: 'left',
        icon: 'ribbon',
        color: awardColor
      };
    }
    const answer = Object.keys(user.answers).length;
    const question = user.questions.length;
    const score = answer + question;

    return (
      <Card
      key={user.name}
    image={user.avatarURL}
    label= {label}
    header={user.name}
    meta={"Rank "  + (rankSuffix.shift() || 'th' )}
    description={ "Answered: " + answer
                  + '\u000A'
                  + "Created: " + question}
    extra={"Score " + score}
  />
    );
  });
  return <div className="card-group">{userCards}</div>;
}

const mapStateToProps = (state) => {
  return { users: state.users };
};

export default connect(mapStateToProps)(Board);
