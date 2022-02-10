import React from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,
    SafeAreaView,
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from 'react-native-redux-alert';
import Styles from '../../asset/styles/styles';
import { Creators as userCreators } from '../../state/duck/user/user';
import * as userSelectors from '../../state/duck/user/selector';
import Loader from '../layouts/loader';
import FormAdministracion from './FormAdministracion';

class Administracion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            auth: {}
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    render() {
        if (this.props.isAuthenticated) {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView style={[Styles.container, Styles.fondoWhiteColor]}>
                        <Loader color="#fff" animating={this.state.isLoading}></Loader>

                        <View style={Styles.content}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
                                <Image source={require('../../asset/images/icon_administracion.png')} style={{
                                    width: 25, height: 25, marginRight: 10
                                }}></Image>

                                <Text style={[Styles.fontBold, { color: '#343a40', fontSize: 16 }]}>Administracion</Text>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <FormAdministracion></FormAdministracion>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        }
        else {
            return <View></View>
        }
    }
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
    return {
        isAuthenticated: userSelectors.getIsAuthenticatedSelector(state),
        status: userSelectors.getStatusSelector(state),
        message: userSelectors.getMessageSelector(state),
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(userCreators, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Administracion);