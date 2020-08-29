import React, { Component, createRef } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import { VideoBox } from '../components/VideoBox';
import { Subscribe } from 'unstated';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation';
import RBSheet from "react-native-raw-bottom-sheet";
import { AuthContainer } from '../store/auth';
import HTML from 'react-native-render-html';
import { bicons } from '../components/Icons';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';

import AccountTabBottomSheet from '../screens/BottomSheetViews/AccountTabBottomSheet.js'
import ProfileTabBottomSheet from '../screens/BottomSheetViews/ProfileTabBottomSheet.js'
import MessageTabBottomSheet from '../screens/BottomSheetViews/MessageTabBottomSheet.js'
import ShopTabBottomSheet from '../screens/BottomSheetViews/ShopTabBottomSheet.js'

const { Inbox } = bicons

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#0c0c13',
        flex: 1
    },
    wrapperListAndText: {
        marginHorizontal: 15,
    },
    flatListContainer: {
        // marginVertical: 10
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'black',
        // backgroundColor: 'red',
        height: 40
    },
    item: {
        color: 'white',
        fontFamily: "Oswald-Regular"
    },
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
    addedTitleText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        // marginVertical: 15,
        marginTop: 15,
        marginBottom: 13,
        padding: 5,
        fontFamily: "Roboto-Bold"
    },
    exampleText: {
        fontSize: 16,
        color: 'white',
        padding: 5,
        lineHeight: 25,
        fontFamily: "Oswald-Regular"
    },
    signUpBtn: {
        backgroundColor: '#DD0000',
        width: 180,
        height: 56,
        justifyContent: 'center',
        borderRadius: 5
    },
    signUpBtnContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 33,
    },
    signUpBtnText: {
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "Roboto-Bold",
        fontSize: 15
    },

    container: {
        flex: 1,
        // marginTop: 20,
    },
    list: {
        paddingHorizontal: 17,
        backgroundColor: "#0c0c13",
    },
    separator: {
        marginTop: 10,
    },
    /******** card **************/
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor: "#0c0c13"
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        backgroundColor: "#EEEEEE",
    },
    cardImage: {
        flex: 1,
        height: 150,
        width: null,
    },
    /******** card components **************/
    title: {
        fontSize: 18,
        flex: 1,
        color: 'red'
    },
    description: {
        fontSize: 15,
        color: "#888",
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    time: {
        fontSize: 13,
        color: "#808080",
        marginTop: 5
    },
    icon: {
        width: 25,
        height: 25,
    },
    iconData: {
        width: 15,
        height: 15,
        marginTop: 5,
        marginRight: 5
    },
    timeContainer: {
        flexDirection: 'row'
    },
    /******** social bar ******************/
    socialBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    socialBarSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    socialBarlabel: {
        marginLeft: 8,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    socialBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});



class ShopSubscriptionStack extends Component {
    state = {
        activeTab: 'account',
        RBSheetView: null,
        posts: [],

    }

    constructor(props) {
        super(props);
        // console.log('constructor called')
    }

    tabs = [
        {
            key: 'account',
            icon: 'user',
            label: 'Account',
            barColor: 'lightgray',
            pressColor: 'lightgray'
        },
        {
            key: 'chat',
            icon: 'shopping-basket',
            label: 'Shop',
            barColor: '#B71C1C',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'profile',
            icon: 'user-circle',
            label: 'Profile',
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'inbox',
            icon: "inbox",
            label: 'Messages',
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
        ,
        // {
        //     key: 'cart',
        //     icon: 'shopping-cart',
        //     label: 'cart',
        //     barColor: '#E64A19',
        //     pressColor: 'rgba(255, 255, 255, 0.16)'
        // }
    ]

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="black" name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            labelStyle={{ color: 'black' }}
            renderIcon={this.renderIcon(tab.icon)}
            style={{ backgroundColor: 'white' }}
        />
    )




    tabClicked = tab => {
        console.log(tab)
        if (tab == 'account') {
            this.setState({
                RBSheetView: <AccountTabBottomSheet navigation={this.props.navigation} />
            }, () => {
                this.RBSheet.open();
            })
        } else if (tab == "chat") {
            this.setState({
                RBSheetView: <ShopTabBottomSheet navigation={this.props.navigation} />
            }, () => {
                this.RBSheet.open();
            })

        } else if (tab == "profile") {
            this.setState({
                RBSheetView: <ProfileTabBottomSheet navigation={this.props.navigation} />
            }, () => {
                this.RBSheet.open();
            })
        } else if (tab == "inbox") {
            this.setState({
                RBSheetView: <MessageTabBottomSheet navigation={this.props.navigation} />
            }, () => {
                this.RBSheet.open();
            })

        }
        // else {
        //     this.props.navigation.navigate('Merch Deals', { screen: 'Carts' })
        // }
    }

    async componentDidMount() {

    }



    render() {

        const myScript = `
            var divsToHide = document.getElementsByClassName("fusion-mobile-nav-item"); //divsToHide is an array
            for(var i = 0; i < divsToHide.length; i++){
                divsToHide[i].style.display = "none"; // depending on what you're doing
            }
            var divsToHideExtra = document.getElementsByClassName("logged-out"); //divsToHide is an array
            for(var i = 0; i < divsToHideExtra.length; i++){
                divsToHideExtra[i].style.display = "none"; // depending on what you're doing
            }
            var divsToShow = document.getElementsByClassName("show-app"); //divsToHide is an array
            for(var i = 0; i < divsToShow.length; i++){ // or
                divsToShow[i].style.display = "block"; // depending on what you're doing
            }
        true; `;
        return (


            <View style={styles.root}>
                <View style={styles.container}>
                    <WebView
                        scrollEnabled={false}
                        source={{ uri: 'https://illumenium.veebispetsid.com/toode/subscription' }}
                        injectedJavaScript={myScript}
                        javaScriptEnabled
                    />


                    <BottomNavigation
                        activeTab={this.state.activeTab}
                        onTabPress={newTab => this.tabClicked(newTab.key)}
                        renderTab={this.renderTab}
                        tabs={this.tabs}
                        style={{ color: 'black', marginLeft: 2 }}
                    />
                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        openDuration={250}
                        animationType="slide"
                        closeOnDragDown={true}
                        closeOnPressBack={true}
                        onClose={() => this.setState({ RBSheetView: null })}
                        keyboardAvoidingViewEnabled={true}

                    >
                        <View>
                            {this.state.RBSheetView}
                        </View>
                    </RBSheet>
                </View>
            </View>




        )
    }
}

export default ShopSubscriptionStack;