import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList } from 'react-native';
import totp from 'totp-generator';
import ApplicationListItem from '../components/application-list-item';
import Text from '../components/styled-text';
import { getAll } from '../token-storage';
import PropTypes from 'prop-types';

export default function ApplicationList(props) {
  const INTERVAL = 1000;
  const [data, setData] = useState(null);
  const mounted = useRef(false);

  const update = setTimeout(() => {
    if (mounted.current && data) {
      const updatedData = data.map((app) => {
        const token = totp(app.secret);
        const appData = { ...app };
        appData.totp = token;
        return appData;
      });
      setData(updatedData);
    }
  }, INTERVAL);

  // Loads data from storage and updates application list
  useEffect(() => {
    const fetchApps = async () => {
      const apps = await getAll();
      const loadedApps = apps.map((app) => {
        const token = totp(app.secret);
        const appData = { ...app };
        appData.totp = token;
        return appData;
      });
      setData(loadedApps);
    };

    fetchApps();
    mounted.current = true;
    return () => { 
      mounted.current = false; 
      console.log(update)
      clearTimeout(update)
    };
  }, []);

  // Attempt at a function to set the data to the current one (Errors out or messes with menu)
  // const fixData = (data) => {
  //   setData(data);
  // };

  // If data is being fetched from storage
  if (!data) {
    return (
      <View style={{ flex: 1, margin: 30 }}>
        <Text style={{ textAlign: 'center' }}>Loading applications...</Text>
      </View>
    );
  }

  // If there are no applications
  if (!data.length) {
    return (
      <View style={{ flex: 1, margin: 30 }}>
        <Text style={{ textAlign: 'center' }}>No applications found.</Text>
      </View>
    );
  }

  const {navigation} = props

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ApplicationListItem item={item} navigation={navigation} interval={30} />}
        keyExtractor={(_, i) => i.toString()}
      />
    </View>
  );
}

ApplicationList.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};
