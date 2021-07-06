import { useState, Fragment, useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { InitialData } from '../actions/shared';

import TopBar from './TopBar';
import Footer from './Footer';

import List from './List'
import New from './New';
import Vote from './Vote';
import Board from './Board';
import Login from './Login';
import NotFound from './NotFound';

function App(props) {
  const [Index, setIndex] = useState(0);

  const handleTabChange = ({ activeIndex }) => {
    setIndex(activeIndex);
  };

  const resetIndexToZero = () => {
    setIndex(0);
  };

  const history = useHistory();

  useEffect(() => {
    const { InitialData } = props;
    InitialData();
  }, [props]);

  const { User } = props;
  if (!User) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Fragment>
        <TopBar />
        <div className="ui main text container" style={{ margin: '5em' }}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <List
                    handleTabChange={handleTabChange}
                    activeIndex={Index}
                  />
                );
              }}
            />
            <Route
              path="/add"
              render={() => {
                return (
                  <New
                    resetIndexToZero={resetIndexToZero}
                    history={history}
                  />
                );
              }}
            />
            <Route path="/questions/:question_id" component={Vote} />
            <Route path="/Board" component={Board} />
            <Route path="/404" component={NotFound} />
            <Route path="/" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Fragment>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  const { User } = state;
  return { User };
};

export default connect(mapStateToProps, { InitialData })(App);
