var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
import Main from '../components/Main';
import Home from "../components/Home";
import Form from '../components/Form';
import Header from '../components/Header';
import DishWell from '../components/DishWell';
import FormContainer from '../containers/FormContainer';



var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Home}>
      <IndexRoute component={Main} />
      <Route path='form' component={Form} />
    </Route>
  </Router>
);

module.exports = routes;


