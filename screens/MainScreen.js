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
import AccountTabBottomSheet from './BottomSheetViews/AccountTabBottomSheet.js'
import ProfileTabBottomSheet from './BottomSheetViews/ProfileTabBottomSheet.js'
import MessageTabBottomSheet from './BottomSheetViews/MessageTabBottomSheet.js'
import ShopTabBottomSheet from './BottomSheetViews/ShopTabBottomSheet.js'
import { createStackNavigator } from '@react-navigation/stack';

const { Inbox } = bicons

const styles = StyleSheet.create({
    ActivityIndicatorStyle: {
        alignSelf: 'center',
        position: 'absolute',
        top: '50%',
        left: '45%',
        right: '45%'
    },
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
    },
    WebViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
});


const Stack = createStackNavigator();

class MainScreen extends Component {
    state = {
        activeTab: 'account',
        RBSheetView: null,
        url: "https://illumenium.veebispetsid.com/",
        visible: false,

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

    tabCallBack = url => {
        this.setState({ url: url }, () => {
            this.RBSheet.close();
        });
    }

    tabClicked = tab => {
        if (tab == 'account') {
            this.setState({
                RBSheetView: <AccountTabBottomSheet tabCallBack={this.tabCallBack} navigation={this.props.navigation} />
            }, () => {
                this.RBSheet.open();
            })
        } else if (tab == "chat") {
            this.setState({
                RBSheetView: <ShopTabBottomSheet tabCallBack={this.tabCallBack} navigation={this.props.navigation} />
            }, () => {
                this.RBSheet.open();
            })

        } else if (tab == "profile") {
            this.setState({
                RBSheetView: <ProfileTabBottomSheet tabCallBack={this.tabCallBack} navigation={this.props.navigation} />
            }, () => {
                this.RBSheet.open();
            })
        } else if (tab == "inbox") {
            this.setState({
                RBSheetView: <MessageTabBottomSheet tabCallBack={this.tabCallBack} navigation={this.props.navigation} />
            }, () => {
                this.RBSheet.open();
            })
        }
        else {
            this.props.navigation.navigate('Merch Deals', { screen: 'Carts' })
        }
    }

    componentWillUpdate() {
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.route.params.url)
        this.setState({ url: nextProps.route.params.url });
    }
    componentWillMount() {

    }

    componentDidMount() {
    }
    componentDidUpdate() {
        // console.log(this.props.route.params);

        // this.setState({ url: this.props.route.params.url });
    }

    getDerivedStateFromProps() {
        console.log('get derived updated')
    }

    ActivityIndicatorLoadingView() {
        //making a view to show to while loading the webpage
        return (
            <ActivityIndicator
                color="#009688"
                size="large"
                style={styles.ActivityIndicatorStyle}
            />
        );
    }

    showSpinner() {
        if (this.state.url != "https://illumenium.veebispetsid.com/") {
            console.log('Show Spinner');
            this.setState({ visible: true });
        }
    }

    hideSpinner() {
        console.log('Hide Spinner');
        this.setState({ visible: false });
    }
    barsIcon() {
        return (
            <Icon name="plus" size={30} color="#fff" />
        )
    }

    render() {


        if (this.state.user_id == 0) {

            this.props.navigation.navigate("Login")
        }

        const myScript = `
            var mobile = document.getElementsByClassName('fusion-mobile-menu-icons')[0];
            mobile.style.display = "none";
            `;

        return (


            <View style={styles.root}>
                <View style={styles.container}>

                    {/* 
                    <ActivityIndicator
                        color="#009688"
                        size="large"
                        style={{ flext: 1, alignSelf: 'center', justifyContent: 'center', position: 'relative', top: '40%', left: '20%', bottom: '20%' }}
                    /> */}
                    <Button onPress={() => this.props.navigation.openDrawer()} style={{ left: '3%', width: '13%', backgroundColor: '0c0c13', }} title="sidebar" >
                        <Icon name="bars" size={30} color="#fff" />
                    </Button>



                    <WebView
                        style={styles.WebViewStyle}
                        source={{ uri: this.state.url }}
                        injectedJavaScript={myScript}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        renderLoading={this.ActivityIndicatorLoadingView}
                        startInLoadingState={true}
                        onLoadStart={() => this.showSpinner()}
                        onLoad={() => this.hideSpinner()}
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
                        closeOnPressMask={true}
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

export { MainScreen };