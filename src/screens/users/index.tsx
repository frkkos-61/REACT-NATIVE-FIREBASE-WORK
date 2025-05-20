import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import UserItem from '../../components/users/userItem';

const Users: React.FC = () => {
  const [user, setUsers] = useState([]);
  const [pending, setPending] = useState<boolean>(false);

  const getUsers = async () => {
    setPending(true);
    const users = await firestore().collection('Users').get();
    const data = users.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(data);
    setPending(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        {pending ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <FlatList
            ListEmptyComponent={<Text style={{fontSize:20}}>Henüz Kişi Bilgisi Eklenmedi !</Text>}
            data={user}
            renderItem={({item}) => <UserItem item={item} handleGetUser={()=>getUsers()} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
  },
});
