import * as React from 'react';
import { BottomNavigation, Text, Button, Appbar, List, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import BoardViewport from './board';
import ThreadViewport from './thread';
import ImageViewport from './imageview';
import Header from '../navigator/header';

export default function HomeViewport(){
    const [index, setIndex] = React.useState(0);

    if(index===0){
        return (
            <React.Fragment>
                <Header header="head" title="Home" index={[index, setIndex]}/>
                <ScrollView>
                    <Header header="sub" title="Recent Viewed"/>
                    <List.Item
                        title="Board Name"
                        description="/boardpath/"
                        onPress={() => {setIndex(1);}}
                    />
                    <List.Item
                        title="Board Name"
                        description="/boardpath/"
                        onPress={() => {setIndex(1);}}
                    />
                    <List.Item
                        title="Board Name"
                        description="/boardpath/"
                        onPress={() => {setIndex(1);}}
                    />
                    <List.Item
                        title="Board Name"
                        description="/boardpath/"
                        onPress={() => {setIndex(1);}}
                    />
                    <Header header="sub" title="Recent Viewed"/>
                    <List.Item
                        title="Board Name"
                        description="/boardpath/"
                        onPress={() => {setIndex(1);}}
                    />
                    <List.Item
                        title="Board Name"
                        description="/boardpath/"
                        onPress={() => {setIndex(1);}}
                    />
                </ScrollView>
            </React.Fragment>
        );
    }else if(index===1){
        return(
            <BoardViewport index={[index, setIndex]}/>
        );
    }else if(index===2){
        return(
            <ThreadViewport index={[index, setIndex]}/>
        );
    }else{
        return(
            <ImageViewport index={[index, setIndex]}/>
        );
    }
}
