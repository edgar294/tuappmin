import React from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
} from 'react-native';
import { withFormik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import Styles from '../../asset/styles/styles';
import { textInputLayout, ButtonSubmitLayout } from '../layouts/Inputs';

class FormLogin extends React.Component {
    render() {
        const { isSubmitting, isValid, handleSubmit } = this.props;

        return (
            <View>
                <Field component={textInputLayout} name="email" placeholder="Email" keyboardType="email-address" icon={require('../../asset/images/icon_user.png')}
                color="#fff" errorColor="#fff" />
                <Field component={textInputLayout} name="password" placeholder="Contraseña" secureTextEntry={this.props.values.showPassword ? false : true} icon={require('../../asset/images/icon_lock.png')}
                color="#fff" errorColor="#fff" />

                <ButtonSubmitLayout handleSubmit={handleSubmit} disabled={isSubmitting || !isValid} text="INGRESAR"></ButtonSubmitLayout>
            </View>
        );
    }
}

export default withFormik({
    mapPropsToValues: (props) => ({
        email: '',
        password: '',
        showPassword: false
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Por favor introduzca un correo electrónico válido")
            .required("Por favor, introduzca su email"),
        password: Yup.string()
            .min(4, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
            .required("Por favor, introduzca su contraseña")
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        setSubmitting(false)
        props.submitLogin(values);
    },
    displayName: 'FormLogin'
})(FormLogin)