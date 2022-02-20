import React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, Switch
} from 'react-native';
import { withFormik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import Styles from '../../asset/styles/styles';
import {
    ButtonSubmitLayout, pickerSelectLayout,
    textInputMultilineLayout, SwitchLayout
} from '../layouts/Inputs';

const tipoCorrespondencia = [
    { id: 'servicio', name: 'Servicio Público' },
    { id: 'correspondencia', name: 'Correspondencia' },
    { id: 'paqueteria', name: 'Paquetería' },    
];

const tipoServicio = [
    { id: 'movistar', name: 'Movistar' },
    { id: 'claro', name: 'Claro' },
    { id: 'entel', name: 'Entel' },
    { id: 'directTv', name: 'Direct Tv' },
];

const apartamentos = [
    { id: '1-1', name: '1-1' },
    { id: '1-2', name: '1-2' },
    { id: '1-3', name: '1-3' },
];

const bloques = [
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' },
];


class FormCorrespondencia extends React.Component {
    render() {
        const { isSubmitting, isValid, handleSubmit } = this.props;

        return (
            <View style={{ marginTop: 10 }}>
                <Field 
                    component={pickerSelectLayout} 
                    name="tipo_correspondencia_id"
                    placeholder="Tipo de Correspondencia" 
                    data={ tipoCorrespondencia } 
                    icon={require('../../asset/images/icon_pqrs.png')}/>
                
                <Field 
                    component={pickerSelectLayout} 
                    name="tipo_servicio_id" 
                    placeholder="Tipo de Servicio" 
                    data={ tipoServicio } 
                    icon={require('../../asset/images/icon_pqrs.png')}/>

                <Field
                    component={SwitchLayout}
                    name="para_todos"
                    text="¿Para todos?"
                    icon={require('../../asset/images/icon_pqrs.png')}/>

                <View style={[styles.controlSpace]}>
                    <View style={styles.buttonView}>
                        <Field 
                            component={pickerSelectLayout} 
                            name="bloque_id"
                            placeholder="Bloque" 
                            data={ bloques }
                            icon={require('../../asset/images/icon_pqrs.png')}/>
                    </View>
                    <View style={styles.buttonView}>
                        <Field 
                            component={pickerSelectLayout} 
                            name="apartamento_id"
                            placeholder="Apartamento" 
                            data={ apartamentos }
                            icon={require('../../asset/images/icon_pqrs.png')}/>                        
                    </View>
                </View>
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
      },
});

export default withFormik({
    mapPropsToValues: (props) => ({
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