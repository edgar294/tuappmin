import React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, Image
} from 'react-native';
import { withFormik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import Styles from '../../../asset/styles/styles';
import {
    ButtonSubmitRoundedOutlineLayout
} from '../../layouts/Inputs';

class TabCorrespondencia extends React.Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={{
                    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                    borderBottomWidth: 1, borderColor: '#ced4da', alignItems: 'center'
                }}>
                    <View style={{ flex: .19 }}>
                        <Image source={require('../../../asset/images/avatar_perfil.png')} style={{
                            width: 60, height: 60, borderRadius: 10
                        }}></Image>
                    </View>

                    <View style={{ flex: .55 }}>
                        <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 14 }]}>Nombre del visitante</Text>

                        <Text style={[Styles.fontRegular, { color: '#1c7ed6', fontSize: 13 }]}>Ingreso: 01/12/2021</Text>
                    </View>

                    <View style={{ flex: .26 }}>
                        <ButtonSubmitRoundedOutlineLayout borderColor="#f03e3e" color="#f03e3e" styles={{
                            padding: 3, borderWidth: 1
                        }}>
                            <Text style={[Styles.fontRegular, { color: '#f03e3e', fontSize: 12 }]}>En porteria</Text>
                        </ButtonSubmitRoundedOutlineLayout>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                    borderBottomWidth: 1, borderColor: '#ced4da', alignItems: 'center'
                }}>
                    <View style={{ flex: .19 }}>
                        <Image source={require('../../../asset/images/avatar_perfil.png')} style={{
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
                            <Text style={[Styles.fontRegular, { color: '#37b24d', fontSize: 12 }]}>Entregado</Text>
                        </ButtonSubmitRoundedOutlineLayout>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default withFormik({
    mapPropsToValues: (props) => ({

    }),
    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        setSubmitting(false)
        props.submitAction(values);
    },
    displayName: 'TabCorrespondencia'
})(TabCorrespondencia)