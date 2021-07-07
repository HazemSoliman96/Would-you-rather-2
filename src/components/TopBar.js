import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';

function TopBar(props) {
  const { users, User } = props;
  const { name, avatarURL } = users[User];

  return (
    <div className="ui fixed menu">
      <div className="ui container">
        <div className="item" />
        <NavLink to="/" exact className="item header">
          <Image
            src="/would-you-rather.png"
            style={{ width: '55px', margin: '5px' }}
          />
        </NavLink>
        <NavLink to="/add" exact className="item" activeClassName="active">
          New
        </NavLink>
        <NavLink
          to="/Board"
          exact
          className="item"
          activeClassName="active"
        >
          Board
        </NavLink>
        <div className="ui right floated item">
          <span style={{ margin: '10px' }}>Hello, {name}</span>
          <img className="ui avatar image" src={avatarURL} alt="" />
        </div>
        <NavLink to="/logout" exact className="item" activeClassName="active">
          Logout
        </NavLink>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { User, users } = state;
  return { User: User, users: users };
};

export default connect(mapStateToProps)(TopBar);
