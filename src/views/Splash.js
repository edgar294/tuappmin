import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Styles from '../asset/styles/styles';
import { Creators as userCreators } from '../state/duck/user/user';
import * as userSelectors from '../state/duck/user/selector';
import messaging from '@react-native-firebase/messaging';
import { showMessage } from "react-native-flash-message";
import LinearGradient from 'react-native-linear-gradient';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        messaging().onNotificationOpenedApp(remoteMessage => {
            const { data, notification } = remoteMessage;
        });

        messaging().onMessage(async remoteMessage => {
            const { data, notification } = remoteMessage;
            showMessage({
                message: notification.title,
                description: notification.body,
                type: "info",
                onpress: () => data.accion ? this.props.navigation.navigate(data.accion) : {}
            });
        });

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notificacion:',
                        remoteMessage.notification,
                    );
                }
            });

        this.props.requestToken();

        setTimeout(() => {
            if (this.props.isAuthenticated) {
                this.props.requestVerificarToken();
                this._navegar('Perfil');
            }
            else {
                this._navegar('Login');
            }
        }, 800);
    }

    componentDidUpdate(prevProps) {
        const { status, message, isAuthenticated, dispatch } = this.props;
        if (isAuthenticated !== prevProps.isAuthenticated) {
            this.props.requestVerificarToken();
        }

        if (isAuthenticated !== prevProps.isAuthenticated && !isAuthenticated) {
            this._navegar('Login');
        }
    }

    _getAuthenticate() {
        if (this.props.isAuthenticated) {
            this._navegar('Perfil');
        }
        else {
            this._navegar('Welcome');
        }
    }

    async _navegar(screen) {
        const token = await this._checkPermission();
        if (token) {
            this.props.saveTokenFirebase(token);
        }

        setTimeout(() => {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: screen }]
            });
        }, 200)
    }

    _checkPermission = async () => {
        const enabled = await messaging().hasPermission();
        if (enabled) {
            const token = await messaging().getToken();
            console.log('token firebase', token)
            return token;
        }
        else this._getPermission()
    }

    _getPermission = async () => {
        messaging().requestPermission()
            .then(() => {
                this._checkPermission()
            })
            .catch(error => {

            });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent={true} />

                <LinearGradient 
                start={Styles.start} end={Styles.end}
                locations={Styles.locations}
                colors={Styles.colorsGradient} style={Styles.linearGradient}>
                    <ScrollView style={[Styles.container]} justifyContent="center">
                        <Image source={require('../asset/images/imagen_inicio.png')} style={styles.image}></Image>
                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 230,
        height: 230,
        resizeMode: 'contain',
        alignSelf: 'center'
    }
});

const mapStateToProps = state => ({
    token: userSelectors.getTokenSelector(state),
    isAuthenticated: userSelectors.getIsAuthenticatedSelector(state),
    status: userSelectors.getStatusSelector(state),
    message: userSelectors.getMessageSelector(state),
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(userCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
