import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainRouter from './src/router/mainRouter';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <MainRouter />
    </NavigationContainer>
  );
};

export default App;
