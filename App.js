import React, { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { Root } from 'native-base';

import FlashMessage from 'react-native-flash-message';

import SplashScreen from './src/screens/Splash';
import { store } from './src/redux/store';
import NavigatorProvider from './src/navigator';
import { setupHttpConfig } from './src/utils/http';
import { KochavaTracker } from 'react-native-kochava-tracker';
import { Platform } from 'react-native';

const persistor = persistStore(store);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAssets();
    if (Platform.OS === 'android') {
      KochavaTracker.instance.registerAndroidAppGuid(
        'kotry-passages-android-csquaredsocial-jme0x0d',
      );
    }
    if (Platform.OS === 'ios') {
      KochavaTracker.instance.registerIosAppGuid('kotry-passages-ios-csquaredsocial-e4tm');
    }
    KochavaTracker.instance.start();
  }, []);

  const loadAssets = () => {
    setTimeout(() => {
      setupHttpConfig(setIsLoading);
    }, 500);
  };

  const renderLoading = () => <SplashScreen />;

  const renderApp = () => (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <Root>
            <NavigatorProvider />
            <FlashMessage />
          </Root>
        </ApplicationProvider>
      </PersistGate>
    </ReduxProvider>
  );

  return isLoading ? renderLoading() : renderApp();
};

export default () => <App />;
