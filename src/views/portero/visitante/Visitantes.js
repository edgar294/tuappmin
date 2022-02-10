import React from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,
    SafeAreaView,
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from 'react-native-redux-alert';
import Styles from '../../../asset/styles/styles';
import { ButtonSubmitLayout, ButtonSubmitRoundedOutlineLayout } from '../../layouts/Inputs';
import { Creators as userCreators } from '../../../state/duck/user/user';
import * as userSelectors from '../../../state/duck/user/selector';
import Loader from '../../layouts/loader';

class VisitantesPortero extends React.Component {
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

    }

    _navegar(screen) {

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={[Styles.container, Styles.fondoWhiteColor]}>
                    <Loader color="#fff" animating={this.state.isLoading}></Loader>

                    <View style={Styles.content}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
                            <Image source={require('../../../asset/images/icon_visitas.png')} style={{
                                width: 25, height: 25, marginRight: 10
                            }}></Image>

                            <Text style={[Styles.fontBold, { color: '#343a40', fontSize: 16 }]}>Visitantes</Text>
                        </View>

                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 15, marginRight: 10 }]}>Filtrar</Text>
                            <Image source={require('../../../asset/images/icon_filtrar.png')}
                                style={{ width: 18, height: 18 }}></Image>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: .38 }}>
                                <ButtonSubmitLayout handleSubmit={() => this.props.navigation.navigate('NuevoVisitante')}
                                    backgroundColor="#37b24d">
                                    <View style={{
                                        flexDirection: 'row', alignItems: 'center',
                                        justifyContent: 'space-between', width: '100%'
                                    }}>
                                        <Image source={require('../../../asset/images/icon_plus_circle_white.png')}
                                            style={{ width: 18, height: 18 }}></Image>

                                        <Text style={[Styles.fontBold, { color: '#fff', fontSize: 15, marginRight: 10 }]}>Registrar</Text>
                                    </View>
                                </ButtonSubmitLayout>
                            </View>

                            <View style={{ flex: .6 }}>
                                <ButtonSubmitLayout handleSubmit={() => { }} disabled={true} backgroundColor="#f08c00">
                                    <View style={{
                                        flexDirection: 'row', alignItems: 'center',
                                        justifyContent: 'space-between', width: '100%'
                                    }}>
                                        <Text style={[Styles.fontBold, { color: '#fff', fontSize: 15, marginRight: 10 }]}>Visitantes activos: 5</Text>
                                    </View>
                                </ButtonSubmitLayout>
                            </View>
                        </View>

                        <TouchableOpacity style={{
                            flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                            borderBottomWidth: 1, borderColor: '#ced4da', alignItems: 'center'
                        }}>
                            <View style={{ flex: .19 }}>
                                <Image source={require('../../../asset/images/avatar_perfil.png')} style={{
                                    width: 60, height: 60, borderRadius: 10
                                }}></Image>
                            </View>

                            <View style={{ flex: .55 }}>
                                <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 14 }]}>Nombre del visitante</Text>
                                <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 13 }]}>Número de identificación: 33774535345</Text>
                                <Text style={[Styles.fontRegular, { color: '#1c7ed6', fontSize: 13 }]}>Ingreso: 01/12/2021</Text>
                            </View>

                            <View style={{ flex: .26 }}>
                                <ButtonSubmitRoundedOutlineLayout borderColor="#37b24d" color="#37b24d" styles={{
                                    padding: 3, borderWidth: 1
                                }}>
                                    <Text style={[Styles.fontRegular, { color: '#37b24d', fontSize: 12 }]}>Autorizo</Text>
                                </ButtonSubmitRoundedOutlineLayout>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                            borderBottomWidth: 1, borderColor: '#ced4da', alignItems: 'center'
                        }}>
                            <View style={{ flex: .19 }}>
                                <Image source={require('../../../asset/images/avatar_perfil.png')} style={{
                                    width: 60, height: 60, borderRadius: 10
                                }}></Image>
                            </View>

                            <View style={{ flex: .55 }}>
                                <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 14 }]}>Nombre del visitante</Text>

                                <Text style={[Styles.fontRegular, { color: '#1c7ed6', fontSize: 13 }]}>Ingreso: 01/12/2021</Text>
                            </View>

                            <View style={{ flex: .26, alignItems: 'flex-end' }}>
                                <ButtonSubmitLayout handleSubmit={() => { }} backgroundColor="#f03e3e"
                                    styles={{ paddingVertical: 10, width: 50 }}>
                                    <Image source={require('../../../asset/images/icon_door_exit.png')} style={{
                                        width: 25, height: 25
                                    }}></Image>
                                </ButtonSubmitLayout>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
    return {
        isAuthenticated: userSelectors.getIsAuthenticatedSelector(state),
        status: userSelectors.getStatusSelector(state),
        message: userSelectors.getMessageSelector(state),
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(userCreators, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VisitantesPortero);