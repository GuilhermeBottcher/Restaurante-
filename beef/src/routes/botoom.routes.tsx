import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inicial from '../pages/Inicial';
import Relatorio from '../pages/Relatorio';
import CustomTabBar from '../components/CustomTabBar';
import { AuthProviderList } from '../context/authContext_list';

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
  return (
    <AuthProviderList>
      <Tab.Navigator screenOptions={{headerShown:false}} tabBar={props=><CustomTabBar {...props}/>}>
        <Tab.Screen name="Inicial" component={Inicial} />
        <Tab.Screen name="Relatorio" component={Relatorio} />
      </Tab.Navigator>
    </AuthProviderList>
  );
}