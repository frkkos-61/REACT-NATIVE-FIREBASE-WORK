import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

interface Props {}

const UpdateUser: React.FC<Props> = ({route}) => {
  const navigation = useNavigation();
  const userInfo = route.params?.userInfo;

  const [name, setName] = useState(userInfo.name);
  const [surname, setSurName] = useState(userInfo.surname);
  const [email, setEmail] = useState(userInfo.email);
  const [age, setAge] = useState(userInfo.age);
  const [city, setCity] = useState(userInfo.city);
  const [phone, setPhone] = useState(userInfo.phone);
  const [language, setLanguage] = useState(userInfo.language);

  const updateUser = async () => {
    await firestore().collection('Users').doc(userInfo.id).update({
      name: name,
      surname: surname,
      email: email,
      city: city,
      phone: phone,
      language: language,
      age: age,
      job: userInfo.job,
    });
    Alert.alert('İşlem Başarılı', 'Kullanıcı başarılı bir şekilde güncellendi', [
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
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kullanıcı Ekle</Text>
      <TextInput
        style={styles.input}
        placeholder="Ad"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Soyad"
        value={surname}
        onChangeText={setSurName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-Posta"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Yaş"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Sehir"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Tel.Num."
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Tel.Num."
        value={language}
        onChangeText={setLanguage}
      />
      <Button title="Güncelle" onPress={updateUser} />
    </View>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#d9e3f0',
  },
});
