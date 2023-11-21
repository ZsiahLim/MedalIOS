import React from 'react'
import { Alert, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import SIZE from '../constants/SIZE';
import { ICON } from '../constants/SVG/ICON';
import { createsession } from '../api/session.api';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';
import { setSessions } from '../redux/SessionSlice';
import useIsTutorialHasAlr from '../hooks/useIsTutorialHasAlr';
const TutorialHorizontal = ({ tutorial, withCalender }) => {
    const { userSelectDay } = useSelector(state => state.calendar)
    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const { cover, level, lowerEstimateColorie, higherEstimateColorie, name, duration, _id } = tutorial
    const isTodayHasAlr = useIsTutorialHasAlr(_id)

    const handleAddToCalendar = async () => {
        if (isTodayHasAlr) {
            Alert.alert("今日已有这个训练了")
        } else {
            const newSession = {
                date: new Date(userSelectDay),
                tutorial: _id,
            }
            await createsession(newSession).then(res => {
                if (res.status === false) {
                    Alert.alert("出现异常, 请稍后再试")
                } else {
                    dispatch(loginSuccess(res.user))
                    dispatch(setSessions(res.updatedSessions))
                }
            })
        }
    }
    return (
        <TouchableOpacity
            onPress={() => navigate('SpecificTutorial', { tutorial })}
            style={{
                borderRadius: SIZE.CardBorderRadius,
                backgroundColor: '#fff',
                overflow: 'hidden',
                marginBottom: SIZE.NormalMargin,
                alignItems: 'center',
                gap: 10,
                padding: 10,
                flexDirection: 'row'
            }}
        >
            <>
                <ImageBackground
                    source={{ uri: cover }}
                    style={{
                        borderRadius: SIZE.CardBorderRadius, overflow: 'hidden',
                        height: 50,
                        width: 50,
                    }}>
                </ImageBackground>
                <View
                    style={{
                        backgroundColor: 'white',
                        flex: 1,
                        padding: 4,
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10 }}>
                        {name}
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 6 }}>
                        <Text style={{ color: COLORS.commentText }}>{level}</Text>
                        <Text style={{ color: COLORS.commentText }}>{duration} min</Text>
                        <Text style={{ color: COLORS.commentText }}>{lowerEstimateColorie}-{higherEstimateColorie} 千卡</Text>
                    </View>
                </View>
            </>
            {withCalender && <TouchableOpacity
                onPress={handleAddToCalendar}
            >
                {ICON.addToCalender(22, COLORS.black)}
            </TouchableOpacity>}
        </TouchableOpacity >
    )
}

export default TutorialHorizontal