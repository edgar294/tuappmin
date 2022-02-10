import React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity,
    Dimensions
} from 'react-native';
import { withFormik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import Styles from '../../asset/styles/styles';
import {
    ButtonSubmitLayout, pickerSelectLayout
} from '../layouts/Inputs';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Modal from "react-native-modal";
import moment from 'moment';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const tipos = [
    { id: 'Pregunta', name: 'Pregunta' },
    { id: 'Queja', name: 'Queja' },
    { id: 'Reclamo', name: 'Reclamo' },
    { id: 'Sugerencia', name: 'Sugerencia' },
];

LocaleConfig.locales['fr'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
    today: 'Aujourd\'hui'
};

LocaleConfig.defaultLocale = 'fr';

class FormAdministracion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    componentDidUpdate(prevProps) {
        const { status, message, isAuthenticated, dispatch } = this.props;

        if (this.props.values.fecha !== '' && this.props.values.fecha !== prevProps.values.fecha) {
            this.setState({ showModal: true });
        }
    }

    render() {
        const { isSubmitting, isValid, handleSubmit } = this.props;

        return (
            <View>
                <Field component={pickerSelectLayout} name="zona_comun_id" placeholder="Seleccione la zona común de interés"
                    data={tipos} icon={require('../../asset/images/icon_zonas.png')} />

                <Calendar
                    // Initially visible month. Default = now
                    current={moment(new Date()).format('YYYY-MM-DD')}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => { this.props.setFieldValue('fecha', day.dateString) }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => { console.log('selected day', day) }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MMMM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => { console.log('month changed', month) }}
                />

                <Modal isVisible={this.state.showModal}
                    onBackdropPress={() => {
                        this.setState({
                            showModal: !this.state.showModal,
                        });

                        this.props.setFieldValue('fecha', '');
                    }}
                    deviceWidth={deviceWidth} deviceHeight={deviceHeight}
                    swipeDirection="left">
                    <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>
                        <Text style={[Styles.fontBold, {
                            color: '#343a40', fontSize: 14, marginTop: 15, marginBottom: 15,
                            textAlign: 'center'
                        }]}>
                            Reservar
                        </Text>

                        <View style={{
                            paddingHorizontal: 8, borderTopWidth: 1, borderBottomWidth: 1,
                            borderColor: '#ced4da', flexDirection: 'row', justifyContent: 'center',
                            padding: 10
                        }}>
                            <Text style={[Styles.fontRegular, {
                                color: '#343a40', fontSize: 14, textAlign: 'center'
                            }]}>
                                Fecha de la reserva: <Text style={Styles.fontBold}>{ this.props.values.fecha }</Text>
                            </Text>
                        </View>

                        <Text style={[Styles.fontRegular, {
                            color: '#343a40', fontSize: 14, textAlign: 'center',
                            marginTop: 15, marginBottom: 15
                        }]}>Total:
                            <Text style={Styles.fontBold}> $100.00</Text>
                        </Text>

                        <ButtonSubmitLayout handleSubmit={handleSubmit} disabled={isSubmitting || !isValid} text="RESERVAR"></ButtonSubmitLayout>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    circle: {
        sshadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius: 100,
        padding: 4,
    }
});

export default withFormik({
    mapPropsToValues: (props) => ({
        zona_comun_id: '',
        fecha: ''
    }),
    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        setSubmitting(false)
        props.submitLogin(values);
    },
    displayName: 'FormAdministracion'
})(FormAdministracion)