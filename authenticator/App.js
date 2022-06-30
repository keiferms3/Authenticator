import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text } from 'react-native';
import ApplicationList from './views/application-list';
import Settings from './views/settings';
import New from './views/new';
import Confirm from './views/confirm';
import License from './views/license';
import UserGuide from './views/user-guide';
import {
  SettingsButton, NewButton, HomeButton, BackButton,
} from './components/navigation-buttons';
import ColorPickerSetting from './views/color-picker-setting';
import SettingsProvider, { useSettings } from './settings-provider';
// import Text from './components/styled-text';
import DropdownSetting from './views/dropdown-setting';
import Toast from 'react-native-toast-message';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <SettingsProvider>
        <AppBody />
      </SettingsProvider>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="auto" />
      <Toast />
    </View>
  );
}

function AppBody() {
  const [settings] = useSettings();
  const contentStyle = { backgroundColor: settings.primaryColor };
  const headerStyle = { backgroundColor: settings.accentColor };
  const headerTintColor = settings.fontColor;

  const titles = {
    'application-list': <Text>Application List</Text>,
    settings: <Text>Settings</Text>,
    new: <Text>New</Text>,
    confirm: <Text>Confirm</Text>,
    license: <Text>License</Text>,
    guide: <Text>User Guide</Text>,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="application-list"
        screenOptions={{
          headerTitleAlign: 'center',
          contentStyle,
          headerStyle,
          headerTintColor,
        }}
      >
        <Stack.Screen
          name="application-list"
          component={ApplicationList}
          options={(props) => ({
            headerTitle: () => titles['application-list'],
            headerLeft: () => NewButton(props),
            headerRight: () => SettingsButton(props),
          })}
        />
        <Stack.Screen
          name="settings"
          component={Settings}
          options={(props) => ({
            headerTitle: () => titles.settings,
            headerLeft: () => HomeButton(props),
          })}
        />
        <Stack.Screen
          name="color-picker-setting"
          component={ColorPickerSetting}
          options={(props) => ({
            headerTitle: () => titles.settings,
            headerLeft: () => BackButton(props),
          })}
        />
        <Stack.Screen
          name="dropdown-setting"
          component={DropdownSetting}
          options={(props) => ({
            headerTitle: () => titles.settings,
            headerLeft: () => BackButton(props),
          })}
        />
        <Stack.Screen
          name="new"
          component={New}
          options={(props) => ({
            headerTitle: () => titles.new,
            headerLeft: () => HomeButton(props),
          })}
        />
        <Stack.Screen
          name="confirm"
          component={Confirm}
          options={(props) => ({
            headerTitle: () => titles.confirm,
            headerLeft: () => HomeButton(props),
          })}
        />
        <Stack.Screen
          name="license"
          component={License}
          options={(props) => ({
            headerTitle: () => titles.license,
            headerLeft: () => BackButton(props),
          })}
        />
        <Stack.Screen
          name="guide"
          component={UserGuide}
          options={(props) => ({
            headerTitle: () => titles.guide,
            headerLeft: () => BackButton(props),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
