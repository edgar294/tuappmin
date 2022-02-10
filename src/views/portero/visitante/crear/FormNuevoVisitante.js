import React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { withFormik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { 
    textInputLayout, ButtonSubmitLayout, 
    pickerSelectLayout 
} from '../../../layouts/Inputs';
import Styles from '../../../../asset/styles/styles';

class FormPerfil extends React.Component {
    render() {
        const {
            isSubmitting, isValid, handleSubmit,
        } = this.props;

        return (
            <View>
                <Field component={textInputLayout} name="name" placeholder="Nombre completo" icon={require('../../../../asset/images/icon_user.png')} autoCapitalize="words" />
                <Field component={textInputLayout} name="email" placeholder="Email" keyboardType="email-address" icon={require('../../../../asset/images/icon_email.png')} />
                <Field component={textInputLayout} name="telefono" placeholder="Teléfono" keyboardType="phone-pad" icon={require('../../../../asset/images/icon_tel.png')} />

                <Text style={[Styles.fontRegular, { color: 'orange', fontSize: 13, marginBottom: 15 }]}>Para modificar su contraseña complete estos campos</Text>

                <Field component={textInputLayout} name="password" placeholder="Contraseña" secureTextEntry={this.props.values.showPassword ? false : true} icon={require('../../../../asset/images/icon_lock.png')} />
                <Field component={textInputLayout} name="password_confirmation" placeholder="Confirmar contraseña" secureTextEntry={this.props.values.showPassword ? false : true} icon={require('../../../../asset/images/icon_lock.png')} />

                <ButtonSubmitLayout handleSubmit={handleSubmit} disabled={isSubmitting || !isValid} text="GUARDAR"></ButtonSubmitLayout>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default withFormik({
    mapPropsToValues: (props) => ({
        name: props.user.name,
        email: props.user.email,
        telefono: props.user.telefono,
        password: '',
        password_confirmation: '',
        showPassword: false
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("Por favor, introduzca su nombre"),
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        setSubmitting(false)
        props.submitAction(values);
    },
    displayName: 'FormPerfil'
})(FormPerfil)