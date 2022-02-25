import React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, Switch, Picker
} from 'react-native';
import { withFormik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import Styles from '../../asset/styles/styles';
import {
    ButtonSubmitLayout, pickerSelectLayout,
    textInputMultilineLayout, SwitchLayout
} from '../layouts/Inputs';
import * as userSelectors from '../../state/duck/user/selector';

import axios from 'axios';
import { BASE_URL } from '../../state/duck/constants';

class FormCorrespondencia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            proveedoresServicio: [],
            tipoCorrespondencia: [],
            showServices: false,
            apartamentos: [],
            todos: false,
        };
    }

    componentDidMount() {
        console.log('Cargando Información');
        let vm = this
        vm.setState({
            proveedoresServicio: []
        });
        axios.get(`${BASE_URL}/api/proveedores/servicio`)
        .then(function (response) {
            let proveedores = response.data.data;
            let arreglo = [];
            proveedores.forEach(proveedor => {
                arreglo.push({
                    id: proveedor.id,
                    name: proveedor.nombre
                })
            })
            vm.setState({
                proveedoresServicio: arreglo
            });
        })
        .catch(function (error) {
            return error;
        });


        vm.setState({
            tipoCorrespondencia: []
        });
        axios.get(`${BASE_URL}/api/tipo/correspondencia`)
        .then(function (response) {
            let tipos = response.data.data;
            let arreglo = [];
            tipos.forEach(tipo => {
                arreglo.push({
                    id: tipo.id,
                    name: tipo.nombre
                })
            })
            vm.setState({
                tipoCorrespondencia: arreglo
            });
            console.log('Proveedores Cargados');
        })
        .catch(function (error) {
            return error;
        });
    }
    render() {
        let { isSubmitting, isValid, handleSubmit, tipo, inmuebles, bloques } = this.props;

        return (
            <View style={{ marginTop: 10 }}>
                <View style={styles.picker}>
                    <Field
                        style={{ marginBottom: 10 }}
                        component={pickerSelectLayout}
                        name="tipo_correspondencia_id"
                        placeholder="Tipo de Correspondencia"
                        data={ this.state.tipoCorrespondencia }
                        updateValue={(value) => {
                            if (value == 1) {
                                this.setState({
                                    showServices: true
                                });
                            } else {
                                this.setState({
                                    showServices: false
                                });
                            }
                        }}/>
                </View>
                {
                    (this.state.showServices) ?
                        <View style={styles.picker}>
                            <Field
                                component={pickerSelectLayout}
                                name="tipo_servicio_id"
                                placeholder="Tipo de Servicio"
                                data={ this.state.proveedoresServicio }/>
                        </View>
                    : null
                }
                <Field
                    component={SwitchLayout}
                    onChange={(value) => {
                        console.log(value)
                        this.state.todos = value
                    }}
                    name="para_todos"
                    text="¿Para todos?"/>

                {
                    (!this.state.todos) ?
                        (this.props.tipo == 'casa') ?
                            <View style={[styles.controlSpace]}>
                                <View style={styles.buttonView}>
                                    <Field
                                        component={pickerSelectLayout}
                                        name="casa"
                                        placeholder="Casa"
                                        data={ inmuebles }/>
                                </View>
                            </View>
                        :
                        (this.props.tipo == 'apartamento') ?
                            <View style={[styles.controlSpace]}>
                                <View style={styles.buttonView}>
                                    <Field
                                        component={pickerSelectLayout}
                                        name="bloque"
                                        placeholder="Bloque"
                                        data={ bloques }
                                        updateValue={(value) => {
                                            console.log(value)
                                            this.setState({
                                                apartamentos: inmuebles[value]
                                            });
                                        }}/>
                                </View>
                                <View style={styles.buttonView}>
                                    <Field
                                        component={pickerSelectLayout}
                                        name="apartamento"
                                        placeholder="Apartamento"
                                        data={ this.state.apartamentos }/>
                                </View>
                            </View>
                        : null
                    : null

                }
                <ButtonSubmitLayout
                    handleSubmit={handleSubmit}
                    disabled={isSubmitting || !isValid}
                    text="Crear Correspondencia">
                </ButtonSubmitLayout>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonView: {
        width: '50%',
        padding: 10,        
    },
    controlSpace: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 40
    },
    picker: {
      marginBottom: 40
    }
});

export default withFormik({
    mapPropsToValues: (props) => ({
        tipo: props.tipo,
        bloques: props.bloques,
        inmuebles: props.inmuebles,
        tipo_correspondencia_id: '',
        tipo_servicio_id: '',
        para_todos: false,
        bloque_id: '',
        apartamento_id: '',
    }),
    validationSchema: Yup.object().shape({
        
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        setSubmitting(false)
        props.submitCorrespondencia(values);
    },

    displayName: 'FormCorrespondencia'
})(FormCorrespondencia)