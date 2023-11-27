import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import useRecords from '../../../../../hooks/useRecords';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import {
    ToolboxComponent,
    LegendComponent,
    TooltipComponent,
    DataZoomComponent,
} from 'echarts/components';
import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import SIZE from '../../../../../constants/SIZE';
import COLORS from '../../../../../constants/COLORS';
import debounceFunc from '../../../../../utils/debounceFunc';
import { chartsOneItemOptions } from '../../../utils/chartsOneItemOptions';

echarts.use([ToolboxComponent, TooltipComponent, DataZoomComponent, LegendComponent, SVGRenderer, LineChart, BarChart, GridComponent]);
const { width } = Dimensions.get("screen")
const Chart = () => {
    const { durationArr, dateArr } = useRecords()
    const skiaRef = useRef(null);
    useEffect(() => {
        let chart;
        const initChart = () => {
            if (skiaRef.current) {
                chart = echarts.init(skiaRef.current, 'light', {
                    renderer: 'svg',
                    width: width * 0.9,
                    height: 300,
                });
                chart.setOption(chartsOneItemOptions(dateArr, durationArr, "运动时长(min)"));
            }
        }
        debounceFunc(initChart(), 1000)
        return () => chart?.dispose();
    }, [durationArr, dateArr]);
    return (
        <View style={{
            marginTop: SIZE.NormalMargin,
            padding: SIZE.LargerMargin,
            borderRadius: SIZE.CardBorderRadius,
            backgroundColor: COLORS.white
        }}>
            <SvgChart ref={skiaRef} />
        </View>
    )
}

export default Chart

const styles = StyleSheet.create({})