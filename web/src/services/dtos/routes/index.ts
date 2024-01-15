export interface IRouterListProps {
  path: string;
  element: JSX.Element;
  name?: string;
  icon?: JSX.Element;
  children?: IRouterListProps[];
}
