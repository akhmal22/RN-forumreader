import * as React from 'react';
import { Button, Card, Title, Paragraph, Appbar, Switch, IconButton, List, DefaultTheme, DarkTheme, Provider as PaperProvider, Surface } from 'react-native-paper';
import { ScrollView, RefreshControl, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThreadThumbs from '../rnp-custom/threadthumbs';
import Header from '../navigator/header';

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

const fetchData = async (data: Any, loaded: Any, loadErr: Any, time: Any, url: string, board: string) => {
    await fetch(url)
    .then(res => res.json())
    .then(
        (result) => {
            const d = new Date();
            loaded(true);
            data(result);
            storeData(result, board+"_storage");
            time(d.toUTCString());
            storeData(d.toUTCString(), board+"_time");
            console.log("fetched, last modified: "+d.toUTCString());
        },
        (error) => {
            loaded(true);
            loadErr(error);
        }
    )
}

const fetchDataIfModifiedSince = async (data: Any, loaded: Any, loadErr: Any, time: Any, url: string, lastModified: string, board: string) => {

    await fetch(url,{
        headers: {
            "If-Modified-Since": lastModified
        },
        method: 'GET'
    })
    .then(res => res.json())
    .then(
        (result) => {
            const d = new Date();
            loaded(true);
            data(result);
            storeData(result, board+"_storage");
            time(d.toUTCString());
            storeData(d.toUTCString(), board+"_time");
            console.log("modified, last modified: "+d.toUTCString());
        },
        (error) => {
            loaded(true);
            console.log(error);
            console.log("not modified, last modified: "+lastModified);
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

const styles = StyleSheet.create({
    surface: {
        padding: 8,
        minWidth: 80,
        minHeight: 80,
        elevation: 4,
        marginTop: 20,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5
    },
})

export default function BoardViewport({ navigation, route }){
    const [ threads, setThreads ] = React.useState<Any>(null);
    const [ isLoaded, setIsLoaded ] = React.useState(false);
    const [ loadErr, setLoadErr ] = React.useState<any>(null);
    const [ ims, setIms ] = React.useState<String>(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const [ page, setPage ] = React.useState(1);

    React.useEffect(() => {
        //fetchData(setThreads, setIsLoaded, setLoadErr, setIms, "https://a.4cdn.org/"+ route.params.board +"/1.json", route.params.board);
        getData(route.params.board+"_storage", true)
        .then(
            (result) => {
                if(result==null){
                    console.log("null");
                    fetchData(setThreads, setIsLoaded, setLoadErr, setIms, "https://a.4cdn.org/"+ route.params.board +"/"+ page +".json", route.params.board);
                }else{
                    console.log("not null");
                    setIsLoaded(true);
                    setThreads(result);
                    getData(route.params.board+"_time", false)
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
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        getData(route.params.board+"_storage", true)
        .then(
            (result) => {
                console.log("refresh");
                if(result==null){
                    console.log("null");
                    fetchData(setThreads, setIsLoaded, setLoadErr, setIms, "https://a.4cdn.org/"+ route.params.board +"/"+ page +".json", route.params.board);
                }else{
                    console.log("not null");
                    setIsLoaded(true);
                    setThreads(result);
                    getData(route.params.board+"_time", false)
                    .then(
                        (res) => {
                            setIms(res);
                            fetchDataIfModifiedSince(setThreads, setIsLoaded, setLoadErr, setIms, "https://a.4cdn.org/"+ route.params.board +"/"+ page +".json", res, route.params.board);
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

    const onLoadMore = () => {
        setPage(page + 1);

        console.log(page);

        fetch("https://a.4cdn.org/"+ route.params.board +"/"+ page +".json")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setThreads(threads.threads + result.threads);
            },
            (error) => {
                setIsLoaded(true);
                setLoadErr(error);
            }
        )
    }

    console.log("board.tsx isDark: " + route.params.isDark)

    console.log(threads)

    if(loadErr){
        if(!route.params.isDark){
            return (
                <PaperProvider theme={light}>
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
                </PaperProvider>
            );
        }else{
            return (
                <PaperProvider theme={dark}>
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
                </PaperProvider>
            );
        }
    }else if(!isLoaded){
        if(!route.params.isDark){
            return (
                <PaperProvider theme={light}>
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
                </PaperProvider>
            );
        }else{
            return (
                <PaperProvider theme={dark}>
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
                </PaperProvider>
            );
        }
    }else if(isLoaded && threads == null){
        if(!route.params.isDark){
            return (
                <PaperProvider theme={light}>
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
                </PaperProvider>
            );
        }else{
            return (
                <PaperProvider theme={dark}>
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
                </PaperProvider>
            );
        }
    }else{
        if(!route.params.isDark){
            return (
                <PaperProvider theme={light}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        {threads.threads.map((board, index) => (
                            <ThreadThumbs navigator={navigation}
                                key={index}
                                no={board.posts[0].no}
                                name={board.posts[0].name}
                                time={board.posts[0].time}
                                sub={board.posts[0].sub}
                                com={board.posts[0].com}
                                replies={board.posts[0].replies}
                                images={board.posts[0].images}
                                isDark={route.params.isDark}
                            />
                        ))}
                        <Surface style={styles.surface}>
                            <View style={styles.container}>
                                <Button mode="contained" onPress={() => onLoadMore()}>
                                    load more
                                </Button>
                                <Button mode="contained" onPress={() => console.log('to top pressed')}>
                                    to top
                                </Button>
                            </View>
                        </Surface>
                    </ScrollView>
                </PaperProvider>
            );
        }else{
            return (
                <PaperProvider theme={dark}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        {threads.threads.map((board, index) => (
                            <ThreadThumbs navigator={navigation}
                                key={index}
                                no={board.posts[0].no}
                                name={board.posts[0].name}
                                time={board.posts[0].time}
                                sub={board.posts[0].sub}
                                com={board.posts[0].com}
                                replies={board.posts[0].replies}
                                images={board.posts[0].images}
                                isDark={route.params.isDark}
                            />
                        ))}
                        <Surface style={styles.surface}>
                            <View style={styles.container}>
                                <Button mode="contained" onPress={() => console.log('load more pressed')}>
                                    load more
                                </Button>
                                <Button mode="contained" onPress={() => console.log('to top pressed')}>
                                    to top
                                </Button>
                            </View>
                        </Surface>
                    </ScrollView>
                </PaperProvider>
            );
        }
    }
}
