import * as React from 'react';
import { Button, Card, Title, Paragraph, Appbar, Switch } from 'react-native-paper';
import { ScrollView } from 'react-native';
import Threads from '../rnp-custom/threadthumbs';

const Header = () => (
    <Appbar.Header>
       <Appbar.Content title="Subscribed" />
       <SwitchBoardThread/>
    </Appbar.Header>
);

export default function SubscribedViewport(){
    return (
        <React.Fragment>
            <Header/>
            <ScrollView>
                <Threads/>
                <Threads/>
                <Threads/>
                <Threads/>
                <Threads/>
            </ScrollView>
        </React.Fragment>
    );
}

const SwitchBoardThread = () => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};
