import React, { Component } from "react";
import {
    StyleSheet, View, Image, Text,
    TouchableOpacity, Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Creators as userCreators } from '../../state/duck/user/user';
import * as userSelectors from '../../state/duck/user/selector';
import {
    DrawerContentScrollView,
    DrawerItemList, DrawerItem
} from '@react-navigation/drawer';
import Styles from '../../asset/styles/styles';
import { actions } from 'react-native-redux-alert';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SERVICIOS } from '../../state/duck/constants';

class CustomDrawer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /*GoogleSignin.configure({
            webClientId: SERVICIOS.webClientId_GOOGLE,
            iosClientId: SERVICIOS.iosClientId_GOOGLE
        });*/
    }

    componentDidUpdate(prevProps) {
        const { status, isAuthenticated, dispatch } = this.props;

        if (isAuthenticated !== prevProps.isAuthenticated && !isAuthenticated) {
            this._logout('Login');
        }
    }

    _logout(view) {
        this.props.navigation.closeDrawer();
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: view }]
        });
    }

    _navegar(stack, screen, params = {}) {
        this.props.navigation.navigate(stack, {
            screen,
            params
        });
    }

    logout = async (confirm = true) => {
        if (confirm) {
            Alert.alert(
                '', '¿Cerrar sesión?',
                [
                    { text: 'Si', onPress: () => this.logout(false) },
                    { text: 'no' }
                ],
            );

            return;
        }

        this._signOutGoogle().then(res => {
            this.props.closeSession();
        })
    }

    _signOutGoogle = async () => {
        /*try {
            //await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ userInfo: null });
        } catch (error) {
            console.error(error);
        }*/
    };

    render() {
        /** Asignamos la imagen del avatar */
        if (this.props.avatar) {
            var renderImageProfile = <Image source={{ uri: this.props.avatar }} style={{
                width: 130, height: 130, borderRadius: 100, borderWidth: 4, borderColor: '#107ACC'
            }}></Image>;
        }
        else {
            var renderImageProfile = <Image source={require('../../asset/images/avatar_perfil.png')} style={{
                width: 130, height: 130, borderRadius: 100
            }}></Image>
        }

        const { state } = this.props
        const { routes, index } = state;
        const focusedRoute = routes[index];
        var screen = '';

        if (focusedRoute.params.params !== undefined) {
            screen = focusedRoute.params.screen;
        }
        else {
            screen = 'Perfil';
        }

        return (
            <DrawerContentScrollView>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ flex: 2 }}>
                        <View style={{ alignItems: 'center', marginTop: 15 }}>
                            {renderImageProfile}
                        </View>
                        <Text style={[Styles.fontBold, {
                            color: '#343a40', textAlign: 'center', fontSize: 14,
                            marginTop: 5
                        }]}>{this.props.user.name}</Text>
                    </View>
                </View>

                <DrawerItemList {...this.props} />

                <DrawerItem
                    icon={({ color, size }) => (
                        <Image source={require('../../asset/images/icon_logout_gris.png')} style={styles.image_icon}></Image>
                    )}
                    label='Cerrar sesión'
                    labelStyle={styles.drawerLabelStyle}
                    onPress={async () => this.logout()}
                    />
            </DrawerContentScrollView>
        )
    }
}

const styles = StyleSheet.create({
    image_logo: {
        width: 240,
        height: 40,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    image_icon: {
        width: 20,
        height: 20,
    },
    drawerLabelStyle: {
        color: '#343a40',
        fontFamily: Styles.fontRegular.fontFamily
    },
});

const mapStateToProps = state => {
    return {
        isAuthenticated: userSelectors.getIsAuthenticatedSelector(state),
        user: userSelectors.getUserSelector(state) ? userSelectors.getUserSelector(state) : {},
        avatar: userSelectors.getAvatarSelector(state),
    }
}

const mapDispatchToProps = dispatch => ({
    closeSession: () => dispatch(userCreators.requestLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)