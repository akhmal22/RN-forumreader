import * as React from 'react';
import Bottom from './components/navigator/bottom';
import { SafeAreaView, ScrollView } from 'react-native';
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
    ...DarkTheme,
    roundness: 2,
    dark: true
};

const App = () => {
    return (
        <Bottom/>
    );
};

export default App;
