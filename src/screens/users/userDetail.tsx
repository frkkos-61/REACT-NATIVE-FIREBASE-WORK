import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Avatar from '../../components/global/avatar';
import {converFullName} from '../../utils/functions';

interface User {
  age?: number;
  city?: string;
  email?: string;
  language?: string;
  name?: string;
  phone?: string;
  surname?: string;
  job?: string;
}

const UserDetail: React.FC<{route: any}> = ({route}) => {
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  const userId = route.params.userId;

  const getUser = async () => {
    try {
      setPending(true);
      const userDoc = await firestore().collection('Users').doc(userId).get();
      setUser(userDoc.data() as User);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {pending ? (
        <View style={styles.Actıv}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Avatar name={user?.name} surname={user?.surname} size={100} />
            <Text style={{fontSize: 20, color: 'black', marginTop: 10}}>
              {user?.email}
            </Text>
          </View>
          <View style={{flex: 2, paddingHorizontal: 10}}>
            <Text style={{fontSize: 14, color: 'gray'}}>Name</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{user?.name}</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>Surname</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{user?.surname}</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>Age</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{user?.age}</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>Language</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{user?.language}</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>Phone</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{user?.phone}</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>Email</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{user?.email}</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>City</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{user?.city}</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>Job</Text>
            <Text style={{fontSize: 20, color: 'black'}}>
              {converFullName(user?.job?.sub, user?.job?.title)}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Actıv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
