/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import CryptionChaiseScreen from '../screens/CryptionChaiseScreen';
import CryptionSelectMenu from '../screens/CryptionSelectMenuScreen';
import CryptionPermutationScreen from '../screens/CryptionPermutationScreen';
import CryptionPolybiusScreen from '../screens/CryptionPolybiusScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import CryptionMagicSquareScreen from '../screens/CryptionMagicSquareScreen';
import CryptionTritemiusScreen from '../screens/CryptionTritemiusScreen';
import CryptionBlockPermutationScreen from '../screens/CryptionBlockPermutationReverseScreen';
import CryptionBlockPermutationReverseScreen from '../screens/CryptionBlockPermutationReverseScreen';
import CryptionGammaScreen from '../screens/CryptionGammaScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen name="CryptionPermutation" component={CryptionPermutationScreen} options={{title: 'Перестановка'}}/>
        <Stack.Screen name="CryptionPolybius" component={CryptionPolybiusScreen} options={{title: 'Шифр Полибия'}}/>
        <Stack.Screen name="CryptionChaise" component={CryptionChaiseScreen} options={{title: 'Шифр Чейза / усложненный'}}/>
        <Stack.Screen name="CryptionMagicSquare" component={CryptionMagicSquareScreen} options={{title: 'Шифр Магического квадрата'}}/>
        <Stack.Screen name="CryptionTritemius" component={CryptionTritemiusScreen} options={{title: 'Шифр Тритемия'}}/>
        <Stack.Screen name="CryptionBlockPermutation" component={CryptionBlockPermutationScreen} options={{title: 'Шифр Блочной перестановки'}}/>
        <Stack.Screen name="CryptionBlockPermutationReverse" component={CryptionBlockPermutationReverseScreen} options={{title: 'Расшифровка блочной перестановки'}}/>
        <Stack.Screen name="CryptionGamma" component={CryptionGammaScreen} options={{title: 'Гаммирование'}}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="CryptionSelectMenu"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="CryptionSelectMenu"
        component={CryptionSelectMenu}
        options={({ navigation }: RootTabScreenProps<'CryptionSelectMenu'>) => ({
          title: 'Меню',
          tabBarIcon: ({ color }) => <TabBarIcon name="navicon" color={color} />,
        })}
      />

      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'В Казахстан',
          tabBarIcon: ({ color }) => <TabBarIcon name="truck" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />

      
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
