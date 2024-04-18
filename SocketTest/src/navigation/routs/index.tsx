import Login from '../../screens/auth/Login';
import Splash from '../../screens/auth/Splash';
import Chat from '../../screens/main/Chat';
import Home from '../../screens/main/Home';

export enum enums_screens {
  HOME_SCREEN = 'HOME_SCREEN',
  SPLASH_SCREEN = 'SPALSH_SCREEN',
  CHAT_SCREEN = 'CHAT_SCREEN',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
}
const getComponentByName = (screeName: string) => {
  switch (screeName) {
    case enums_screens.SPLASH_SCREEN:
      return Splash;
    case enums_screens.HOME_SCREEN:
      return Home;
    case enums_screens.CHAT_SCREEN:
      return Chat;
    case enums_screens.LOGIN_SCREEN:
      return Login;
    default:
      return Splash;
  }
};
const _routes = {
  navigation_routes: Object.keys(enums_screens).map(item => {
    let name = item as keyof typeof enums_screens;
    return {
      name: enums_screens[name],
      component: getComponentByName(enums_screens[name]),
    };
  }),
};

export default _routes;
