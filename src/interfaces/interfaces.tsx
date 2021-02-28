import { AuthManager } from "../services/AuthManager";
import { MessageManager } from "../services/MessageManager";
import { RouterManager } from "../services/RouterManager";
import { ValidationManager } from "../services/ValidationManager";

export interface IQuery {
  per_page?: number,
  page?: number,
  q?: string,
  key?: string
}

export interface IRoute {
  id: number,
  path: string,
  Component: React.FC<any>,
  props?: {
    [key: string]: any
  }
}

export interface ILoginProps {
  authManager: AuthManager,
  validationManager: ValidationManager,
  routerManager: RouterManager,
  messageManager: MessageManager
}

export interface IRegisterProps {
  authManager: AuthManager,
  validationManager: ValidationManager,
  routerManager: RouterManager,
  messageManager: MessageManager
}

export interface IAppProps {
  routerManager: RouterManager
}