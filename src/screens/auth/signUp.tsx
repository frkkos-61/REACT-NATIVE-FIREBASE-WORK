import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {LoginCurve, UserAdd} from 'iconsax-react-native';
import auth from '@react-native-firebase/auth';

interface Props {}

const SignUp: React.FC<Props> = () => {
  const navigation = useNavigation();
  const [pending, setPending] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [email, setEmail] = useState('frk11@gmail.com');
  const [password, setPassword] = useState('frk54321');

  const handleUserUp = () => {
    setPending(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.warn('Signed in!');
        Alert.alert('Başarılı', 'Kullanıcı başarıyla oluşturuldu!');
      })
      .catch(error => {
        console.warn('Hata', error);
        if (error.code === 'auth/email-already-in-use') {
          console.warn('That email address is already in use!');

          Alert.alert('Hata', 'Bu e-posta adresi zaten kullanılıyor!');
        } else if (error.code === 'auth/invalid-email') {
          console.warn('That email address is invalid!');

          Alert.alert('Hata', 'Geçersiz e-posta adresi!');
        } else {
          console.error(error);

          Alert.alert('Hata', 'Bir hata oluştu: ' + error.message);
        }
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <UserAdd size={100} color="#37d67a" />
      </View>
      <Text style={{marginVertical: 8, fontSize: 14}}>E-Mail</Text>
      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={{marginVertical: 8, fontSize: 14}}>Şifre</Text>

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Kayıt Ol" onPress={handleUserUp} />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
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
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#d9e3f0',
    fontSize: 16,
  },
});
