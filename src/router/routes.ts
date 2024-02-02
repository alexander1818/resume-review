import Home from "../components/home/Home";
import UserInfo from "../components/userInfo/UserInfo";

export const mainRoutes = {
    home: {
      path: '/',
      element: Home,
    },
    userInfo: {
      path: '/:id',
      element: UserInfo,
    },
  };