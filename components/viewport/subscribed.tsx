import * as React from 'react';
import { Button, Card, Title, Paragraph, Appbar, Switch } from 'react-native-paper';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Threads from '../rnp-custom/threadthumbs';

const Header = () => (
    <Appbar.Header>
       <Appbar.Content title="Subscribed" />
       <SwitchBoardThread/>
    </Appbar.Header>
);

export default function SubscribedViewport(){
    return (
        <SafeAreaView>
            <Header/>
            <ScrollView>
                <React.Fragment>
                    <Threads/>
                    <Threads/>
                    <Threads/>
                    <Threads/>
                    <Threads/>
                </React.Fragment>
            </ScrollView>
        </SafeAreaView>
    );
}

const SwitchBoardThread = () => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};
