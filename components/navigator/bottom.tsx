import * as React from 'react';
import { BottomNavigation, Text, Button } from 'react-native-paper';
import Bottom from './bottom';
import MusicViewport from '../viewport/music';
import AlbumViewport from '../viewport/album';
import RecentViewport from '../viewport/recent';

const MainControl = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'music', title: 'Music', icon: 'music' },
        { key: 'albums', title: 'Albums', icon: 'album' },
        { key: 'recents', title: 'Recents', icon: 'history' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        music: MusicViewport,
        albums: AlbumViewport,
        recents: RecentViewport,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default MainControl;
