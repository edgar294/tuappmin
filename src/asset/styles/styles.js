import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    /** Gradient Fondo */
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    start: {x: 0.0, y: 0.30},
    end: {x: 0.5, y: 1.0},
    locations: [0,0.8,0.9],
    colorsGradient: ['#29a8df', '#2e318f', '#2e318f'],

    /** Fonts */
    fontBold: {
        fontFamily: 'Montserrat-Bold'
    },
    fontRegular: {
        fontFamily: 'Montserrat-Regular'
    },
    fontLight: {
        fontFamily: 'Montserrat-Light'
    },
    fontBoldItalic: {
        fontFamily: 'Montserrat-BoldItalic'
    },

    /** Container */
    container: {
        flex: 1,
    },  
    content: {
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 15,
    },

    /** Fondo de color */
    backColor: {
        backgroundColor: '#343a40'
    },
    fondoWhiteColor: {
        backgroundColor: '#fff'
    },

    /** Form */
    contentForm: {
        marginBottom: 25
    },
    formSelectIos: {
        borderWidth: 1,
        borderStyle: 'dashed'
    },
    form: {
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#343a40',
        backgroundColor: '#fff',
        borderRadius: 10
    },
    iconForm: {
        width: 23,
        height: 23,
        marginRight: 10
    },
    input: {
        fontSize: 17,
        flex: 1,
        fontSize: 15,
        padding: 0
    },

    /** Menssage error */
    errorField: {
        marginTop: 5,
        fontSize: 13
    },

    /** Button */
    btn: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10
    },
    btnOutline: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 2
    },
    btnOutlineRounded: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 2
    },
    btnMin: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10 
    },  
    btnText: {
        fontSize: 14,
    },
    btnTextMin: {
        fontSize: 11,
    },
});
