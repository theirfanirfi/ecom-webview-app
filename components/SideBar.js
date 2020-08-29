import React from "react";
import { View } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import { Subscribe } from "unstated"
import { AuthContainer } from "../store/auth"
import { ConcertsScreen, WebViewScreen, ViewBlogPost, Youtube, Logout, MainScreen } from "../screens"
import weburls from '../screens/urls/weburls'
const routes = ["Home", "About", "Lyrics", "Stream", "Premium Content", "Concerts", "Contact us", "News"];
export class SideBar extends React.Component {
    render() {
        const { state: { index }, navigation, callBack } = this.props
        return (
            <Container >
                <Content style={{ backgroundColor: "#000000", borderRightColor: "#3E3E3E", borderRightWidth: 0.5 }}>
                    <View style={{ height: 70, padding: 20 }}>
                        <Text style={{ color: "#fff", fontFamily: "Oswald-Regular", fontSize: 20 }}></Text>
                    </View>
                    <List
                        dataArray={routes}

                        renderRow={(data, id, itemIndex) => {
                            return (
                                <ListItem
                                    style={{ borderColor: '#3E3E3E' }}

                                    button
                                    onPress={() => {
                                        if (data == "Home") {
                                            navigation.navigate('MainScreen', { url: weburls.getHomeUrl() })

                                        } else if (data == "About") {
                                            navigation.navigate('MainScreen', { url: weburls.getAboutUrl() })

                                        } else if (data == "Lyrics") {
                                            navigation.navigate('MainScreen', { url: weburls.getLyricsUrl() })

                                        } else if (data == "Stream") {
                                            navigation.navigate('MainScreen', { url: weburls.getStreamUrl() })

                                        } else if (data == "Premium Content") {
                                            navigation.navigate('MainScreen', { url: weburls.getPremiumContentUrl() })

                                        }
                                        else if (data == "Concerts") {
                                            navigation.navigate('MainScreen', { url: weburls.getConcertsUrl() })

                                        }
                                        else if (data == "Contact us") {
                                            navigation.navigate('MainScreen', { url: weburls.getContactUrl() })

                                        }
                                        else if (data == "News") {
                                            navigation.navigate('MainScreen', { url: weburls.getNewsUrl() })

                                        }
                                    }}>
                                    <Text style={{ color: itemIndex == index ? "#DD0000" : "#fff", fontSize: 20, fontFamily: "Oswald-Regular", padding: 8 }}>
                                        {data}

                                    </Text>
                                </ListItem>

                            );
                        }}



                    />
                </Content>
            </Container>
        )

    }
}
