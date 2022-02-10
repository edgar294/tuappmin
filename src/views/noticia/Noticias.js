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

class Noticias extends React.Component {
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

    _navegar(screen) {

    }

    render() {
        if (this.props.isAuthenticated) {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView style={[Styles.container, Styles.fondoWhiteColor]}>
                        <Loader color="#fff" animating={this.state.isLoading}></Loader>

                        <View style={Styles.content}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
                                <Image source={require('../../asset/images/icon_noticias.png')} style={{
                                    width: 25, height: 25, marginRight: 10
                                }}></Image>

                                <Text style={[Styles.fontBold, { color: '#343a40', fontSize: 16 }]}>Noticias</Text>
                            </View>

                            <TouchableOpacity style={{
                                flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                                borderBottomWidth: 1, borderColor: '#ced4da'
                            }}>
                                <View style={{ flex: .35 }}>
                                    <Image source={require('../../asset/images/reunion.png')} style={{
                                        width: '100%',
                                        height: 115,
                                        borderRadius: 10
                                    }}></Image>
                                </View>

                                <View style={{ flex: .60 }}>
                                    <Text style={[Styles.fontBold, { color: '#343a40', fontSize: 14 }]}>Título de la noticia</Text>

                                    <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 12, height: 75, overflow: 'hidden' }]}>
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit dictumst, molestie nisl dis vitae et malesuada inceptos rhoncus rutrum, faucibus augue risus dictum per commodo magna. Morbi a leo risus facilisis cubilia integer suspendisse faucibus nullam, eget elementum aliquet blandit dui congue penatibus laoreet, tempor magnis mauris ut eleifend turpis id eros. Penatibus orci molestie sem habitant vitae sodales porttitor mattis metus mauris, posuere at scelerisque quisque tempus lobortis in lacus turpis dictum, feugiat quis iaculis litora praesent parturient rutrum urna elementum.
                                    </Text>

                                    <Text style={[Styles.fontRegular, { color: '#1c7ed6', fontSize: 12 }]}>Fecha de publicación: 01/12/2021</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                                borderBottomWidth: 1, borderColor: '#ced4da'
                            }}>
                                <View style={{ flex: .35 }}>
                                    <Image source={require('../../asset/images/reunion.png')} style={{
                                        width: '100%',
                                        height: 115,
                                        borderRadius: 10
                                    }}></Image>
                                </View>

                                <View style={{ flex: .60 }}>
                                    <Text style={[Styles.fontBold, { color: '#343a40', fontSize: 14 }]}>Título de la noticia</Text>

                                    <Text style={[Styles.fontRegular, { color: '#343a40', fontSize: 12, height: 75, overflow: 'hidden' }]}>
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit dictumst, molestie nisl dis vitae et malesuada inceptos rhoncus rutrum, faucibus augue risus dictum per commodo magna. Morbi a leo risus facilisis cubilia integer suspendisse faucibus nullam, eget elementum aliquet blandit dui congue penatibus laoreet, tempor magnis mauris ut eleifend turpis id eros. Penatibus orci molestie sem habitant vitae sodales porttitor mattis metus mauris, posuere at scelerisque quisque tempus lobortis in lacus turpis dictum, feugiat quis iaculis litora praesent parturient rutrum urna elementum.
                                    </Text>

                                    <Text style={[Styles.fontRegular, { color: '#1c7ed6', fontSize: 12 }]}>Fecha de publicación: 01/12/2021</Text>
                                </View>
                            </TouchableOpacity>
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
)(Noticias);