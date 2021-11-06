import * as React from 'react';
import { Surface, Text, Headline, Subheading, Avatar, IconButton } from 'react-native-paper';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" size={40} />

const styles = StyleSheet.create({
    surface: {
        padding: 8,
        minWidth: 80,
        minHeight: 80,
        elevation: 4,
        marginTop: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
    },
    replying: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 40,
        flex: 1,
        flexWrap: 'wrap',
        flexShrink: 1,
    },
    view: {
        marginRight: 10
    },
    title: {
        marginRight: 40,
    },
    subtitle: {
        marginRight: 10,
    },
    replies: {
        marginRight: 40,
        marginTop: 20
    },
    images: {
        marginRight: 10,
        marginTop: 20
    },
    lastView: {
        marginRight: 0
    },
    viewRoot: {
        flexDirection: 'column',
    },
    titleSubtitle: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
        flexWrap: 'wrap',
        flexShrink: 1,
    },
    comment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5
    },
});

export default function Replies (){
    return(
        <React.Fragment>
            <Surface style={styles.surface}>
                <View style={styles.viewRoot}>
                    <View style={styles.heading}>
                        <View
                            style={styles.replying}
                        >
                            <Text>>>1290441024
                            >>1290441025
                            >>1290441026
                            >>1290441026
                            >>1290441026</Text>
                        </View>
                        <View
                            style={styles.view}
                        >
                            <Text>Anonymous</Text>
                        </View>
                    </View>
                    <View style={styles.comment}>
                        <Subheading>We don't lose wars, chang.
Our loving kikes forfeit them for us.
If you don't believe that, come on over and try to finally knock down the big dog, and we'll show what it looks like when we're not shackled by shekels.</Subheading>
                    </View>
                    <View style={styles.footer}>
                        <View
                            style={styles.replies}
                        >
                            <Text>100 Replies</Text>
                        </View>
                        <IconButton
                            icon="view-headline"
                            size={20}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                </View>
            </Surface>
        </React.Fragment>
    );
}
