export interface IRouterList {
  path: string;
  element?: JSX.Element;
  name?: string;
  icon?: JSX.Element;
  children?: IRouterList[];
}
