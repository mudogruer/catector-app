import React, { useState } from 'react'
import { Auth } from 'aws-amplify';

import styles from '../../styles';

export default function SignIn(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      // Sign in with amplify api
      await Auth.signIn(username, password);
    } catch (err) {
      console.log('error signing up..', err);
    }
  };

  return (
    <div style={styles.content}>
      <div>
        <label style={styles.label}>Username:</label>
        <input
          onChange={e => { e.persist(); setUsername(e.target.value); }}
          style={styles.input}
          autoComplete="off"
        />
        <label style={styles.label}>Password:</label>
        <input
          type='password'
          onChange={e => { e.persist(); setPassword(e.target.value); }}
          style={styles.input}
          autoComplete="off"
        />
        <button style={styles.button} onClick={signIn}>
          Sign In
        </button> or &nbsp;<span style={styles.anchor} onClick={() => props.updateFormType('signUp')}>Sign Up</span>
      </div>
    </div>
  );
}
