import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import ProgressLine from '../../../components/ProgressLine';
import { ICON } from '../../../constants/SVG/ICON';
import COLORS from '../../../constants/COLORS';
import EvaluationQuestions from '../../../constants/EvaluationQuestions/index'
import { useNavigation } from '@react-navigation/native';
import SIZE from '../../../constants/SIZE';
import { useDispatch, useSelector } from 'react-redux';
import EvaluationQuestion from '../components/EvaluationQuestion';
import { updatePrefer } from '../../../api/user.api';
import { loginSuccess } from '../../../redux/userSlice';
const { width } = Dimensions.get('screen')
const Evaluation = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const { navigate, goBack } = useNavigation()
    const [questionNo, setQuestionNo] = useState(1)
    const [EvaluationAnswer, setEvaluationAnswer] = useState({})
    const [isLastQuestion, setIsLastQuestion] = useState(false)
    const handleNextQuestion = () => {
        const prevNo = questionNo;
        console.log(questionNo);
        if (prevNo === EvaluationQuestions.length - 1) {
            setQuestionNo(prevNo + 1)
            setIsLastQuestion(true);
        } else {
            setQuestionNo(prevNo + 1)
        }
    }
    const handleSubmitEvaluation = async () => {
        const isEmpty = Object.keys(EvaluationAnswer).length === 0;
        if (!isEmpty) {
            await updatePrefer({ evaluationAnswer: EvaluationAnswer }).then((user) => {
                if (user.status !== false) {
                    dispatch(loginSuccess(user))
                    goBack()
                    Alert.alert('已经提交评估，将为您生成个性化推荐')
                } else {
                    Alert.alert('出现异常, 请稍后再试')
                }
            }).catch(() => {
                Alert.alert('出现异常, 请稍后再试')
            })
        } else {
            Alert.alert('您未作出选择, 无法为您更新')
            goBack()
        }
    }

    return (
        <LinearGradient
            colors={['#f8edf2', "#f2f0f5", '#ebf3f9']} // 这里的颜色请根据您的需要进行调整
            style={styles.container}>
            {/* 您的其他组件将放在这里 */}
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, marginHorizontal: '3%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 30, }}>
                        <TouchableOpacity
                            onPress={() => goBack()}
                        >
                            {ICON.left(28, COLORS.black)}
                        </TouchableOpacity>
                        <ProgressLine questionNo={questionNo} />
                    </View>
                    {EvaluationQuestions.map((item, index) => <EvaluationQuestion questionNo={questionNo} EvaluationItem={item} setEvaluationAnswer={setEvaluationAnswer} />)}
                    {/* <EvaluationQuestion questionNo={questionNo} setEvaluationAnswer={setEvaluationAnswer} /> */}
                    {!isLastQuestion ? <View style={styles.nextBtnArea}>
                        <TouchableOpacity
                            style={styles.nextBtn}
                            onPress={() => {
                                handleNextQuestion()
                            }}
                        >
                            <Text style={styles.nextBtnContent}>Next question</Text>
                            {ICON.right(24, COLORS.white)}
                        </TouchableOpacity>
                    </View> : <View style={styles.nextBtnArea}>
                        <TouchableOpacity
                            style={styles.nextBtn}
                            onPress={() => {
                                handleSubmitEvaluation()
                            }}
                        >
                            <Text style={styles.nextBtnContent}>提交评估</Text>
                        </TouchableOpacity>
                    </View>}
                </View>

            </SafeAreaView>
        </LinearGradient >
    )
}

export default Evaluation

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    questionContainer: {
        marginVertical: SIZE.LargerMargin,
    },
    question: {
        fontSize: SIZE.LargerTitle,
        fontWeight: 'bold',
        marginBottom: SIZE.LargerMargin
    },
    answerContainer: {
        paddingVertical: SIZE.LargerMargin,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginBottom: SIZE.LargerMargin,
        borderRadius: SIZE.CardBorderRadius
    },
    answer: {
        fontSize: SIZE.NormalTitle,
        color: COLORS.commentText,
        fontWeight: 'bold'
    },
    nextBtnArea: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    nextBtn: {
        padding: SIZE.LargerMargin,
        width: width * 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: COLORS.green,
        borderRadius: SIZE.CardBorderRadius,
        gap: SIZE.LittleMargin,
        alignItems: 'center'
    },
    nextBtnContent: {
        color: COLORS.white,
        fontSize: SIZE.NormalTitle,
        fontWeight: 'bold'
    }
})