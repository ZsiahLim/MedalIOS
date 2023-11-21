import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FavoriteBlogs from './Screens/FavoriteBlogs'
import MyBlogs from './Screens/MyBlogs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const MyBlogsOverview = () => {
    return (
        <Tab.Navigator
            initialRouteName="MyBlogs"
            screenOptions={{
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', textTransform: 'none' },
            }}
        >
            <Tab.Screen
                name="MyBlogs"
                component={MyBlogs}
                options={{ tabBarLabel: `全部博客` }}
            />
            <Tab.Screen
                name="FavoriteBlogs"
                component={FavoriteBlogs}
                options={{ tabBarLabel: `收藏博客` }}
            />
        </Tab.Navigator>
    )
}

export default MyBlogsOverview

const styles = StyleSheet.create({})