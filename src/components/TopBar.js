import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Image from 'material-ui-image';

function TopBar(props) {
  const { users, User } = props;
  const { name, avatarURL } = users[User];

  return (
    <div className="nav-wrapper">
      <NavLink to="/" exact className="brand-logo">
        <Image
          src="/would-you-rather.png"
          style={{ width: '55px', margin: '5px' }}
        />
        Home
      </NavLink>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <NavLink to="/add" exact>
          Add
        </NavLink>
        <NavLink to="/leaderboard" exact>
          Board
        </NavLink>
        <div className="ui right floated item">
          <span style={{ margin: '15px' }}>Welcome, {name}</span>
          <Avatar alt={name} src={avatarURL} />
        </div>
        <NavLink to="/Login" exact>
          <i class="material-icons">logout</i>
        </NavLink>
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { User, users } = state;
  return { User: User, users: users };
};

export default connect(mapStateToProps)(TopBar);
