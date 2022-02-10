import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';

import HeaderTitle from './HeaderTitle';
import HeaderRight from './HeaderRight';
import Splash from "../../views/Splash";
import Login from "../../views/login/Login";
import Noticias from "../../views/noticia/Noticias";
import Perfil from "../../views/perfil/Perfil";
import Visitantes from "../../views/visitante/Visitantes";
import VisitantesPortero from "../../views/portero/visitante/Visitantes";
import NuevoVisitante from "../../views/portero/visitante/crear/NuevoVisitante";
import Administracion from "../../views/administracion/Administracion";
import PQRS from "../../views/pqrs/PQRS";
import ZonasComunes from "../../views/zona_comun/zonasComunes";
import Correspondencias from "../../views/correspondencia/Correspondencias";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const navigationOptions = {
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#107ACC',
  },
  headerTitleStyle: {
    color: '#fff',
  },
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerTitle: () => <HeaderTitle />,
  headerRight: () => <HeaderRight navigation={useNavigation()} />
};

export const StackApp = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Noticias" component={Noticias} options={navigationOptions} />
      <Stack.Screen name="Perfil" component={Perfil} options={navigationOptions} />
    </Stack.Navigator>
  );
}

export const StackNoticias = () => {
  return (
    <Stack.Navigator initialRouteName="Noticias" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Noticias" component={Noticias} options={navigationOptions} />
    </Stack.Navigator>
  );
}

export const StackVisitantes = () => {
  return (
    <Stack.Navigator initialRouteName="Visitantes" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Visitantes" component={Visitantes} options={navigationOptions} />
    </Stack.Navigator>
  );
}

export const StackVisitantesPortero = () => {
  return (
    <Stack.Navigator initialRouteName="Visitantes" screenOptions={screenOptionStyle}>
      <Stack.Screen name="VisitantesPortero" component={VisitantesPortero} options={navigationOptions} />
      <Stack.Screen name="NuevoVisitante" component={VisitantesPortero} options={navigationOptions} />
    </Stack.Navigator>
  );
}

export const StackAdministracion = () => {
  return (
    <Stack.Navigator initialRouteName="Administracion" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Administracion" component={Administracion} options={navigationOptions} />
    </Stack.Navigator>
  );
}

export const StackPQRS = () => {
  return (
    <Stack.Navigator initialRouteName="PQRS" screenOptions={screenOptionStyle}>
      <Stack.Screen name="PQRS" component={PQRS} options={navigationOptions} />
    </Stack.Navigator>
  );
}

export const StackZonasComunes = () => {
  return (
    <Stack.Navigator initialRouteName="ZonasComunes" screenOptions={screenOptionStyle}>
      <Stack.Screen name="ZonasComunes" component={ZonasComunes} options={navigationOptions} />
    </Stack.Navigator>
  );
}
export const StackCorrespondencias = () => {
  return (
    <Stack.Navigator initialRouteName="Correspondencias" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Correspondencias" component={Correspondencias} options={navigationOptions} />
    </Stack.Navigator>
  );
}