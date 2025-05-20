import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

interface Props {}

const AddUser: React.FC<Props> = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState('');

  const handleNextStep = () => {
    const form = {
      name,
      surname,
      email,
      age,
      city,
      phone,
      language,
    };
    navigation.navigate('Jobs', {form: form});
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
      <Button title="Devam Et" onPress={handleNextStep} />
    </View>
  );
};

export default AddUser;

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
