import React from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,
    SafeAreaView, StatusBar, Platform, Linking
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from 'react-native-redux-alert';
import Styles from '../../asset/styles/styles';
import FormLogin from './FormLogin';
import { Creators as userCreators } from '../../state/duck/user/user';
import * as userSelectors from '../../state/duck/user/selector';
import Loader from '../layouts/loader';
import LinearGradient from 'react-native-linear-gradient';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            auth: {}
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        const { status, message, isAuthenticated, dispatch } = this.props;

        if (status !== prevProps.status && status) {
            this.onLoading(false);
            if (message == 'Usuario registrado') {
                const auth = {
                    email: this.state.auth.email,
                    password: null,
                    token_firebase: this.props.token_firebase,
                }

                this.props.requestLogin(auth);
            }
            else {
                dispatch(actions.show(message, 2500, status));
            }
        }

        if (isAuthenticated !== prevProps.isAuthenticated && isAuthenticated) {
            this.onLoading(false);
            this._navegar('Perfil');
        }
    }

    onLoading = loading => {
        this.setState({
            isLoading: loading
        })
    }

    submitLogin = data => {
        //this.props.navigation.navigate('Noticias');
        data.token_firebase = this.props.token_firebase;
        this.onLoading(true);
        this.props.requestLogin(data);
    }

    _navegar(screen) {
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: screen }]
        });
    }

    render() {
        if (!this.props.isAuthenticated) {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <LinearGradient
                        start={Styles.start} end={Styles.end}
                        locations={Styles.locations}
                        colors={Styles.colorsGradient} style={Styles.linearGradient}>
                        <ScrollView style={[Styles.container]} justifyContent="center">
                            <Loader color="#fff" animating={this.state.isLoading}></Loader>

                            <View style={Styles.content}>
                                <Text style={[Styles.fontBoldItalic, {
                                    fontSize: 40, color: '#fff', textAlign: 'center', marginBottom: 10,
                                }]}>Tuappmin</Text>

                                <Image source={require('../../asset/images/imagen_inicio.png')} style={{
                                    width: 200, height: 200, alignSelf: 'center'
                                }}></Image>

                                <FormLogin submitLogin={this.submitLogin}></FormLogin>

                                <TouchableOpacity>
                                    <Text style={[Styles.fontBold, { color: '#fff', textAlign: 'center', fontSize: 14, marginTop: 15 }]}>¿Olvidaste tu contraseña?</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </LinearGradient>
                </SafeAreaView>
            );
        }
        else {
            return <View></View>
        }
    }
}

const styles = StyleSheet.create({
    
});

const mapStateToProps = state => {
    return {
        isAuthenticated: userSelectors.getIsAuthenticatedSelector(state),
        status: userSelectors.getStatusSelector(state),
        message: userSelectors.getMessageSelector(state),
        token_firebase: userSelectors.getTokenFirebaseSelector(state),
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(userCreators, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);