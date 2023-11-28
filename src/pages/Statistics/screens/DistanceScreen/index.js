import { ScrollView, StyleSheet, View } from 'react-native'
import SIZE from '../../../../constants/SIZE'
import HeaderCard from './components/headerCard'
import Chart from './components/Chart'
import BestRecord from './components/BestRecord'

const DistanceScreen = () => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ marginHorizontal: '3%', marginTop: SIZE.NormalMargin }}>
                <HeaderCard />
                <Chart />
                <BestRecord />
            </View>
        </ScrollView>
    )
}

export default DistanceScreen

const styles = StyleSheet.create({})