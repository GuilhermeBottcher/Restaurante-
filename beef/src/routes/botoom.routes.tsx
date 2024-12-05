import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inicial from '../pages/Inicial';
import Relatorio from '../pages/Relatorio';
import CadastroUsuario from '../pages/CadastroUsuario';
import CustomTabBar from '../components/CustomTabBar';
import { AuthProviderList } from '../context/authContext_list';
import CadastroCardapio from '../pages/CadastroCardapio';
import { Cozinha } from '../pages/Cozinha';

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
  return (
    <AuthProviderList>
      <Tab.Navigator screenOptions={{headerShown:false}} tabBar={props=><CustomTabBar {...props}/>}>
        <Tab.Screen name="Inicial" component={Inicial} />
        <Tab.Screen name="Relatorio" component={Relatorio} />
        <Tab.Screen name="CadastroUsuario" component={CadastroUsuario}/>
        <Tab.Screen name="CadastroCardapio" component={CadastroCardapio}/>
        <Tab.Screen name="Cozinha" component={Cozinha}/>
      </Tab.Navigator>
    </AuthProviderList>
  );
}