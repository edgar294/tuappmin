import React from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    Platform, Switch
} from 'react-native';
import { ErrorMessage } from "formik";
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import Styles from '../../asset/styles/styles';

const route_assets = '../../asset/';
const route_images = 'images/';


/** Text Input Layout */
export const textInputLayout = ({
    field,
    placeholder,
    keyboardType = "default",
    secureTextEntry = false,
    autoCapitalize = "none",
    maxLength = null,
    icon,
    color = "#343a40",
    errorColor = "red",
    form: { handleChange, handleBlur, values, setFieldValue },
    ...props }) => {

    var showIconEye = false;
    /** Visualizamos el iconos para mostrar la contraseña si el campo es contraseña  */
    if (field.name == 'password' || field.name == 'password_confirmation') {
        showIconEye = true;
    }

    return (
        <View style={Styles.contentForm}>
            <Text style={[Styles.fontRegular, { color: color, fontSize: 14, marginBottom: 10 }]}>{placeholder}</Text>
            <View style={[Styles.form]}>
                <Image source={icon} style={Styles.iconForm}></Image>

                <TextInput
                    placeholder={placeholder}
                    onChangeText={handleChange(field.name)}
                    onBlur={handleBlur(field.name)}
                    style={[Styles.input, Styles.fontLight, { color: '#000', fontSize: 14 }]}
                    value={values[field.name]}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor="#343a40"
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                />

                {showIconEye && <TouchableOpacity onPress={() => setFieldValue('showPassword', !values['showPassword'])}>
                    <Image source={values['showPassword'] ? require(route_assets + route_images + 'icon_eye_not.png') : require(route_assets + route_images + 'icon_eye.png')}
                        style={[Styles.iconForm, { marginRight: 0 }]}></Image>
                </TouchableOpacity>}
            </View>

            <ErrorMessage name={field.name}>
                {
                    message => <Text style={[Styles.errorField, Styles.fontRegular, { color: errorColor }]}>{message}</Text>
                }
            </ErrorMessage>
        </View>
    )
}

export const textInputMultilineLayout = ({
    field,
    placeholder,
    keyboardType = "default",
    secureTextEntry = false,
    autoCapitalize = "none",
    maxLength = null,
    form: { handleChange, handleBlur, values, setFieldValue },
    ...props }) => {

    return (
        <View style={Styles.contentForm}>
            <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 14, marginBottom: 10 }]}>{placeholder}</Text>
            <View style={[Styles.form, { borderWidth: 1, borderRadius: 5 }]}>
                <TextInput
                    onChangeText={handleChange(field.name)}
                    onBlur={handleBlur(field.name)}
                    style={[Styles.input, Styles.fontLight, { color: '#000', fontSize: 14, height: 100 }]}
                    value={values[field.name]}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor="#343a40"
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    multiline={true}
                />
            </View>

            <ErrorMessage name={field.name}>
                {
                    message => <Text style={[Styles.errorField, Styles.fontRegular, { color: 'red' }]}>{message}</Text>
                }
            </ErrorMessage>
        </View>
    )
}

/** CheckBox Layout */
export const CheckboxLayout = ({
    field,
    text,
    form: { handleChange, handleBlur, values, setFieldValue },
    ...props }) => {
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                    type={'checkbox'}
                    value={values[field.name]}
                    onValueChange={(newValue) => setFieldValue(field.name, newValue)}
                    {...props}
                />
                <Text style={[Styles.fontRegular, { marginLeft: 5, fontSize: 14 }]}>{text}</Text>
            </View>

            <ErrorMessage name={field.name}>
                {
                    message => <Text style={[Styles.errorField, Styles.fontRegular, { color: 'red' }]}>{message}</Text>
                }
            </ErrorMessage>
        </View>
    )
}

/** CheckBox Layout */
export const SwitchLayout = ({
    field,
    text,
    form: { handleChange, handleBlur, values, setFieldValue },
    ...props }) => {
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[Styles.fontRegular, { marginLeft: 5, fontSize: 14 }]}>{text}</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    ios_backgroundColor="#3e3e3e"
                    value={values[field.name]}
                    onValueChange={(newValue) => setFieldValue(field.name, newValue)}
                    {...props}
                />
            </View>
            <ErrorMessage name={field.name}>
                {
                    message => <Text style={[Styles.errorField, Styles.fontRegular, { color: 'red' }]}>{message}</Text>
                }
            </ErrorMessage>
        </View>
    )
}


/** Button Submit */
export const ButtonSubmitLayout = ({
    text,
    backgroundColor = '#107ACC',
    color = '#fff',
    styles = {},
    handleSubmit,
    disabled,
    children,
}) => {
    return (
        <TouchableOpacity style={[Styles.btn, { backgroundColor: backgroundColor, ...styles }]}
            onPress={handleSubmit} disabled={disabled}>
            {text && <Text style={[Styles.btnText, Styles.fontBold, { color: color }]}>{text}</Text>}
            {children}
        </TouchableOpacity>
    )
}

