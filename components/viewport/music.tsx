import * as React from 'react';
import { BottomNavigation, Text, Button, Appbar, List } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        flex: 0
    }
})

const Header = () => (
    <Appbar.Header>
       <Appbar.Content title="Boards" />
    </Appbar.Header>
);

export default function MusicViewport(){
    return (
        <React.Fragment>
            <Header/>

            <List.Item
                title="Board Name"
                description="/boardpath/"
            />
            <List.Item
                title="Board Name"
                description="/boardpath/"
            />
            <List.Item
                title="Board Name"
                description="/boardpath/"
            />
            <List.Item
                title="Board Name"
                description="/boardpath/"
            />
        </React.Fragment>
    );
}
