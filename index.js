import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import TopStories from './modules/TopStories'
import Author from './modules/Author'

render((
  <Router history={browserHistory}>
    <Route path="/" component={TopStories}/>
    <Route path="/author/:authorName" component={Author}/>
  </Router>
), document.getElementById('app'))
