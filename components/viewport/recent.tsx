import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
import PaperCustom from '../rnp-custom/paper';

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    }
})

const Header = () => (
    <Appbar.Header>
       <Appbar.Content title="Bookmarked" />
    </Appbar.Header>
);

export default function AlbumViewport(){
    return (
        <React.Fragment>
            <Header/>
            <PaperCustom/>
            <PaperCustom/>
            <PaperCustom/>
        </React.Fragment>
    );
}
