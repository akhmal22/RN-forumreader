import * as React from 'react';
import { Button, Card, Title, Paragraph, Appbar, Switch } from 'react-native-paper';
import { ScrollView } from 'react-native';
import ThreadThumbs from '../rnp-custom/threadthumbs';
import ThreadViewport from './thread';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Saved = ({ navigation }) => {
    return (
        <React.Fragment>
            <ScrollView>
                <ThreadThumbs navigator={navigation}/>
                <ThreadThumbs navigator={navigation}/>
                <ThreadThumbs navigator={navigation}/>
                <ThreadThumbs navigator={navigation}/>
                <ThreadThumbs navigator={navigation}/>
            </ScrollView>
        </React.Fragment>
    );
}

export default function SubscribedViewport(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Saved"
                    component={Saved}
                />
                <Stack.Screen
                    name="Thread"
                    component={ThreadViewport}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
