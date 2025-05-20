import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Users from '../screens/users';
import UserDetail from '../screens/users/userDetail';
import {Pressable, View, Alert} from 'react-native';
import {AddCircle, Logout} from 'iconsax-react-native';
import AddUser from '../screens/users/addUser';
import Jobs from '../screens/job';
import UpdateUser from '../screens/users/updateUser';
import SignIn from '../screens/auth/signIn';
import SignUp from '../screens/auth/signUp';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const MainRouter: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const signOut = () => {
    auth()
      .signOut()
      .then(() => Alert.alert('Oturum Kapatıldı'));
  };

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Group>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            options={({navigation, route}) => ({
              headerRight: () => (
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Pressable onPress={() => navigation.navigate('AddUser')}>
                    <AddCircle size={32} color="#37d67a" variant="Bold" />
                  </Pressable>
                  <Pressable onPress={signOut}>
                    <Logout
                      style={{right: 8}}
                      size={32}
                      color="red"
                      variant="Bold"
                    />
                  </Pressable>
                </View>
              ),
            })}
            name="Users"
            component={Users}
          />

          <Stack.Screen name="UserDetail" component={UserDetail} />
          <Stack.Screen name="AddUser" component={AddUser} />
          <Stack.Screen name="Jobs" component={Jobs} />
          <Stack.Screen name="UpdateUser" component={UpdateUser} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default MainRouter;
