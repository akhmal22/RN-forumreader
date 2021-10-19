import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

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
       <Appbar.Content title="Recent Viewed" />
    </Appbar.Header>
);

export default function RecentViewport(){
    return (
        <React.Fragment>
            <Header/>
            <Card>
                <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                <Card.Content>
                    <Title>Card title</Title>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card>
        </React.Fragment>
    );
}
