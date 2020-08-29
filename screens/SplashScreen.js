import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
const IMAGENAME = require("./splash_screen_image.png");

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#0F0F17',
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },

});

class SplashScreen extends Component {
    state = {
    }
    gotoApp() {
        this.props.navigation.navigate('MainScreen')
    }

    componentDidMount() {
        setTimeout(() => this.gotoApp(), 4000)
    }


    render() {

        return (
            <View style={styles.root}>
                <Image source={IMAGENAME} />
            </View>
        )
    }
}

export { SplashScreen };