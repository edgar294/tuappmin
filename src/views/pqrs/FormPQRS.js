import React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { withFormik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import Styles from '../../asset/styles/styles';
import {
    ButtonSubmitLayout, pickerSelectLayout,
    textInputMultilineLayout
} from '../layouts/Inputs';

const tipos = [
    { id: 'Pregunta', name: 'Pregunta' },
    { id: 'Queja', name: 'Queja' },
    { id: 'Reclamo', name: 'Reclamo' },
    { id: 'Sugerencia', name: 'Sugerencia' },
];

class FormPQRS extends React.Component {
    render() {
        const { isSubmitting, isValid, handleSubmit } = this.props;

        return (
            <View style={{ marginTop: 10 }}>
                <Field component={pickerSelectLayout} name="tipo_identificacion_id" placeholder="Tipo de PQRS" 
                    data={ tipos } icon={require('../../asset/images/icon_pqrs.png')} />

                <Field component={textInputMultilineLayout} name="descripcion" placeholder="Descripción" maxLength={250} />

                <ButtonSubmitLayout handleSubmit={handleSubmit} disabled={isSubmitting || !isValid} text="Generar PQRS"></ButtonSubmitLayout>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});

export default withFormik({
    mapPropsToValues: (props) => ({
        tipo_identificacion_id: ''
    }),
    validationSchema: Yup.object().shape({
        
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        setSubmitting(false)
        props.submitLogin(values);
    },
    displayName: 'FormPQRS'
})(FormPQRS)