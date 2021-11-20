import React from 'react';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Home, Portfolio, Market, Profile } from '../screens';
import { TabIcon } from '../components';
import { COLORS, icons } from '../constants';
import { TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setTradeModalVisibility } from '../store/tab/slice';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const dispatch = useAppDispatch();
  const { isTradeModalVisible } = useAppSelector(state => state.tabs);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 140,
          backgroundColor: COLORS.primary,
          borderTopColor: 'transparent',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            !isTradeModalVisible && (
              <TabIcon focused={focused} icon={icons.home} label={'Home'} />
            ),
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            !isTradeModalVisible && (
              <TabIcon
                focused={focused}
                icon={icons.briefcase}
                label={'Portfolio'}
              />
            ),
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={isTradeModalVisible ? icons.close : icons.trade}
              iconStyle={
                isTradeModalVisible
                  ? {
                      width: 10,
                      height: 10,
                    }
                  : undefined
              }
              label={'Trade'}
              isTrade
            />
          ),
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <TabBarCustomButton
              {...props}
              onPress={() =>
                dispatch(
                  setTradeModalVisibility({ isVisible: !isTradeModalVisible }),
                )
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            !isTradeModalVisible && (
              <TabIcon focused={focused} icon={icons.market} label={'Market'} />
            ),
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            !isTradeModalVisible && (
              <TabIcon
                focused={focused}
                icon={icons.profile}
                label={'Profile'}
              />
            ),
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const TabBarCustomButton = (props: BottomTabBarButtonProps) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  );
};
