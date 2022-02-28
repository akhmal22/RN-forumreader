import * as React from 'react';
import { Button, Card, Title, Paragraph, Appbar, Switch, IconButton, List } from 'react-native-paper';
import { ScrollView, RefreshControl } from 'react-native';
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

export default function BoardViewport({ navigation, route }){
    const [ threads, setThreads ] = React.useState<Any>(null);
    const [ isLoaded, setIsLoaded ] = React.useState(false);
    const [ loadErr, setLoadErr ] = React.useState<any>(null);
    const [ ims, setIms ] = React.useState<String>(null);
    const [refreshing, setRefreshing] = React.useState(false);

    React.useEffect(() => {
        //fetchData(setThreads, setIsLoaded, setLoadErr, setIms, "https://a.4cdn.org/"+ route.params.board +"/1.json", route.params.board);
        getData(route.params.board+"_storage", true)
        .then(
            (result) => {
                if(result==null){
                    console.log("null");
                    fetchData(setThreads, setIsLoaded, setLoadErr, setIms, "https://a.4cdn.org/"+ route.params.board +"/1.json", route.params.board);
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
                    fetchData(setThreads, setIsLoaded, setLoadErr, setIms, "https://a.4cdn.org/"+ route.params.board +"/1.json", route.params.board);
                }else{
                    console.log("not null");
                    setIsLoaded(true);
                    setThreads(result);
                    getData(route.params.board+"_time", false)
                    .then(
                        (res) => {
                            setIms(res);
                            fetchDataIfModifiedSince(setThreads, setIsLoaded, setLoadErr, setIms, "https://a.4cdn.org/"+ route.params.board +"/1.json", res, route.params.board);
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
    }else if(isLoaded && threads == null){
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
                        />
                    ))}
                </ScrollView>
            </React.Fragment>
        );
    }
}
