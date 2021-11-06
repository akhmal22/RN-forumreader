import * as React from 'react';
import { BottomNavigation, Text, Button } from 'react-native-paper';
import Bottom from './bottom';
import HomeViewport from '../viewport/home';
import SubscribedViewport from '../viewport/subscribed';
import RecentViewport from '../viewport/recent';

const MainControl = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', icon: 'home' },
        { key: 'subscription', title: 'Subscribed', icon: 'folder-multiple' },
        { key: 'recents', title: 'Recents', icon: 'history' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeViewport,
        subscription: SubscribedViewport,
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
