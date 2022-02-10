import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Creators as userCreators } from '../../state/duck/user/user';
import * as userSelectors from '../../state/duck/user/selector';

class HeaderRight extends Component {
    render() {
        return (
            <View style={{ marginRight: 15 }}>
                <TouchableOpacity onPress={
                    () => this.props.navigation.toggleDrawer()
                }>
                    <Image
                        style={{
                            width: 25,
                            height: 25,
                            alignSelf: 'center'
                        }}
                        source={require('../../asset/images/icon_menu.png')}>
                    </Image>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageLogo: {
        width: '100%',
        maxWidth: 180,
        height: 70,
        resizeMode: 'stretch',
        alignSelf: 'center',
        marginTop: 25
    },
    imagePerfil: {
        width: 140,
        height: 140,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 100
    },
    textName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        paddingHorizontal: 5
    },
    item: {
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 15
    },
    textItem: {
        fontSize: 16
    },
    textVersion: {
        textAlign: 'center',
        marginTop: 25,
        color: '#464646'
    }
})

const mapStateToProps = state => {
    return {
        isAuthenticated: userSelectors.getIsAuthenticatedSelector(state),
    }
}

const mapDispatchToProps = dispatch => ({
    closeSession: () => dispatch(userCreators.requestLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRight)
