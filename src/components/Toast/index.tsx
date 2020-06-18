import React, { useState, useEffect } from 'react';
import { IonToast } from '@ionic/react';
import { getToastStore, close } from '../../services/toast';
import IToastStore from '../../interfaces/IToastStore';

export const Toast: React.FC = () => {
  const [state, setState] = useState<IToastStore>();

  useEffect(() => {
    const sub = getToastStore().subscribe(setState);
    return () => { sub.unsubscribe(); }
  }, [])

  function removeMessage() { close(); }

  return (
      <IonToast
        isOpen={state?.isOpen || false}
        onDidDismiss={removeMessage}
        message={state?.message}
        duration={3000}
      />
  );
};