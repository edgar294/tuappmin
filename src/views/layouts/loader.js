import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import Styles from '../../asset/styles/styles';


export default class App extends React.Component {
    render() {
        if(this.props.animating){
            return (
                <View style={styles.container}>
                    <ActivityIndicator style={styles.activityIndicator} size="large" color={this.props.color} animating={this.props.animating} />
                </View>
            );
        }
        else{
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    activityIndicator: {
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 100
    }
});