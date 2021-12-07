import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
import Replies from '../rnp-custom/replies';

const Header = () => (
    <Appbar.Header>
       <Appbar.Content title="Recently Viewed" />
    </Appbar.Header>
);

export default function RecentViewport(){
    return (
        <React.Fragment>
            <Header/>
            <ScrollView>
                <Replies/>
                <Replies/>
                <Replies/>
            </ScrollView>
        </React.Fragment>
    );
}
