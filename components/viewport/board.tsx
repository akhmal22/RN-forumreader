import * as React from 'react';
import { Button, Card, Title, Paragraph, Appbar, Switch, IconButton } from 'react-native-paper';
import { ScrollView } from 'react-native';
import ThreadThumbs from '../rnp-custom/threadthumbs';
import Header from '../navigator/header';

export default function BoardViewport(props: any){

    return (
        <React.Fragment>
            <Header header="head" title="Board" index={props.index}/>
            <ScrollView>
                <ThreadThumbs index={props.index}/>
                <ThreadThumbs index={props.index}/>
                <ThreadThumbs index={props.index}/>
                <ThreadThumbs index={props.index}/>
                <ThreadThumbs index={props.index}/>
            </ScrollView>
        </React.Fragment>
    );
}
