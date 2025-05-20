import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {converFullName} from '../../utils/functions';
import Avatar from '../global/avatar';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Edit, Edit2, Trash} from 'iconsax-react-native';
import firestore from '@react-native-firebase/firestore';

const UserItem: React.FC = ({item, handleGetUser}) => {
  const navigation = useNavigation();

  const deleteUser = async () => {
    await firestore()
      .collection('Users')
      .doc(item.id)
      .delete()
      .then(() => {
        Alert.alert(
          'İşlem Başarılı',
          'Kullanıcı başarılı bir şekilde güncellendi',
          [
            {
              text: 'Cancel',
              onPress: () => console.warn('Cancel basıldı'),
              style: 'cancel',
            },
            {
              text: 'Tamam',
              onPress: () => {
                handleGetUser();
              },
            },
          ],
        );
      });
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('UserDetail', {userId: item.id})}
      style={styles.container}>
      <View>
        <Avatar name={item.name} surname={item.surname} />
      </View>
      <View style={styles.text}>
        <Text style={{fontSize: 30}}>
          {converFullName(item.name, item.surname)}
        </Text>
        <Text style={{fontSize: 16, color: 'gray'}}>{item.email}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          minWidth: 65,
          justifyContent: 'space-around',
        }}>
        <Pressable
          onPress={() => navigation.navigate('UpdateUser', {userInfo: item})}>
          <Edit2 size={20} color="#2ccce4" variant="Bold" />
        </Pressable>

        <Pressable onPress={deleteUser}>
          <Trash size={20} color="#f47373" variant="Bold" />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    paddingHorizontal: 17,
    borderBottomWidth: 0.3,
    flex: 1,
    borderColor: 'gray',
    paddingBottom: 10,
  },
});
