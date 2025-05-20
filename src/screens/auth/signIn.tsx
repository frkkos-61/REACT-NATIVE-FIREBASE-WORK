import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {LoginCurve} from 'iconsax-react-native';
import auth from '@react-native-firebase/auth';

interface Props {}

const SignIn: React.FC<Props> = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [pending, setPending] = useState(false);

  const [email, setEmail] = useState('ofk@gmail.com');
  const [password, setPassword] = useState('ofk5461');

  const handleLogin = () => {
    setPending(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(error => {
        console.warn('Hata', error);
        if (error.code === 'auth/email-already-in-use') {
          console.warn('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.warn('That email address is invalid!');
        }
        console.error(error);
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
        <LoginCurve size={100} color="#37d67a" variant="Bold" />
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

      <Button disabled={pending} title="Giriş Yap" onPress={handleLogin} />
      <Text style={{textAlign: 'center', margin: 20, fontSize: 18}}>
        Henüz bir hesabınız yok mu ?
      </Text>
      <Button title="Kayıt Ol" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

export default SignIn;

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
