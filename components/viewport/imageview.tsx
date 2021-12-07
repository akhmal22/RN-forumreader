import React from 'react';
import {
  Text,
  View,
  ViewPropTypes,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Image
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        position: 'relative',
        flex: 1
    },
    stretch: {
        width: 270,
        height: 270,
        resizeMode: 'stretch',
        margin: 'auto'
    }
})



function FindDimension(layout){
    const {x, y, width, height} = layout;
    return {x, y, width, height}
}

export default function ImageView(props: any) {
    const [ index, setIndex ] = React.useState(0);
    const [ layout, setLayout ] = React.useState({});

    return (
        <View style={styles.container}>
            <Image
                style={styles.stretch}
                source={require('../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')}
            />
        </View>
    );
}
