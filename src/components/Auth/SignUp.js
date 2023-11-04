import React, { useState } from 'react'
import { Auth } from 'aws-amplify';

import styles from '../../styles';

export default function SignUp(props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      // Sign up with amplify api and update form states
      await Auth.signUp({
        username, password, attributes: { email }
      });
      props.updateFormType('confirmSignUp');
      props.updateUsername(username);
    } catch (err) {
      console.log('error signing up..', err);
    }
  };

  return (
    <div style={styles.content}>
      <div>
        <label style={styles.label}>Email:</label>
        <input
          onChange={e => { e.persist(); setEmail(e.target.value); }}
          style={styles.input}
          autoComplete="off"
        />
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
        <button onClick={signUp} style={styles.button}>
          Sign Up
        </button> or &nbsp;<span style={styles.anchor} onClick={() => props.updateFormType('signIn')}>Sign In</span>
      </div>
    </div>
  );
}
