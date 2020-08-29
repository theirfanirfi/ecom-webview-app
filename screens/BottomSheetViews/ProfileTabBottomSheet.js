import React, { Component, createRef } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types'
import weburls from '../urls/weburls.js';
const styles = StyleSheet.create({
    navButton: {
        height: 20,
        // alignItems: 'flex-start',
        justifyContent: 'center',
        // marginTop:20,
        borderBottomWidth: 1,
        borderColor: '#3E3E3E',
        width: '100%',
        padding: 30
    },
    navButtonText: {
        fontFamily: 'Oswald-Regular',
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        paddingBottom: 20
    },
});
export default class ProfileTabBottomSheet extends Component {
    static = {
        tabCallBack: PropTypes.func
    }

    returnClickedLink = link => {
        this.props.tabCallBack(link)
    }
    render() {
        return (
            <View style={{
                justifyContent: 'center',
                marginTop: 0, alignItems: 'center',

            }}>

                <TouchableOpacity style={[styles.navButton]} onPress={() => this.returnClickedLink(weburls.getProfileUrl())}>
                    <Text style={styles.navButtonText}>{'Profile'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.navButton]} onPress={() => this.returnClickedLink(weburls.getFriendsUrl())}>
                    <Text style={styles.navButtonText}>{'Friends'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navButton]} onPress={() => this.returnClickedLink(weburls.getActivityUrl())}>
                    <Text style={styles.navButtonText}>{'Activity'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navButton]} onPress={() => this.returnClickedLink(weburls.getSettingsUrl())}>
                    <Text style={styles.navButtonText}>{'Settings'}</Text>
                </TouchableOpacity>

            </View>
        )
    }
}