export const ButtonSubmitOutlineLayout = ({
    text,
    borderColor = '#107ACC',
    color = '#fff',
    handleSubmit,
    disabled,
    children,
}) => {
    return (
        <TouchableOpacity style={[Styles.btnOutline, { borderColor: borderColor }]}
            onPress={handleSubmit} disabled={disabled}>
            {text && <Text style={[Styles.btnText, Styles.fontBold, { color: color }]}>{text}</Text>}
            {children}
        </TouchableOpacity>
    )
}

export const ButtonSubmitRoundedOutlineLayout = ({
    text,
    borderColor = '#107ACC',
    color = '#fff',
    styles = {},
    handleSubmit,
    disabled,
    children,
}) => {
    return (
        <TouchableOpacity style={[Styles.btnOutlineRounded, { borderColor: borderColor, ...styles }]}
            onPress={handleSubmit} disabled={disabled}>
            {text && <Text style={[Styles.btnText, Styles.fontBold, { color: color }]}>{text}</Text>}
            {children}
        </TouchableOpacity>
    )
}

/** Picker Select */
export const pickerSelectLayout = ({
    field,
    placeholder,
    data,
    icon,
    form: { setFieldValue, values },
    ...props }) => {
    return (
        <View style={Styles.contentForm}>
            <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 14, marginBottom: 10 }]}>{placeholder}</Text>
            <View style={[Styles.form, Styles.formSelectIos]}>
                <Image source={icon} style={Styles.iconForm}></Image>

                <Picker
                    style={[Styles.input, { height: Platform.OS === 'ios' ? 120 : 0, overflow: 'hidden' }]}
                    selectedValue={values[field.name]}
                    itemStyle={{ height: 130 }}
                    onValueChange={(itemValue, itemIndex) =>
                        setFieldValue(field.name, itemValue)
                    }>
                    <Picker.Item label={placeholder} value="" />
                    {
                        pickerItem(data)
                    }
                </Picker>
            </View>

            <ErrorMessage name={field.name}>
                {
                    message => <Text style={[Styles.errorField, Styles.fontRegular, { color: 'red' }]}>{message}</Text>
                }
            </ErrorMessage>
        </View>
    );
}

/** Picker item */
const pickerItem = (data = []) => {
    const pickers = data.map((element, index) => {
        return (
            <Picker.Item label={element.name} value={element.id.toString()} key={index} />
        );
    })

    return pickers;
}

/** Component year */
export const componentYear = ({
    field,
    placeholder,
    form: { setFieldValue, values },
    ...props }) => {
    return (
        <View style={Styles.contentForm}>
            <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 14, marginBottom: 10 }]}>{placeholder}</Text>
            <View style={[Styles.form]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: '10%', alignItems: 'center' }}
                        onPress={() =>
                            setFieldValue(field.name, values[field.name] - 1)
                        }>
                        <Image source={require('../../asset/images/icon_arrow_left.png')} style={{
                            width: 20, height: 20
                        }}></Image>
                    </TouchableOpacity>

                    <Text style={[Styles.fontBold, { color: '#343a40', fontSize: 14, width: '80%', textAlign: 'center' }]}>
                        {values[field.name]}
                    </Text>

                    <TouchableOpacity style={{ width: '10%', alignItems: 'center' }}
                        onPress={() =>
                            setFieldValue(field.name, values[field.name] + 1)
                        }>
                        <Image source={require('../../asset/images/icon_arrow_right.png')} style={{
                            width: 20, height: 20
                        }}></Image>
                    </TouchableOpacity>
                </View>
            </View>

            <ErrorMessage name={field.name}>
                {
                    message => <Text style={[Styles.errorField, Styles.fontRegular, { color: 'red' }]}>{message}</Text>
                }
            </ErrorMessage>
        </View>
    );
}

/** Component Month */

export const componentMonth = ({
    field,
    placeholder,
    form: { setFieldValue, values },
    ...props }) => {

    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    var renderMonth = months.map((month, key) => {
        return(
            <TouchableOpacity style={{
                width: '33.33%', height: 60, justifyContent: 'center',
                borderWidth: .2, borderColor: '#343a40'
            }} key={key} onPress={() => setFieldValue(field.name, key)}>
                <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 14, textAlign: 'center' }]}>
                    {month}
                </Text>
            </TouchableOpacity>
        );
    })

    return (
        <View style={Styles.contentForm}>
            <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 14, marginBottom: 10 }]}>{placeholder}</Text>
            
            <View style={{
                borderWidth: .8, borderColor: '#343a40', borderRadius: 10,
                flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden'
            }}>
                { renderMonth }
            </View>

            <ErrorMessage name={field.name}>
                {
                    message => <Text style={[Styles.errorField, Styles.fontRegular, { color: 'red' }]}>{message}</Text>
                }
            </ErrorMessage>
        </View>
    );
}