import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import UserItem from '../../components/users/userItem';
import JobsItem from '../../components/jobs/jobsItem';
import {useNavigation} from '@react-navigation/native';

const Jobs: React.FC = ({route}) => {
  const [jobs, setJobs] = useState([]);
  const [pending, setPending] = useState<boolean>(false);

  const navigation = useNavigation();

  const form = route.params?.form;
  console.warn("Route Params !",route.params)

  const getJobs = async () => {
    setPending(true);
    const jobs = await firestore().collection('jobs').get();
    const data = jobs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setJobs(data);
    setPending(false);
  };

  useEffect(() => {
    getJobs();
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
            ListEmptyComponent={
              <Text style={{fontSize: 20}}>Henüz Kişi Bilgisi Eklenmedi !</Text>
            }
            data={jobs}
            renderItem={({item}) => <JobsItem item={item} form={form} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
  },
});
