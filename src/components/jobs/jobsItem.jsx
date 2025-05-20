import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const JobsItem: React.FC = ({item, form}) => {
  const navigation = useNavigation();

  console.log('FORM', form, 'Item', item);

  const addUser = async job => {
    try {
      await firestore().collection('Users').add({
        name: form.name,
        surname: form.surname,
        email: form.email,
        city: form.city,
        phone: form.phone,
        language: form.language,
        age: form.age,
        job: item,
      });
      Alert.alert('İşlem Başarılı', 'Kullanıcı başarılı bir şekilde eklendi', [
        {
          text: 'Cancel',
          onPress: () => console.warn('Cancel basıldı'),
          style: 'cancel',
        },
        {
          text: 'Tamam',
          onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Users'}],
              }),
            );
          },
        },
      ]);
    } catch (error) {
      console.error('Firestore hatası:', error);
      Alert.alert(
        'Hata',
        'Kullanıcı eklenirken bir hata oluştu: ' + error.message,
      );
    }
  };

  return (
    <Pressable onPress={() => addUser(item)} style={styles.container}>
      <View style={styles.text}>
        <Text style={{fontSize: 30}}>{item.title}</Text>
        <Text style={{fontSize: 16, color: 'gray'}}>{item.sub}</Text>
      </View>
    </Pressable>
  );
};

export default JobsItem;

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
