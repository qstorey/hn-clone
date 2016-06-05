import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import TopStories from './modules/TopStories'

render((
  <Router history={browserHistory}>
    <Route path="/" component={TopStories} addHandlerKey={true}/>
  </Router>
), document.getElementById('app'))
