import { Modal, StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react'
import SIZE from '../../../constants/SIZE'
import { ICON } from '../../../constants/SVG/ICON'
import COLORS from '../../../constants/COLORS'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LANGUAGE from '../../../constants/LANGUAGE'
import { updateuserinfo } from '../../../api/user.api'
import { loginSuccess } from '../../../redux/userSlice'

const LanguageModal = ({ visible, setVisible }) => {
    const [language, setLanguage] = useState()
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const { preferedLanguage } = currentUser
    useEffect(() => {
        setLanguage(preferedLanguage)
    }, [preferedLanguage])
    const handleUpdate = async () => {
        let handledItems = { preferedLanguage: language }
        await updateuserinfo(currentUser._id, handledItems)
            .then((res) => {
                if (res.status !== false) {
                    dispatch(loginSuccess(res))
                    setVisible(false)
                } else {
                    Alert.alert("出现异常请稍后重试")
                }
            })
            .catch(error => {
                Alert.alert("出现异常请稍后重试")
            })
    }
    return (
        <Modal
            visible={visible}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ marginHorizontal: '3%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SIZE.NormalMargin, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SIZE.NormalMargin }}>
                            <TouchableOpacity
                                onPress={() => { setVisible(false) }}
                            >
                                {ICON.left(28, COLORS.primary)}
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', color: COLORS.primary }}>
                                    语言
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    preferedLanguage !== language && handleUpdate()
                                }}
                                style={{ backgroundColor: preferedLanguage !== language ? COLORS.primary : COLORS.backgroundGray, borderRadius: SIZE.CardBorderRadius, padding: SIZE.NormalMargin }}
                            >
                                <Text style={{ fontSize: SIZE.NormalTitle, color: preferedLanguage !== language ? COLORS.white : COLORS.gray, fontWeight: 'bold', }}>更改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: SIZE.LargerMargin }}>
                        <View style={{ flexDirection: 'row', marginBottom: SIZE.NormalMargin }}>
                            <TouchableOpacity
                                onPress={() => setLanguage(LANGUAGE.zh)}
                                style={{ width: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: language === LANGUAGE.zh ? COLORS.primary : COLORS.backgroundGray, padding: SIZE.NormalMargin, borderTopLeftRadius: SIZE.CardBorderRadius, borderBottomLeftRadius: SIZE.CardBorderRadius, }}
                            >
                                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: language === LANGUAGE.zh ? COLORS.white : COLORS.gray }}>
                                    中文
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setLanguage(LANGUAGE.en)}
                                style={{ width: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: language === LANGUAGE.en ? COLORS.primary : COLORS.backgroundGray, padding: SIZE.NormalMargin, borderTopRightRadius: SIZE.CardBorderRadius, borderBottomRightRadius: SIZE.CardBorderRadius, }}>
                                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: language === LANGUAGE.en ? COLORS.white : COLORS.gray }}>
                                    English
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal >
    )
}

export default LanguageModal

const styles = StyleSheet.create({})