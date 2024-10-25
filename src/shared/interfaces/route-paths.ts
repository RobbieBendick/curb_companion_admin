export const RoutePaths: { [key: string]: string } = {
  home: '/',
  vendors: '/vendors',
  users: '/users',
  vendor: '/vendor/:vendorID',
  login: '/login',
};

export interface IRoute {
  path: string;
  element: JSX.Element;
}
