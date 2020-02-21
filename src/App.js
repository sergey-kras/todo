import React, { useState } from 'react';
import GoogleCalendar from './googleCalendar';
import { Login } from './login';
import { getItems } from './api';

async function checkAuth() {
  const items = await getItems();
  return items.status === 200;
}

function App (props) {
  const [isLogin, setIsLogin] = useState(false);
  checkAuth()
    .then(data => {
      setIsLogin(data);
    })
    .catch(err => {
      setIsLogin(false);
    });

  return isLogin ? <GoogleCalendar/> : <Login setIsLogin={setIsLogin} />;
}

export default App;
