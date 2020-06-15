import { IonContent, IonList, IonListHeader, IonMenu, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import menu_config from '../../config/menu_config';
import MenuItem from '../MenuItem';
import './style.css';
import { chevronBackOutline, chevronBackSharp } from 'ionicons/icons';
import { logOut } from './../../services/auth';
import assets from './../../config/assets';
import IMenu from '../../interfaces/IMenu';
import { Redirect } from 'react-router';


const Menu: React.FC<IMenu> = ({ firstName = 'unknown', lastName = 'unknown', image = assets.anonym }) => {
  const location = useLocation();
  const [list, setList] = useState<JSX.Element[]>([]);
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    const newList = menu_config.map((appPage, index) => <MenuItem key={index} page={appPage} location={location} />);
    setList(newList);
  }, [location])

  function out() { logOut().then(() => setRedirect(true)); }

  if(redirect) { return <Redirect exact to="/login" />}

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            <img src={image} className="menu-avatar" alt="avatar" />
          </IonListHeader>
          <IonNote className="menu-info">
            <p>{firstName} {lastName}</p>
          </IonNote>
          {list}
          <IonMenuToggle autoHide={false}>
            <IonItem routerDirection="none" lines="none" detail={false} onClick={out}>
              <IonIcon slot="start" ios={chevronBackOutline} md={chevronBackSharp} />
              <IonLabel>Log Out</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
