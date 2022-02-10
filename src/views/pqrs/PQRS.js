import React from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,
    SafeAreaView, Dimensions
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from 'react-native-redux-alert';
import Styles from '../../asset/styles/styles';
import { ButtonSubmitRoundedOutlineLayout } from '../layouts/Inputs';
import { Creators as userCreators } from '../../state/duck/user/user';
import * as userSelectors from '../../state/duck/user/selector';
import Loader from '../layouts/loader';
import { ButtonSubmitLayout } from '../layouts/Inputs';
import Modal from "react-native-modal";
import FormPQRS from './FormPQRS';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class PQRS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            auth: {},
            showModal: false
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    _openCloseModal(){
        this.setState({
            showModal: !this.state.showModal,
        });
    }

    render() {
        if (this.props.isAuthenticated) {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView style={[Styles.container, Styles.fondoWhiteColor]}>
                        <Loader color="#fff" animating={this.state.isLoading}></Loader>

                        <View style={Styles.content}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
                                <Image source={require('../../asset/images/icon_pqrs.png')} style={{
                                    width: 25, height: 25, marginRight: 10
                                }}></Image>

                                <Text style={[Styles.fontBold, { color: '#343a40', fontSize: 16 }]}>PQRS</Text>
                            </View>

                            <ButtonSubmitLayout handleSubmit={() => this._openCloseModal()} text="Crear PQRS"
                                color="#fff" backgroundColor="#fd7e14"></ButtonSubmitLayout>

                            {/** Modal crear pqrs */}

                            <Modal isVisible={this.state.showModal}
                                onBackdropPress={() => this._openCloseModal()}
                                deviceWidth={deviceWidth} deviceHeight={deviceHeight}
                                swipeDirection="left">
                                    <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>
                                        <FormPQRS></FormPQRS>
                                    </View>
                            </Modal>


                            {/**  Lista de pqrs */}
                            <TouchableOpacity style={{
                                flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                                borderBottomWidth: 1, borderColor: '#ced4da', alignItems: 'center'
                            }}>
                                <View style={{ flex: .19 }}>
                                    <Image source={require('../../asset/images/avatar_perfil.png')} style={{
                                        width: 60, height: 60, borderRadius: 10
                                    }}></Image>
                                </View>

                                <View style={{ flex: .55 }}>
                                    <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 14 }]}>Nombre del visitante</Text>

                                    <Text style={[Styles.fontRegular, { color: '#1c7ed6', fontSize: 13 }]}>Ingreso: 01/12/2021</Text>
                                </View>

                                <View style={{ flex: .26 }}>
                                    <ButtonSubmitRoundedOutlineLayout borderColor="#37b24d" color="#37b24d" styles={{
                                        padding: 3, borderWidth: 1
                                    }}>
                                        <Text style={[Styles.fontRegular, { color: '#37b24d', fontSize: 12 }]}>Ver respuesta</Text>
                                    </ButtonSubmitRoundedOutlineLayout>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                                borderBottomWidth: 1, borderColor: '#ced4da', alignItems: 'center'
                            }}>
                                <View style={{ flex: .19 }}>
                                    <Image source={require('../../asset/images/avatar_perfil.png')} style={{
                                        width: 60, height: 60, borderRadius: 10
                                    }}></Image>
                                </View>

                                <View style={{ flex: .55 }}>
                                    <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 14 }]}>Nombre del visitante</Text>

                                    <Text style={[Styles.fontRegular, { color: '#1c7ed6', fontSize: 13 }]}>Ingreso: 01/12/2021</Text>
                                </View>

                                <View style={{ flex: .26 }}>
                                    <ButtonSubmitRoundedOutlineLayout borderColor="#37b24d" color="#37b24d" styles={{
                                        padding: 3, borderWidth: 1
                                    }}>
                                        <Text style={[Styles.fontRegular, { color: '#37b24d', fontSize: 12 }]}>Ver respuesta</Text>
                                    </ButtonSubmitRoundedOutlineLayout>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(userCreators, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PQRS);