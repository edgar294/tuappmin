import React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, Image, Alert
} from 'react-native';
import { withFormik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import Styles from '../../../asset/styles/styles';
import {
    ButtonSubmitRoundedOutlineLayout
} from '../../layouts/Inputs';

import moment from 'moment'
import 'moment/locale/es';
import * as userSelectors from '../../../state/duck/user/selector';

import axios from 'axios';
import { BASE_URL } from '../../../state/duck/constants';

moment.locale('es');

class TabCorrespondencia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    render() {
        let { changePackageStatus, correspondencias } = this.props;
        return (
            <View>
                {correspondencias.map((correspondencia, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                            borderBottomWidth: 1, borderColor: '#ced4da', alignItems: 'center' }}>
                        <View style={{ flex: .19 }}>
                        {
                            (correspondencia.tipo == 'Correspondencia') ?
                                <Image
                                    source={require('../../../asset/images/correspondencia-logo.jpg')}
                                    style={{ width: 60, height: 60, borderRadius: 10 }}>
                                </Image>
                            : null
                        }

                        {
                            (correspondencia.tipo == 'Paquetería') ?
                                <Image
                                    source={require('../../../asset/images/paqueteria-logo.jpg')}
                                    style={{ width: 60, height: 60, borderRadius: 10 }}>
                                </Image>
                            : null
                        }

                        {
                            (correspondencia.tipo == 'Servicio Público') ?

                                <Image
                                    source={require(`../../../asset/images/movistar.jpg`)}
                                    style={{ width: 60, height: 60, borderRadius: 10 }}>
                                </Image>
                            : null
                        }

                        </View>

                        <View style={{ flex: .55 }}>
                            {
                                (correspondencia.esPortero) ?
                                    <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 16 }]}>Entregar a {correspondencia.receptor}</Text>
                                    :
                                    <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 16 }]}>Recibido por {correspondencia.creador}</Text>
                            }

                            <Text style={[Styles.fontRegular, { color: '#1c7ed6', fontSize: 14 }]}>{moment(correspondencia.created_at).locale('es').fromNow()}</Text>
                        </View>

                        <View style={{ flex: .26 }}>
                            {
                                (correspondencia.status == 'porteria') ?
                                        <ButtonSubmitRoundedOutlineLayout
                                            handleSubmit={() => {
                                                changePackageStatus(correspondencia)
                                            }}
                                            borderColor="#f03e3e"
                                            color="#f03e3e"
                                            styles={{ padding: 3, borderWidth: 1 }}>
                                            <Text style={[Styles.fontRegular, { color: '#f03e3e', fontSize: 12 }]}>En porteria</Text>
                                        </ButtonSubmitRoundedOutlineLayout>
                                    :
                                        <Text style={[Styles.fontRegular, { color: '#008f39', fontSize: 12 }]}>Entregado</Text>

                            }

                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
}

export default withFormik({
    mapPropsToValues: (props) => ({
       correspondencias: props.correspondencias,
       changePackageStatus: props.changePackageStatus
    }),
    validationSchema: Yup.object().shape({

    }),
    displayName: 'TabCorrespondencia'
})(TabCorrespondencia)