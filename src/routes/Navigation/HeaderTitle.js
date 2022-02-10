import React from 'react';
import {
    Platform, Text
} from 'react-native';
import Styles from '../../asset/styles/styles';

export default class App extends React.Component {
    render() {
        return (
            <Text style={[Styles.fontBoldItalic, { color: '#fff', fontSize: 18 }]}>Tuappmin</Text>
        );
    }
}