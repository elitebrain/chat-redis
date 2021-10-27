import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Index from './pages';
import ChatList from './pages/chat-list';
import Chat from './pages/chat/[roomId]';
import Members from './pages/members';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/chat-list" component={ChatList} />
        <Route path="/chat/:roomId" component={Chat} />
        <Route path="/members" component={Members} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
