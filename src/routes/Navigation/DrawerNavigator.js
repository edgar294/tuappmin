import React from "react";
import { Image, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Creators as userCreators } from '../../state/duck/user/user';
import * as userSelectors from '../../state/duck/user/selector';
import {
  createDrawerNavigator
} from '@react-navigation/drawer';
import {
  StackApp, StackNoticias, StackVisitantes, StackAdministracion,
  StackPQRS, StackZonasComunes, StackCorrespondencias,
  StackVisitantesPortero
} from './StackNavigator';
import CustomDrawer from './CustomDrawer';
import Styles from '../../asset/styles/styles';

const Drawer = createDrawerNavigator();

const MainDrawerNavigation = (props, route, navigation) => {
  console.log(props)
  return (
    <Drawer.Navigator initialRouteName="StackApp" drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="StackApp" initialParams={{ params: route.params }} component={StackApp} options={{
        headerShown: false,
        title: 'Perfil',
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerIcon: () => <Image source={require('../../asset/images/icon_user.png')} style={styles.image_icon}></Image>,
      }} />

      <Drawer.Screen name="StackNoticias" initialParams={{ params: route.params }} component={StackNoticias} options={{
        headerShown: false,
        title: 'Noticias',
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerIcon: () => <Image source={require('../../asset/images/icon_noticias.png')} style={styles.image_icon}></Image>,
      }} />

      { props.user.rol_id == 4 && <Drawer.Screen name="StackVisitantesPortero" initialParams={{ params: route.params }} component={StackVisitantesPortero} options={{
        headerShown: false,
        title: 'Visitantes',
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerIcon: () => <Image source={require('../../asset/images/icon_visitas.png')} style={styles.image_icon}></Image>,
      }} /> }

      { props.user.rol_id == 5 && <Drawer.Screen name="StackVisitantes" initialParams={{ params: route.params }} component={StackVisitantes} options={{
        headerShown: false,
        title: 'Visitantes',
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerIcon: () => <Image source={require('../../asset/images/icon_visitas.png')} style={styles.image_icon}></Image>,
      }} /> }

      <Drawer.Screen name="StackAdministracion" initialParams={{ params: route.params }} component={StackAdministracion} options={{
        headerShown: false,
        title: 'Administración',
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerIcon: () => <Image source={require('../../asset/images/icon_administracion.png')} style={styles.image_icon}></Image>,
      }} />

      <Drawer.Screen name="StackPQRS" initialParams={{ params: route.params }} component={StackPQRS} options={{
        headerShown: false,
        title: 'PQRS',
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerIcon: () => <Image source={require('../../asset/images/icon_pqrs.png')} style={styles.image_icon}></Image>,
      }} />

      <Drawer.Screen name="StackZonasComunes" initialParams={{ params: route.params }} component={StackZonasComunes} options={{
        headerShown: false,
        title: 'Zonas comunes',
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerIcon: () => <Image source={require('../../asset/images/icon_zonas.png')} style={styles.image_icon}></Image>,
      }} />

      <Drawer.Screen name="StackCorrespondencias" initialParams={{ params: route.params }} component={StackCorrespondencias} options={{
        headerShown: false,
        title: 'Correspondencia',
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerIcon: () => <Image source={require('../../asset/images/icon_correspondencia.png')} style={styles.image_icon}></Image>,
      }} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  image_icon: {
    width: 20,
    height: 20,
  },
  drawerLabelStyle: {
    color: '#343a40',
    fontFamily: Styles.fontRegular.fontFamily
  },
  drawerItemStyle: {
    borderBottomWidth: 1, borderColor: '#343a40'
  },
});

const mapStateToProps = state => {
  return {
    user: userSelectors.getUserSelector(state) ? userSelectors.getUserSelector(state) : {},
  }
}

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(MainDrawerNavigation)