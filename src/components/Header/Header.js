import React from 'react'
import { Auth } from 'aws-amplify';

import styles from '../../styles';

export default function Header(props) {
  const signOut = () => {
    // Uses amplify function to sign out
    Auth.signOut()
      .then(data => {
        console.log('signed out: ', data)
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={styles.header}>
      <div style={{ float: 'left' }}>
        <p style={styles.headerText}>Catector</p>
      </div>
      <div style={{ float: 'right', paddingTop: 25 }}>
        {
          props.user && props.user.signInUserSession && (
            <div>
              {props.user.signInUserSession.idToken.payload["cognito:username"]} - <span style={styles.anchor} onClick={signOut}>Sign Out</span>
            </div>
          )
        }
      </div>
    </div>
  )
}
