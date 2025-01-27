import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import { deletesession } from '../../../api/session.api'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../../redux/userSlice'
import { setSessions } from '../../../redux/SessionSlice'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_MESSAGE } from '../../../constants/ERRORMessage'

const DoneTodoItem = ({ tutorial }) => {
    const dispatch = useDispatch()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { navigate } = useNavigation()
    const handleDelete = async () => {
        await deletesession(tutorial.sessionID).then(res => {
            if (res.status !== false) {
                const { user, updatedSessions } = res
                dispatch(loginSuccess(user))
                dispatch(setSessions(updatedSessions))
            } else {
                Toast.show(ERROR_MESSAGE)
            }
        })
    }
    return (
        <TouchableOpacity
            onPress={() => navigate("AfterExercise", { tutorial, data: tutorial.session })}
            style={{ padding: 10, flexDirection: 'row', marginBottom: SIZE.NormalMargin, gap: 10, borderRadius: SIZE.CardBorderRadius, backgroundColor: currentTheme.contentColor }}
        >
            <View style={{ height: '100%', width: 6, borderRadius: 3, backgroundColor: COLORS.primary }}></View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1, gap: SIZE.LittleMargin, }}>
                    <Text numberOfLines={1} style={{ fontSize: SIZE.NormalTitle, color: currentTheme.fontColor }}>{tutorial.name}</Text>
                    {tutorial?.brief && <Text numberOfLines={1} style={{ fontSize: 12, color: COLORS.commentText }}>{tutorial?.brief} </Text>}
                </View>
                <View style={{ flexDirection: 'row', gap: SIZE.NormalMargin, alignItems: 'center' }}>
                    {ICON.doneCircle(22, COLORS.green)}
                    <TouchableOpacity onPress={handleDelete}>
                        {ICON.delete(22, COLORS.gray)}
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DoneTodoItem

const styles = StyleSheet.create({})