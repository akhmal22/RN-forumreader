import * as React from 'react';
import { Button, Card, Title, Paragraph, Appbar, Switch, IconButton } from 'react-native-paper';
import { ScrollView } from 'react-native';
import ThreadStarter from '../rnp-custom/threadstarter';
import ThreadComment from '../rnp-custom/threadcomment';
import Header from '../navigator/header';

export default function ThreadViewport(){
    return (
        <React.Fragment>
            <ScrollView>
                <ThreadStarter/>
                <ThreadComment/>
                <ThreadComment/>
                <ThreadComment/>
                <ThreadComment/>
            </ScrollView>
        </React.Fragment>
    );
}
