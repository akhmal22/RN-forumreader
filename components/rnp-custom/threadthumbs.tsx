import * as React from 'react';
import { Surface, Text, Headline, Subheading, Avatar, IconButton } from 'react-native-paper';
import { StyleSheet, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" size={40} />
import HTMLView from 'react-native-htmlview';

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

export default function ThreadThumbs(props: any){
    const [ timeDiff, setTimeDiff ] = React.useState<string>(null);

    React.useEffect(() => {
        const diff = Math.floor(Date.now() / 1000) - Math.floor(props.time);

        if(diff<3600){
            setTimeDiff("<1h");
        }else if(diff>=3600 && diff<86400){
            setTimeDiff(Math.floor(24-((86400-diff)/3600)) + "h");
        }else{
            setTimeDiff(">1d");
        }
    }, []);

    const htmlContent = `<div>${props.com}</div>`;

    return(
        <React.Fragment>
            <Surface style={styles.surface}>
                <View style={styles.viewRoot}>
                    <View style={styles.container}>
                        <View
                            style={styles.forumName}
                        >
                            <Text>{props.no}</Text>
                        </View>
                        <View
                            style={styles.view}
                        >
                            <Text>{props.name}</Text>
                        </View>
                        <View
                            style={styles.lastView}
                        >
                            <Text>{timeDiff}</Text>
                        </View>
                    </View>
                    <View style={styles.titleThumbnail}>
                        <View style={styles.titleSubtitle}>
                            <TouchableOpacity
                                style={styles.title}
                                onPress={() => {props.navigator.navigate('Thread')}}
                            >
                                <Headline>{props.sub ? props.sub : 'no subject'}</Headline>
                            </TouchableOpacity>
                            <View
                                style={styles.subtitle}
                            >
                                <HTMLView
                                    value={htmlContent}
                                    stylesheet={styles.subtitle}
                                />
                            </View>
                        </View>
                        <View
                            style={styles.view}
                        >
                            <LeftContent/>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View
                            style={styles.replies}
                        >
                            <Text>{props.replies} replies</Text>
                        </View>
                        <View
                            style={styles.images}
                        >
                            <Text>{props.images} images</Text>
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
