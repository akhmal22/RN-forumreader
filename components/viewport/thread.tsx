import * as React from 'react';
import { Button, Card, Title, Paragraph, Appbar, Switch, IconButton } from 'react-native-paper';
import { ScrollView } from 'react-native';
import ThreadStarter from '../rnp-custom/threadstarter';
import ThreadComment from '../rnp-custom/threadcomment';
import Header from '../navigator/header';

export default function ThreadViewport(props: any){

    return (
        <React.Fragment>
            <Header header="head" title="Thread Name" index={props.index}/>
            <ScrollView>
                <ThreadStarter index={props.index}/>
                <ThreadComment/>
                <ThreadComment/>
                <ThreadComment/>
                <ThreadComment/>
            </ScrollView>
        </React.Fragment>
    );
}
