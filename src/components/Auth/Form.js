import React, { useState } from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';

export default function Form() {
  const [formType, updateFormType] = useState('signIn');
  const [username, updateUsername] = useState('');

  function renderForm() {
    switch (formType) {
      case 'signUp':
        return (
          <SignUp
            updateFormType={e => updateFormType(e)}
            updateUsername={e => updateUsername(e)}
          />
        );
      case 'confirmSignUp':
        return (
          <ConfirmSignUp
            username={username}
            updateFormType={e => updateFormType(e)}
          />
        );
      case 'signIn':
        return (
          <SignIn
            updateFormType={e => updateFormType(e)}
          />
        );
      default:
        return null
    }
  }

  return (
    <div>
      <div>
        {renderForm()}
      </div>
    </div>
  )
}
