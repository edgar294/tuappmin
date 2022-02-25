import React from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,
    SafeAreaView, Dimensions, Alert
} from 'react-native';

import axios from 'axios';
import { BASE_URL } from '../../state/duck/constants';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from 'react-native-redux-alert';
import Styles from '../../asset/styles/styles';
import { ButtonSubmitRoundedOutlineLayout, ButtonSubmitLayout } from '../layouts/Inputs';
import { Creators as userCreators } from '../../state/duck/user/user';
import * as userSelectors from '../../state/duck/user/selector';
import Loader from '../layouts/loader';
import TabCorrespondencias from './tabs/TabCorrespondencias';
import Modal from "react-native-modal";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
import FormCorrespondencia from './FormCorrespondencia';

class Correspondencias extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            indexView: 1,
            correspondencias: [],
            inmuebles: [],
            bloques: [],
            tipo: null,
            esPortero: (props.user.rol_id == 4) ? true : false
        };
    }

    componentDidMount() {
        let vm = this

        vm.setState({
            inmuebles: [],
            correspondencias: []
        });

        vm.reloadCorrespondencias()

        console.log('cargando inmuebles...')
        axios.get(`${BASE_URL}/api/portero/inmuebles/${this.props.user.id}`)
        .then(function (response) {
            let inmuebles = response.data.data;
            let tipo = response.data.tipo
            let data = new Array()
            let bloques = new Array()
            let arrBloques = new Array()

            console.log('*************************')

            if (tipo == 'casa') {
                inmuebles.forEach((i) => {
                    data.push({
                        id: i.id,
                        name: i.numero,
                    })
                })
            } else {
                inmuebles.forEach((i) => {
                    let b = i.bloque
                    let apto = i.apartamento
                    bloques.push(b)

                    if (data[b] == undefined) {
                        data[b] = new Array()
                        data[b].push({
                            id: apto,
                            name: apto,
                            bloque: b
                        })
                    } else{
                        data[b].push({
                            id: apto,
                            name: apto,
                            bloque: b
                        })
                    }
                })
            }

            bloques = [...new Set(bloques)]
            bloques.forEach((b) => {
                arrBloques.push({
                    id: b,
                    name: b
                })
            })

            console.log()

            vm.setState({
                inmuebles: data,
                bloques: arrBloques,
                tipo: tipo
            });
        })
        .catch(function (error) {
            console.log(error)
            return error;
        });
    }


    componentDidUpdate(prevProps) {
    }

    reloadCorrespondencias() {
        let vm = this
        console.log('cargando correspondencias...')

        vm.setState({
            correspondencias: []
        });

        const esPortero = (vm.props.user.rol_id == 4) ? true : false;

        let url = `${BASE_URL}/api/get/correspondencias/${vm.props.user.id}`
        console.log(url)
        axios.get(url)
        .then(function (response) {
            let correspondencias = response.data.data;
            let arreglo = [];

            correspondencias.forEach(correspondencia => {
                arreglo.push({
                    id: correspondencia.id,
                    name: correspondencia.nombre,
                    tipo: correspondencia.tipo_correspondencia.nombre,
                    proveedor: (correspondencia.proveedor_servicio) ? correspondencia.proveedor_servicio.nombre : '',
                    logo: (correspondencia.proveedor_servicio) ? correspondencia.proveedor_servicio.logo : '',
                    creador: correspondencia.creador.name,
                    receptor: correspondencia.receptor.name,
                    created_at: correspondencia.created_at,
                    esPortero: esPortero,
                    status: correspondencia.status,
                })
            })

            vm.setState({
                correspondencias: arreglo
            });
            console.log('correspondencias cargadas')
        })
        .catch(function (error) {
            return error;
        });
    }

    submitCorrespondencia = data => {
        Alert.alert(
            "Crear Corresodencia",
            "¿Seguro de crear la correspondencia?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Crear", onPress: () => {
                        this.crearCorrespondencia(data)
                    }
                }
            ]
        );
    }

    crearCorrespondencia = (data) => {
        const vm = this
        data.creador_id = this.props.user.id
        data.conjunto_id = this.props.user.owner_id
        axios.post(`${BASE_URL}/api/store/correspondencias`, { data })
        .then(function (response) {
            console.log(response.data)
            vm.reloadCorrespondencias()
        })
        .catch(function (error) {
            console.log(error)
            return error;
        });

        this._openCloseModal()
    }

    _openCloseModal(){
        this.setState({
            showModal: !this.state.showModal,
        });
    }

    _navegar(screen) {

    }

    changePackageStatus = data => {
        Alert.alert(
            "Correspondencia Recibida",
            "¿Seguro de marcar la correspondencia como recibida?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Correspondencia Recibida", onPress: () => {
                        this.marcarComoRecibida(data)
                    }
                }
            ]
        );
    }

    marcarComoRecibida = (data) => {
        const vm = this
        data.creador_id = this.props.user.id
        data.conjunto_id = this.props.user.owner_id
        axios.post(`${BASE_URL}/api/correspondencia/change/status`, { data })
        .then(function (response) {
            console.log(response.data)
            vm.reloadCorrespondencias()
        })
        .catch(function (error) {
            console.log(error)
            return error;
        });
    }

    render() {
        const tabs = ['Servicios públicos', 'Correspondencias', 'Paqueterias'];
        var renderTabs = tabs.map((item, key) => {
            return (
                <TouchableOpacity style={{
                    borderColor: '#107ACC', paddingBottom: 10, width: '33.3%',
                    borderBottomWidth: this.state.indexView == key + 1 ? 5 : 0
                }} key={key} onPress={() => this.setState({ indexView: key + 1 })}>
                    <Text style={[Styles.fontBold, {
                        color: '#4D4D4D', textAlign: 'center', fontSize: 12
                    }]}>{item}</Text>
                </TouchableOpacity>
            );
        });

        var renderView = null;
        switch (this.state.indexView) {
            case 1:
                renderView =
                <View>
                    <TabCorrespondencias
                        changePackageStatus={this.changePackageStatus}
                        correspondencias={this.state.correspondencias.filter((c) => c.tipo == 'Servicio Público')}>
                    </TabCorrespondencias>
                </View>;
                break;

            case 2:
                renderView =
                <View>
                    <TabCorrespondencias
                        changePackageStatus={this.changePackageStatus}
                        correspondencias={this.state.correspondencias.filter((c) => c.tipo == 'Correspondencia')}>
                    </TabCorrespondencias>
                </View>;
                break;

            case 3:
                renderView =
                <View>
                    <TabCorrespondencias
                        changePackageStatus={this.changePackageStatus}
                        correspondencias={this.state.correspondencias.filter((c) => c.tipo == 'Paquetería')}>
                    </TabCorrespondencias>
                </View>;
                break;
        }

        if (this.props.isAuthenticated) {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView style={[Styles.container, Styles.fondoWhiteColor]}>
                        <Loader color="#fff" animating={this.state.isLoading}></Loader>

                        <View style={Styles.content}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
                                <Image source={require('../../asset/images/icon_correspondencia.png')} style={{
                                    width: 25, height: 25, marginRight: 10
                                }}></Image>

                                <Text style={[Styles.fontBold, { color: '#343a40', fontSize: 16 }]}>Correspondencias</Text>
                            </View>
                            {
                                (this.props.user.rol_id == 4) ?
                                    <ButtonSubmitLayout
                                        handleSubmit={() => this._openCloseModal()}
                                        text="Crear nueva correspondencia"
                                        color="#fff"
                                        backgroundColor="#fd7e14">
                                    </ButtonSubmitLayout>
                                : null
                            }
                        </View>

                        {/** Modal crear pqrs */}

                        <Modal isVisible={this.state.showModal}
                            onBackdropPress={() => this._openCloseModal()}
                            deviceWidth={deviceWidth} deviceHeight={deviceHeight}
                            swipeDirection="left">
                                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>
                                    <FormCorrespondencia
                                        submitCorrespondencia={this.submitCorrespondencia}
                                        tipo={this.state.tipo}
                                        bloques={this.state.bloques}
                                        inmuebles={this.state.inmuebles}>
                                    </FormCorrespondencia>
                                </View>
                        </Modal>

                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            borderTopLeftRadius: 10, borderTopRightRadius: 10,
                            paddingTop: 14, paddingBottom: 3,
                        }}>
                            {renderTabs}
                        </View>

                        <View style={Styles.content}>
                            <View style={{ marginTop: 10 }}>
                                {renderView}
                            </View>
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
        user: userSelectors.getUserSelector(state),
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(userCreators, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Correspondencias);