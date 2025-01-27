import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { shallowEqual, useSelector } from 'react-redux';
import { Avatar } from '@rneui/base';
import COLORS from '../../constants/COLORS';
import MyExercisesCard from './components/MyExercisesCard';
import MyBlogsCard from './components/MyBlogsCard';
import OverallExerciseCard from './components/OverallExerciseCard'
import BodyMetric from './components/BodyMetric'
import { useNavigation } from '@react-navigation/native';
import useUserTheme from '../../hooks/useUserTheme';
import APPTHEME from '../../constants/COLORS/APPTHEME';
import { ICON } from '../../constants/SVG/ICON';
import useCheckUserStatus from '../../hooks/useCheckUserStatus';
import SIZE from '../../constants/SIZE';
import { useIntl } from 'react-intl';

const Profile = () => {
    const { formatMessage } = useIntl()
    const { currentUser } = useSelector(state => state.user, shallowEqual)
    const { navigate } = useNavigation()
    const { _id, name, avator, } = currentUser
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { isMuted, muteDate } = useCheckUserStatus()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <View style={{ marginHorizontal: '3%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => navigate('PersonalDetails')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar source={{ uri: avator }} rounded size={52} />
                    <View style={{ marginLeft: 6 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary }}>{name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 10, marginTop: 4, color: COLORS.commentText }}>ID:</Text>
                            <Text style={{ fontSize: 10, marginTop: 4, color: COLORS.commentText }}>{_id}</Text>
                        </View>
                        {isMuted && <Text style={{ marginTop: SIZE.LittleMargin, color: currentTheme.fontColor, }}>{formatMessage({ id: 'app.profile.accStatus' })}{muteDate}</Text>}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Setting')}>
                    {ICON.setting(24, currentTheme.fontColor)}
                </TouchableOpacity>
            </View>
            <MyExercisesCard />
            <MyBlogsCard />
            <View style={{ flexDirection: 'row', marginHorizontal: '3%' }}>
                <OverallExerciseCard />
                <View style={{ width: 10 }} />
                <BodyMetric />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: COLORS.commentText, fontSize: 12, marginTop: 10 }}>{formatMessage({ id: 'app.profile.noMore' })}</Text>
            </View>
        </SafeAreaView >
    )
}

export default Profile

const styles = StyleSheet.create({})