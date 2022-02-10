import React, { useState } from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,
    SafeAreaView, StatusBar, Platform, Alert, PermissionsAndroid
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from 'react-native-redux-alert';
import Styles from '../../../../asset/styles/styles';
import FormNuevoVisitante from './FormNuevoVisitante';
import { Creators as userCreators } from '../../../../state/duck/user/user';
import * as userSelectors from '../../../../state/duck/user/selector';
import Loader from '../../../layouts/loader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

class NuevoVisitante extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            indexView: 1
        };
    }

    async componentDidMount() {
        if (Platform.OS == 'android') {
            this.requestCameraPermission()
        }

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.requestPerfil();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    componentDidUpdate(prevProps) {
        const { status, message, isAuthenticated, dispatch } = this.props;

        if (status !== prevProps.status && status) {
            this.onLoading(false);
            dispatch(actions.show(message, 2500, status));
        }

        if (isAuthenticated !== prevProps.isAuthenticated && isAuthenticated) {
            this.onLoading(false);
            this._navegar('StackHome');
        }
    }

    onLoading = loading => {
        this.setState({
            isLoading: loading
        })
    }

    _navegar(view) {
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: view }]
        });
    }

    submitInfoPerfil = data => {
        this.onLoading(true);
        this.props.requestUpdatePerfil(data);
    }

    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Permiso de la cámara',
                    'message': 'La aplicación necesita acceso a tu cámara.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            } else {

            }
        } catch (err) {
            console.warn(err)
        }
    }

    _changeImagePerfil() {
        Alert.alert(
            '', 'Selecciona una opción',
            [
                { text: 'Tomar foto', onPress: () => this.actionLaunchCamera() },
                { text: 'Abrir galeria', onPress: () => this.actionLaunchImageLibrary() },
                { text: 'Cerrar' }
            ],
        );
    }

    actionLaunchImageLibrary = () => {
        var options = {
            maxWidth: 800,
            maxHeight: 800,
            mediaType: 'photo',
            includeBase64: true
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {

            } else if (response.error) {

            } else if (response.customButton) {

            } else {
                this.onLoading(true);
                let data = {
                    imageURL: `data:${response.assets[0].type};base64,${response.assets[0].base64}`,
                    name: response.assets[0].fileName
                }

                this.props.requestChangeImagePerfil(data);
            }
        });
    }

    actionLaunchCamera = () => {
        var options = {
            maxWidth: 800,
            maxHeight: 800,
            mediaType: 'photo',
            includeBase64: true
        };
        launchCamera(options, (response) => {
            if (response.didCancel) {

            } else if (response.error) {

            } else if (response.customButton) {

            } else {
                this.onLoading(true);
                let data = {
                    imageURL: `data:${response.assets[0].type};base64,${response.assets[0].base64}`,
                    name: response.assets[0].fileName
                }

                this.props.requestChangeImagePerfil(data);
            }
        });
    }

    render() {
        if (this.props.avatar) {
            var renderImageProfile = <View>
                <Image source={{ uri: this.props.avatar }} style={{
                    width: 160, height: 160, borderRadius: 100, borderWidth: 5, borderColor: '#107ACC'
                }}></Image>

                <View style={styles.content_tomar_foto}>
                    <TouchableOpacity onPress={() => this._changeImagePerfil()}>
                        <Image source={require('../../../../asset/images/icon_camera2.png')} style={{
                            width: 25, height: 25
                        }}></Image>
                    </TouchableOpacity>
                </View>
            </View>;
        }
        else {
            var renderImageProfile = <View>
                <Image source={require('../../../../asset/images/avatar_perfil.png')} style={{
                    width: 160, height: 160, borderRadius: 100
                }}></Image>

                <View style={styles.content_tomar_foto}>
                    <TouchableOpacity onPress={() => this._changeImagePerfil()}>
                        <Image source={require('../../../../asset/images/icon_camera2.png')} style={{
                            width: 25, height: 25
                        }}></Image>
                    </TouchableOpacity>
                </View>
            </View>;
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor={'#2A2C35'} barStyle={'light-content'} translucent={false} />

                <ScrollView style={[Styles.container, Styles.fondoWhiteColor]}>
                    <Loader color="#fff" animating={this.state.isLoading}></Loader>

                    <View style={{ position: 'relative', marginBottom: 80 }}>
                        <Image source={require('../../../../asset/images/fondo_perfil.jpg')} style={{
                            width: '100%', height: 130
                        }}></Image>

                        <View style={{
                            position: 'absolute', alignSelf: 'center',
                            alignItems: 'center', top: '25%'
                        }}>
                            {renderImageProfile}
                        </View>
                    </View>

                    <View style={Styles.content}>
                        <View style={{ marginTop: 10 }}>
                            <FormNuevoVisitante submitAction={this.submitInfoPerfil}></FormNuevoVisitante>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    content_tomar_foto: {
        backgroundColor: '#107ACC',
        position: 'absolute',
        bottom: 5,
        right: 5,
        padding: 12,
        borderRadius: 100
    }
});

const mapStateToProps = state => {
    return {
        status: userSelectors.getStatusSelector(state),
        message: userSelectors.getMessageSelector(state),
        user: userSelectors.getUserSelector(state) ? userSelectors.getUserSelector(state) : {},
        avatar: userSelectors.getAvatarSelector(state),
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(userCreators, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NuevoVisitante);