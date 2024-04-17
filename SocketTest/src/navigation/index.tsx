import {createStackNavigator} from '@react-navigation/stack';
import _routes, {enums_screens} from './routs';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../redux/reducers/store';
export type navigation_params = {
  HOME_SCREEN: undefined;
  SPLASH_SCREEN: undefined;
  CHAT_SCREEN: undefined;
};
const Root = () => {
  const dispatch = useDispatch();
  const {screens} = useSelector((state: rootState) => state.data);
  type routkey = keyof navigation_params;
  const Stack = createStackNavigator<navigation_params>();
  return (
    <NavigationContainer
      onStateChange={state => {
        const name = state?.routes[state.index].name;
        dispatch({
          type: 'myChat/setScreens',
          payload: {prev: screens.current, current: name},
        });
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={enums_screens.SPLASH_SCREEN as routkey}>
        {_routes.navigation_routes.map(screens => (
          <Stack.Screen
            name={screens.name as routkey}
            component={screens.component}
            key={screens.name}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Root;
