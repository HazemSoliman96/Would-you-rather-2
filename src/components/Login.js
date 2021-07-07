import { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../actions/UserAction';
import { Dropdown, Image, Message } from 'semantic-ui-react';

class Login extends Component {
  state = {
    selectedUser: null,
    message: { hidden: true, content: '' }
  };
  referrer = null;

  componentDidMount() {
    const {
      history,
      location: { pathname }
    } = this.props;
    this.referrer = pathname;
    history.push('/login');
  }

  UserSelection = (event, data) => {
    this.setState({ selectedUser: data.value });
  };

  UserLogin = () => {
    const { history } = this.props;
    if (!this.state.selectedUser) {
      this.setState({
        message: {
          hidden: false,
          content: 'Please select a user'
        }
      });
      return;
    } else {
      this.setState({
        message: {
          hidden: true,
          content: ''
        }
      });
    }

    this.props.setUser(this.state.selectedUser);
    if (this.referrer === '/logout' || this.referrer === '/login') {
      history.push('/');
    } else {
      history.push(this.referrer);
    }
  };

  render() {
    const { users } = this.props;
    if (!users) {
      return;
    }

    const Options = Object.keys(users).map((userId) => ({
      key: userId,
      value: userId,
      text: users[userId].name,
      image: { avatar: true, src: users[userId].avatarURL }
    }));

    const { message } = this.state;

    return (
      <div className="ui container">
        <div className="ui aligned center">
          <div className="column">
            <Image
              src="would-you-rather.png"
              style={{
                position: 'absolute',
                left: '35px',
                width: '80px'
              }}
            />
            <h2 className="black header">
              <div className="content">Log-in</div>
            </h2>
            <form className="large form">
              <div className="segment">
                <div className="field">
                  <div className="dropdown">
                    <div className="menu">
                      <Dropdown
                        placeholder="Select a User"
                        fluid
                        selection
                        options={Options}
                        onChange={this.UserSelection}
                      />
                    </div>
                    <Message hidden={message.hidden} negative>
                      {message.content}
                    </Message>
                    <div className="field">Select a user.</div>
                    <div
                      className="submit ui button"
                      onClick={this.UserLogin}
                    >
                      Login
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return { users };
};

export default connect(mapStateToProps, { setUser })(Login);
