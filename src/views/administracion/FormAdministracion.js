import React from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    Dimensions
} from 'react-native';
import { withFormik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import Styles from '../../asset/styles/styles';
import {
    textInputLayout, ButtonSubmitLayout, componentYear,
    componentMonth
} from '../layouts/Inputs';
import moment from 'moment';
import Modal from "react-native-modal";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

class FormAdministracion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    componentDidUpdate(prevProps) {
        const { status, message, isAuthenticated, dispatch } = this.props;

        if (this.props.values.month !== '' && this.props.values.month !== prevProps.values.month) {
            this.setState({ showModal: true });
        }
    }

    render() {
        const { isSubmitting, isValid, handleSubmit } = this.props;

        return (
            <View>
                <Field component={componentYear} name="year" placeholder="Seleccione el año" />
                <Field component={componentMonth} name="month" placeholder="Seleccione el mes que quiere pagar" />

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.circle}>
                            <View style={{
                                backgroundColor: '#2f9e44', width: 15, height: 15, borderRadius: 100
                            }}></View>
                        </View>

                        <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 14, marginLeft: 5 }]}>Al día</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                        <View style={styles.circle}>
                            <View style={{
                                backgroundColor: '#f03e3e', width: 15, height: 15, borderRadius: 100
                            }}></View>
                        </View>

                        <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 14, marginLeft: 5 }]}>En mora</Text>
                    </View>
                </View>

                <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 14, marginTop: 15, marginBottom: 15 }]}>
                    Se desea puede cancelar todo el año haciendo clic en el botón
                </Text>

                <Modal isVisible={this.state.showModal}
                    onBackdropPress={() => {
                        this.setState({
                            showModal: !this.state.showModal,
                        });

                        this.props.setFieldValue('month', '');
                    }}
                    deviceWidth={deviceWidth} deviceHeight={deviceHeight}
                    swipeDirection="left">
                    <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>
                        <Text style={[Styles.fontBold, {
                            color: '#343a40', fontSize: 14, marginTop: 15, marginBottom: 15,
                            textAlign: 'center'
                        }]}>
                            {months[this.props.values.month]}
                        </Text>

                        <View style={{
                            paddingHorizontal: 8, borderTopWidth: 1, borderBottomWidth: 1,
                            borderColor: '#ced4da', flexDirection: 'row', justifyContent: 'space-between',
                            padding: 10
                        }}>
                            <Text style={[Styles.fontRegular, {
                                color: '#343a40', fontSize: 14, textAlign: 'center'
                            }]}>
                                Valor a pagar: <Text style={Styles.fontBold}>$90.00</Text>
                            </Text>

                            <Text style={[Styles.fontRegular, {
                                color: '#343a40', fontSize: 14, textAlign: 'center'
                            }]}>
                                Mora: <Text style={[Styles.fontBold, { color: '#f03e3e' }]}>$10.00</Text>
                            </Text>
                        </View>

                        <Text style={[Styles.fontRegular, {
                            color: '#343a40', fontSize: 14, textAlign: 'center',
                            marginTop: 15, marginBottom: 15
                        }]}>Total:
                            <Text style={Styles.fontBold}> $10.00</Text>
                        </Text>

                        <ButtonSubmitLayout handleSubmit={handleSubmit} disabled={isSubmitting || !isValid} text="PAGAR"></ButtonSubmitLayout>
                    </View>
                </Modal>

                <ButtonSubmitLayout handleSubmit={handleSubmit} disabled={isSubmitting || !isValid} text="Pago anticipado"
                    color="#fff" backgroundColor="#2f9e44"></ButtonSubmitLayout>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    circle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 100,
        padding: 4,
        backgroundColor: '#fff'
    }
});

export default withFormik({
    mapPropsToValues: (props) => ({
        year: parseInt(moment(new Date()).format('YYYY')),
        month: ''
    }),
    validationSchema: Yup.object().shape({
        year: Yup.number()
            .required("Por favor, complete este campo"),
        month: Yup.number()
            .required("Por favor, complete este campo"),
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        setSubmitting(false)
        props.submitLogin(values);
    },
    displayName: 'FormAdministracion'
})(FormAdministracion)