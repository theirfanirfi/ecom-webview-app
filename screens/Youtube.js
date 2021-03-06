
import React, { Component } from 'react';
import { Text, Button, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation';
import RBSheet from "react-native-raw-bottom-sheet";
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

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
    container: {
        flex: 1,
        // marginTop: 20,
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
    item: {
        color: 'white',
        fontFamily: "Roboto-Regular"
    },

    separator: {
        marginTop: 10,
    },

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
});


const key = "AIzaSyCHhXBHZbqNpIx5v_5cXxXejPb-9JMCLpI";
const results_per_page = 300;
const channelId = "UCe4iyHIns9fptt9aa0E_vZg";
//const youtube_data_url = "https://www.googleapis.com/youtube/v3/playlistItems?playlistId=" + channelId + "&maxResults=" + results_per_page + "&part=snippet%2CcontentDetails&key=" + key

//const youtube_channel_url = "https://www.googleapis.com/youtube/v3/channels?id=" + channelId + "&part=snippet%2CcontentDetails&key=" + key + "&maxResults=" + results_per_page
const youtube_channel_url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCHhXBHZbqNpIx5v_5cXxXejPb-9JMCLpI&channelId=UCe4iyHIns9fptt9aa0E_vZg&part=snippet,id&order=date&maxResults=20"
class Youtube extends Component {

    state = {
        youtube_videos: [],
        activeTab: 'account',
        RBSheetView: null,
        posts: [],


    }
    componentDidMount() {
        fetch(youtube_channel_url)
            .then(res => res.json())
            .then(res => {
                this.setState({ youtube_videos: res.items });
            })
    }

    webViewLoading() {
        return (
            <Progress.Circle size={50} indeterminate={true} />
        );
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

    accountTabLinks() {
        return (
            <View style={{
                justifyContent: 'center',
                marginTop: 0, alignItems: 'center',

            }}>

                <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('Orders')}>
                    <Text style={styles.navButtonText}>{'Orders'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('Memberships')}>
                    <Text style={styles.navButtonText}>{'Memberships'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('Subscription')}>
                    <Text style={styles.navButtonText}>{'Subscriptions'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('Download')}>
                    <Text style={styles.navButtonText}>{'Downloads'}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    profileTabLinks() {
        return (
            <View style={{
                justifyContent: 'center',
                marginTop: 0, alignItems: 'center',
            }}>

                <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('Profile')}>
                    <Text style={styles.navButtonText}>{'Profile'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('Friends')}>
                    <Text style={styles.navButtonText}>{'Friends'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('Activity')}>
                    <Text style={styles.navButtonText}>{'Activity'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('Settings')}>
                    <Text style={styles.navButtonText}>{'Settings'}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    messageTabLinks() {
        return (
            <View style={{
                justifyContent: 'center',
                marginTop: 0, alignItems: 'center',
            }}>

                <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('Inbox')}>
                    <Text style={styles.navButtonText}>{'Inbox'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('Starred')}>
                    <Text style={styles.navButtonText}>{'Starred'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('Sent')}>
                    <Text style={styles.navButtonText}>{'Sent'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('Compose')}>
                    <Text style={styles.navButtonText}>{'Compose'}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    tabClicked = tab => {
        if (tab == 'account') {
            this.setState({
                RBSheetView: this.accountTabLinks()
            }, () => {
                this.RBSheet.open();
            })
        } else if (tab == "chat") {
            this.props.navigation.navigate('Shop')

        } else if (tab == "profile") {
            this.setState({
                RBSheetView: this.profileTabLinks()
            }, () => {
                this.RBSheet.open();
            })
        } else if (tab == "inbox") {
            this.setState({
                RBSheetView: this.messageTabLinks()
            }, () => {
                this.RBSheet.open();
            })

            /* this.props.navigation.navigate('WebViewScreen', { url: "https://illumenium.veebispetsid.com/members/hanno/messages/" })*/
        }
        else {
            this.props.navigation.navigate('Merch Deals', { screen: 'Carts' })
        }
    }
    render() {
        const { posts, loading } = this.state;
        const myScript = `
            var divsToHide = document.getElementsByClassName("fusion-mobile-nav-item"); 
            for(var i = 0; i < divsToHide.length; i++){
                divsToHide[i].style.display = "none";
            }
            var divsToHideExtra = document.getElementsByClassName("logged-out"); 
            for(var i = 0; i < divsToHideExtra.length; i++){
                divsToHideExtra[i].style.display = "none"; 
            }
            var divsToShow = document.getElementsByClassName("show-app"); 
            for(var i = 0; i < divsToShow.length; i++){ 
                divsToShow[i].style.display = "block";
            }
        true; `;

        return (


            <View style={styles.root}>
                <View style={styles.container}>
                    <WebView
                        scrollEnabled={false}
                        source={{ uri: 'https://illumenium.veebispetsid.com/youtube/' }}
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
export { Youtube };


