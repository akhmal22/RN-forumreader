import * as React from 'react';
import { BottomNavigation, Text, Button, Appbar, List, Card, Title, Paragraph, Snackbar, DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, RefreshControl, Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BoardViewport from './board';
import ThreadViewport from './thread';
import ImageViewport from './imageview';
import Header from '../navigator/header';

const Stack = createNativeStackNavigator();

const storeData = async (value: Any, storage_key: string) => {
    try {
        if(typeof value !== "string"){
            const jsonValue = JSON.stringify(value);
            //console.log(jsonValue);
            await AsyncStorage.setItem(storage_key, jsonValue).then((jsonValue) => {console.log("saved")});
        }else{
            await AsyncStorage.setItem(storage_key, value);
        }
    } catch (e) {
    // saving error
        console.log(e);
    }
}

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const fetchData = async (data: Any, loaded: Any, loadErr: Any, time: Any, url: string) => {
    await fetch(url)
    .then(res => res.json())
    .then(
        (result) => {
            const d = new Date();
            loaded(true);
            data(result);
            storeData(result, "board_storage");
            time(d.toUTCString());
            storeData(d.toUTCString(), "board_time");
        },
        (error) => {
            loaded(true);
            loadErr(error);
        }
    )
}

const fetchDataIfModifiedSince = async (data: Any, loaded: Any, loadErr: Any, time: Any, url: string, lastModified: string) => {

    await fetch(url,{
        headers: {
            "If-Modified-Since": lastModified
        },
        method: 'GET'
    })
    .then(res => res.json())
    .then(
        (result) => {
            console.log("modified");
            const d = new Date();
            loaded(true);
            data(result);
            storeData(result, "board_storage");
            time(d.toUTCString());
            storeData(d.toUTCString(), "board_time");
        },
        (error) => {
            loaded(true);
            console.log("not modified");
        }
    )
}

const getData = async (storage_key: String, isJson: boolean) => {
    try {
        const value = await AsyncStorage.getItem(storage_key);
        if(!isJson){
            console.log("false");
            return value != null ? value : null;
        }else{
            console.log("true");
            return value != null ? JSON.parse(value) : null;
        }
    } catch(e) {
    // error reading value
        console.log(e);
    }
}

const dark = {
    ...DarkTheme
};

const light = {
    ...DefaultTheme
}

const Home = ({ navigation }) => {
    const [ boards, setBoards ] = React.useState<Any>(null);
    const [ isLoaded, setIsLoaded ] = React.useState(false);
    const [ loadErr, setLoadErr ] = React.useState<Any>(null);
    const [ ims, setIms ] = React.useState<String>(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const [ isDark, setIsDark ] = React.useState(false);

    React.useEffect(() => {
        getData("board_storage", true)
        .then(
            (result) => {
                if(result==null){
                    console.log("null");
                    fetchData(setBoards, setIsLoaded, setLoadErr, setIms, "https://a.4cdn.org/boards.json");
                }else{
                    console.log("not null");
                    setIsLoaded(true);
                    setBoards(result);
                    getData("board_time", false)
                    .then(
                        (res) => {
                            setIms(res);
                        }
                    )
                }
            },
            (error) => {
                console.log("err");
                setIsLoaded(true);
                setLoadErr(error);
            }
        );

        if(Appearance.getColorScheme() === 'dark'){
            setIsDark(true);
        }
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        getData("board_storage", true)
        .then(
            (result) => {
                console.log("refresh");
                if(result==null){
                    console.log("null");
                    fetchData(setBoards, setIsLoaded, setLoadErr, setIms, "https://a.4cdn.org/boards.json");
                }else{
                    console.log("not null");
                    setIsLoaded(true);
                    getData("board_time", false)
                    .then(
                        (res) => {
                            setIms(res);
                            fetchDataIfModifiedSince(setBoards, setIsLoaded, setLoadErr, setIms, "https://a.4cdn.org/boards.json", res);
                        }
                    )
                }
            },
            (error) => {
                console.log("err");
                setIsLoaded(true);
                setLoadErr(error);
            }
        )
        .then(() => setRefreshing(false));
    }

    console.log("outside: "+ims);

    console.log("outside: "+isDark);

    if(loadErr){
        return (
            <React.Fragment>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <List.Item
                        title={"Error: "+loadErr.message}
                    />
                </ScrollView>
            </React.Fragment>
        );
    }else if(!isLoaded){
        return (
            <React.Fragment>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <List.Item
                        title="Loading..."
                    />
                </ScrollView>
            </React.Fragment>
        );
    }else if(isLoaded && boards == null){
        return (
            <React.Fragment>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <List.Item
                        title="Empty"
                    />
                </ScrollView>
            </React.Fragment>
        );
    }else{
        return (
            <React.Fragment>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {boards.boards.map((board, index) => (
                        <List.Item
                            theme={isDark ? dark : light}
                            key={index}
                            title={board.title}
                            description={board.board}
                            onPress={() => {
                                navigation.navigate('Board', {board: board.board, title: board.title, isDark: isDark});
                            }}
                        />
                    ))}
                </ScrollView>
            </React.Fragment>
        );
    }
}

export default function HomeViewport(){
    if(Appearance.getColorScheme() === 'dark'){
        return (
            <PaperProvider>
                <NavigationContainer theme={dark}>
                    <Stack.Navigator theme={dark}>
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={{headerStyle: { backgroundColor: '#121212' }}}
                        />
                        <Stack.Screen
                            name="Board"
                            component={BoardViewport}
                            options={({ route }) => ({ title: route.params.title })}
                        />
                        <Stack.Screen
                            name="Thread"
                            component={ThreadViewport}
                        />
                        <Stack.Screen
                            name="Image"
                            component={ImageViewport}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        );
    }else{
        return (
            <PaperProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={Home}
                        />
                        <Stack.Screen
                            name="Board"
                            component={BoardViewport}
                            options={({ route }) => ({ title: route.params.title })}
                        />
                        <Stack.Screen
                            name="Thread"
                            component={ThreadViewport}
                        />
                        <Stack.Screen
                            name="Image"
                            component={ImageViewport}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        );
    }
}
