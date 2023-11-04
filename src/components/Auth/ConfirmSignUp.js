import React, { useState } from 'react'
import { Auth } from 'aws-amplify';

import styles from '../../styles';

export default function ConfirmSignUp(props) {
  const [confirmationCode, setConfirmationCode] = useState('');

  const confirmSignUp = async () => {
    try {
      // Confirm sign up with amplify api and update form states
      await Auth.confirmSignUp(props.username, confirmationCode);
      props.updateFormType('signIn');
    } catch (err) {
      console.log('error signing up..', err);
    }
  };

  return (
    <div style={styles.content}>
      <div>
        <label style={styles.label}>Code:</label>
        <input
          onChange={e => { e.persist(); setConfirmationCode(e.target.value); }}
          style={styles.input}
          autoComplete="off"
        />
        <button onClick={confirmSignUp} style={styles.button}>
          Confirm
        </button>
      </div>
    </div>
  );
}
