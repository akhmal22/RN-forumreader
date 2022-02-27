import * as React from 'react';
import { Button, Card, Title, Paragraph, Appbar, Switch } from 'react-native-paper';
import { ScrollView } from 'react-native';
import ThreadThumbs from '../rnp-custom/threadthumbs';
import ThreadViewport from './thread';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Recents = ({ navigation }) => {
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

export default function RecentViewport(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Recents"
                    component={Recents}
                />
                <Stack.Screen
                    name="Thread"
                    component={ThreadViewport}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
