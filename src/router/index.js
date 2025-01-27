import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../pages/Login'
import { useSelector } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { localeConfig } from '../locale'
import PromotionPage from '../pages/PromotionPage'
import BottomNavigationBar from './BottomNavigationBar'
import SpecificTutorial from '../pages/SpecificTutorial'
import Notifications from '../pages/Notifications'
import TutorialLibrary from '../pages/TutorialLibrary'
import Competitions from '../pages/Competitions'
import SpecificBlog from '../pages/SpecificBlog'
import SpecificConversationPage from '../pages/Communication/pages/SpecificConversationPage'
import Walk from '../pages/ExercisesPages/Walk'
import PersonalDetail from '../pages/Profile/Screens/PersonalDetail'
import Setting from '../pages/Profile/Screens/Setting'
import Statistics from '../pages/Statistics'
import MyBlogsOverview from '../pages/MyBlogsOverview'
import ExerciseOverview from '../pages/MyExercisesOverview'
import Report from '../pages/Report'
import HeightWeight from '../pages/Statistics/screens/HeightWeight'
import TodaysExercises from '../pages/Statistics/screens/TodaysExercises'
import AfterExcercise from '../pages/ExercisesPages/AfterExcercise'
import Evaluation from '../pages/Calender/pages/Evaluation'
import TutorialVideo from '../pages/SpecificTutorial/screens/TutorialVideo'
import DurationScreen from '../pages/Statistics/screens/DurationScreen'
import CalorieScreen from '../pages/Statistics/screens/CalorieScreen'
import DistanceScreen from '../pages/Statistics/screens/DistanceScreen'
import StepScreen from '../pages/Statistics/screens/StepScreen'
import UserPage from '../pages/Profile/Screens/UserPage'
import useUserTheme from '../hooks/useUserTheme'
import APPTHEME from '../constants/COLORS/APPTHEME'
import Run from '../pages/ExercisesPages/Run'
import useCheckUserStatus from '../hooks/useCheckUserStatus'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

const Stack = createNativeStackNavigator();

export default function MyRouter() {
    const { userLocale, currentUser } = useSelector((state) => state.user)
    const Language = userLocale ? userLocale.substring(0, 2) : 'en'
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { isBlocked } = useCheckUserStatus()
    if (isBlocked) {
        Toast.show({ type: 'error', text1: '封禁提示', text2: '您因违反社区规定, 账号已被封禁已经无法使用App' })
    }
    if (!currentUser || isBlocked) {
        return (<IntlProvider locale={Language} messages={localeConfig[Language]}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Promotion'>
                    <Stack.Screen name="Promotion" component={PromotionPage} options={{ title: 'Overdview', headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ title: 'Overdview', headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </IntlProvider>)
    } else {
        return (
            <IntlProvider locale={Language} messages={localeConfig[Language]}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='Home'>
                        <Stack.Screen name="Home" component={BottomNavigationBar} options={{ title: 'Home', headerShown: false }} />
                        <Stack.Screen name="SpecificTutorial" component={SpecificTutorial} options={{ title: 'Tutorial', headerShown: false }} />
                        <Stack.Screen name="Notifications" component={Notifications} options={{
                            title: 'Notifications', headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor },
                        }} />
                        <Stack.Screen name="AllTutorials" component={TutorialLibrary} options={{ title: 'Tutorials Library', headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="TutorialVideo" component={TutorialVideo} options={{ headerShown: false }} />
                        <Stack.Screen name="AllCompetitions" component={Competitions} options={{ title: 'Competitions', headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="Statistics" component={Statistics} options={{ title: '个人数据中心', headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="PersonalDetails" component={PersonalDetail} options={{ title: '个人信息', headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="Setting" component={Setting} options={{ title: '设置', headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="SpecificConversationPage" component={SpecificConversationPage} options={{ headerShown: false }} />
                        <Stack.Screen name="Walk" component={Walk} options={{ headerShown: false }} />
                        <Stack.Screen name="Run" component={Run} options={{ headerShown: false }} />
                        <Stack.Screen name="MyBlogsOverview" component={MyBlogsOverview} options={{ headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="Report" component={Report} options={{ headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="ExercisesOverview" component={ExerciseOverview} options={{ headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="SpecificBlog" component={SpecificBlog} options={{ headerShown: false }} />
                        <Stack.Screen name="AfterExercise" component={AfterExcercise} options={{ title: '恭喜完成运动🎉', headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="DurationSreen" component={DurationScreen} options={{ title: '运动时长', headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="CalorieScreen" component={CalorieScreen} options={{ title: '卡路里消耗', headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="DistanceScreen" component={DistanceScreen} options={{ title: '步行跑步距离', headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="StepScreen" component={StepScreen} options={{ title: '步数', headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="Evaluation" component={Evaluation} options={{ headerShown: false }} />
                        <Stack.Screen name="HeightWeight" component={HeightWeight} options={{ title: '身高体重', headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="TodaysExercises" component={TodaysExercises} options={{ title: '总运动', headerShown: true, headerStyle: { backgroundColor: currentTheme.contentColor, }, headerTitleStyle: { color: currentTheme.fontColor }, }} />
                        <Stack.Screen name="UserPage" component={UserPage} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </IntlProvider >
        )
    }
}