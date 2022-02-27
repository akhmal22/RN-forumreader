import * as React from 'react';
import { Surface, Text, Headline, Subheading, Avatar, IconButton } from 'react-native-paper';
import { StyleSheet, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" size={40} />

const styles = StyleSheet.create({
    surface: {
        padding: 8,
        minWidth: 80,
        minHeight: 80,
        elevation: 4,
        marginTop: 20,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5
    },
    forumName: {
        marginRight: 40
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
    titleThumbnail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default function ThreadStarter (){
    return(
        <React.Fragment>
            <Surface style={styles.surface}>
                <View style={styles.viewRoot}>
                    <View style={styles.container}>
                        <View
                            style={styles.view}
                        >
                            <Text>Anonymous</Text>
                        </View>
                        <View
                            style={styles.lastView}
                        >
                            <Text>12m</Text>
                        </View>
                    </View>
                    <View style={styles.titleThumbnail}>
                        <View style={styles.titleSubtitle}>
                            <View
                                style={styles.title}
                            >
                                <Headline>Title can wrapped down</Headline>
                            </View>
                            <View
                                style={styles.subtitle}
                            >
                                <Subheading>Subtitle also can wrapped down down down</Subheading>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.view}
                        >
                            <LeftContent/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View
                            style={styles.replies}
                        >
                            <Text>100 Replies</Text>
                        </View>
                        <View
                            style={styles.images}
                        >
                            <Text>85 Images</Text>
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
