import React, { useReducer, useEffect } from 'react';
import { Hub, Auth } from 'aws-amplify';

import Header from './components/Header/Header';
import Form from './components/Auth/Form';
import Detector from './components/Detector/Detector';

import styles from './styles';
import './App.css';

const initialUserState = { user: null, loading: true }

function App() {
  const [userState, dispatch] = useReducer(reducer, initialUserState)

  useEffect(() => {
    // Connects amplify auth event to be synchronized
    Hub.listen('auth', (data) => {
      const { payload } = data
      if (payload.event === 'signIn') {
        setImmediate(() => dispatch({ type: 'setUser', user: payload.data }))
      }

      if (payload.event === 'signOut') {
        setTimeout(() => dispatch({ type: 'setUser', user: null }), 350)
      }
    });

    // Checks user authentication state when app loaded
    checkUser(dispatch);
  }, []);

  return (
    <div style={styles.appContainer}>
      <div style={styles.container}>
        <Header user={userState.user} />
        {
          userState.loading && (
            <div style={styles.body}>
              <p>Loading...</p>
            </div>
          )
        }
        {
          !userState.user && !userState.loading && (
            <Form />
          )
        }
        {
          userState.user && !userState.loading && (
            <Detector />
          )
        }
      </div>
    </div>
  )
}

function reducer(state, action) {
  switch (action.type) {
    case 'setUser':
      return { ...state, user: action.user, loading: false }
    case 'loaded':
      return { ...state, loading: false }
    default:
      return state
  }
}

async function checkUser(dispatch) {
  try {
    // Finds current user who is authenticated and sets
    const user = await Auth.currentAuthenticatedUser()
    dispatch({ type: 'setUser', user })
  } catch (err) {
    console.log('err: ', err)
    dispatch({ type: 'loaded' })
  }
}

export default App;
