import { injectable, inject } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

// React Router
import { history } from '../App';

// Interfaces
import { IRoute, IAppPage, IFabMenuItem } from '../interfaces/interfaces';

// Components
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Search } from '../pages/Search';
import { MyPublications } from '../pages/MyPublications';
import { Details } from '../pages/Details';
import { Messages } from '../pages/Messages';
import { CreatePublication } from '../pages/CreatePublication';
import { Chat } from '../pages/Chat';
import { Account } from '../pages/Account';

// DI Types
import type from '../Types';

// Managers
import { AuthManager } from './AuthManager';
import { ValidationManager } from './ValidationManager';
import { MessageManager } from './MessageManager';
import { PublicationsManager } from './PublicationsManager';
import { PixabayManager } from './PixabayManager';
import { ChatManager } from './ChatManager';

// Icons
import {
  searchOutline,
  searchSharp,
  addOutline,
  addSharp,
  albumsOutline,
  albumsSharp,
  chatbubbleEllipsesOutline,
  chatbubbleEllipsesSharp,
  personOutline,
  personSharp
} from 'ionicons/icons';


@injectable()
export class RouterManager {
  @observable
  routes: IRoute[] = [];

  @observable
  menu: IAppPage[] = []

  @observable
  fabMenu: IFabMenuItem[] = []

  @observable
  isAuth: boolean = true;

  @observable
  pathname: string = '';

  @inject(type.ValidationManager)
  validationManager!: ValidationManager;

  @inject(type.MessageManager)
  messageManager!: MessageManager;

  @inject(type.AuthManager)
  authManager!: AuthManager;

  @inject(type.PublicationsManager)
  publicationsManager!: PublicationsManager;

  @inject(type.PixabayManager)
  pixabayManager!: PixabayManager;

  @inject(type.ChatManager)
  chatManager!: ChatManager;

  authPage = '/search';
  unauthPage = '/login';
  unauthPages = ['/login', '/register'];

  constructor() {
    makeObservable(this);
  }

  @action
  init() {
    this.setRoutes();
    this.setMenu();
    this.setFabMenu();
    this.pathname = history.location.pathname

    history.listen(location => {
      this.setPathname(location.pathname);
    })

    this.authManager.userObserver.subscribe(user => {
      if (this.authManager.isLoading) {
        return;
      }

      if (user && this.unauthPages.includes(this.pathname)) {
        history.push(this.authPage);
      }

      if (!user && !this.unauthPages.includes(this.pathname)) {
        history.push(this.unauthPage);
      }
    })
  }

  @action
  setPathname(path: string) {
    this.pathname = path;
  }

  @action
  push(route: string) {
    history.push(route);
  }

  @action
  setRoutes() {
    this.routes = [
      {
        id: 1,
        path: '/account',
        Component: Account,
        props: {
          routerManager: this,
          messageManager: this.messageManager,
          validationManager: this.validationManager,
          authManager: this.authManager
        }
      },
      {
        id: 2,
        path: '/myPublications',
        Component: MyPublications,
        props: {
          routerManager: this,
          publicationsManager: this.publicationsManager,
          authManager: this.authManager,
          pixabayManager: this.pixabayManager
        }
      },
      {
        id: 3,
        path: '/login',
        Component: Login,
        props: {
          authManager: this.authManager,
          routerManager: this,
          validationManager: this.validationManager,
          messageManager: this.messageManager
        }
      },
      {
        id: 4,
        path: '/register',
        Component: Register,
        props: {
          authManager: this.authManager,
          routerManager: this,
          validationManager: this.validationManager,
          messageManager: this.messageManager
        }
      },
      {
        id: 5,
        path: '/search',
        Component: Search,
        props: {
          routerManager: this,
          publicationsManager: this.publicationsManager,
          pixabayManager: this.pixabayManager
        }
      },
      {
        id: 6,
        path: '/createPublication',
        Component: CreatePublication,
        props: {
          routerManager: this,
          authManager: this.authManager,
          publicationsManager: this.publicationsManager,
          validationManager: this.validationManager,
          messageManager: this.messageManager
        }
      },
      {
        id: 7,
        path: '/messages',
        Component: Messages,
        props: {
          routerManager: this,
          chatManager: this.chatManager,
          authManager: this.authManager
        }
      },
      {
        id: 8,
        path: '/details/:id',
        Component: Details,
        props: {
          routerManager: this,
          authManager: this.authManager,
          publicationsManager: this.publicationsManager,
          validationManager: this.validationManager,
          messageManager: this.messageManager,
          pixabayManager: this.pixabayManager,
          chatManager: this.chatManager
        }
      },
      {
        id: 9,
        path: '/chat/:id',
        Component: Chat,
        props: {
          routerManager: this,
          authManager: this.authManager,
          chatManager: this.chatManager
        }
      }
    ];
  }

  @action
  setMenu() {
    this.menu = [
      {
        id: 1,
        title: 'Search',
        url: '/search',
        iosIcon: searchOutline,
        mdIcon: searchSharp
      },
      {
        id: 2,
        title: 'Create Publication',
        url: '/createPublication',
        iosIcon: addOutline,
        mdIcon: addSharp
      },
      {
        id: 3,
        title: 'My Publications',
        url: '/myPublications',
        iosIcon: albumsOutline,
        mdIcon: albumsSharp
      },
      {
        id: 4,
        title: 'Messages',
        url: '/messages',
        iosIcon: chatbubbleEllipsesOutline,
        mdIcon: chatbubbleEllipsesSharp
      },
      {
        id: 5,
        title: 'Account',
        url: '/account',
        iosIcon: personOutline,
        mdIcon: personSharp
      }
    ]
  }

  @action
  setFabMenu() {
    this.fabMenu = [
      {
        id: 1,
        route: '/search',
        iosIcon: searchOutline,
        mdIcon: searchOutline
      },
      {
        id: 2,
        route: '/createPublication',
        iosIcon: addOutline,
        mdIcon: addOutline
      },
      {
        id: 3,
        route: '/account',
        iosIcon: personOutline,
        mdIcon: personOutline
      }
    ]
  }
}