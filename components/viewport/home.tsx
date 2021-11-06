import * as React from 'react';
import { BottomNavigation, Text, Button, Appbar, List, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';

const Subheader = (props) => (
  <Card>
    <Card.Content>
      <Title>{props.title}</Title>
    </Card.Content>
  </Card>
);

const Header = () => (
    <Appbar.Header>
       <Appbar.Content title="Home" />
    </Appbar.Header>
);

export default function HomeViewport(){
    return (
        <SafeAreaView>
            <Header/>
            <ScrollView>
                <React.Fragment>

                    <Subheader title="Boards"/>
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
                    <Subheader title="Thread"/>
                    <List.Item
                        title="Board Name"
                        description="/boardpath/"
                    />
                    <List.Item
                        title="Board Name"
                        description="/boardpath/"
                    />
                </React.Fragment>
            </ScrollView>
        </SafeAreaView>
    );
}
