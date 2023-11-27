import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../../constants/COLORS'
import { exerciseLogo } from '../../../constants/SVG/AllExercises'
import SIZE from '../../../constants/SIZE'
import Percentage from './Percentage'
import useHealthKit from '../../../hooks/useHealthkit'
import { ICON } from '../../../constants/SVG/ICON'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'

const CalorieCard = () => {
    const { calorie } = useHealthKit()
    const { currentUser } = useSelector(state => state.user)
    const { navigate } = useNavigation()
    const [prevGoal, setPrevGoal] = useState()

    useEffect(() => {
        currentUser?.calorieTarget && setPrevGoal(currentUser.calorieTarget)
    }, [currentUser])
    return (
        <View style={{ marginHorizontal: '3%', marginBottom: 10, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginBottom: SIZE.NormalMargin, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    {/* icon */}
                    <View style={{ width: 26, height: 26, backgroundColor: COLORS.colorieOrange, alignItems: 'center', justifyContent: 'center', borderRadius: 9 }}>
                        {ICON.fire(16, COLORS.white)}
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.colorieOrange }}>卡路里</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigate("CalorieScreen")
                    }}
                >
                    {ICON.right(24, COLORS.gray)}
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={{ fontSize: SIZE.ExtraLargerTitle, fontWeight: 'bold' }}>{calorie}</Text>
                    <Text style={{ fontWeight: 'bold' }}>kcal </Text>
                </View>
                <Text style={{ color: COLORS.commentText, fontWeight: 'bold' }}>/ {prevGoal ? prevGoal : "--"}kcal</Text>
            </View>
            <Percentage current={calorie} target={prevGoal} />
        </View>
    )
}

export default CalorieCard

const styles = StyleSheet.create({})