import React from 'react';
import { Provider } from 'react-redux';
import store from './src/state/store';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import MainDrawerNavigation from "./src/routes/Navigation/DrawerNavigator";
import { Alert } from 'react-native-redux-alert';
import FlashMessage from "react-native-flash-message";

export default class App extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <MainDrawerNavigation />
          <Alert />
          <FlashMessage duration={6000} />
        </NavigationContainer>
      </Provider>
    );
  }
}