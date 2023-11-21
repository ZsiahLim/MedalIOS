import { Foundation, FontAwesome5, FontAwesome, MaterialCommunityIcons, Entypo, Octicons, Ionicons, MaterialIcons } from '@expo/vector-icons';
export const ICON = {
    right: (size, color) => <Entypo name="chevron-right" size={size} color={color} />,
    left: (size, color) => <Entypo name='chevron-left' size={size} color={color} />,
    calender: (size, color) => <Foundation name="calendar" size={size} color={color} />,
    weight: (size, color) => <FontAwesome5 name="weight" size={size} color={color} />,
    addToCalender: (size, color) => <FontAwesome name='calendar-plus-o' size={size} color={color} />,
    circle: (size, color) => <Entypo name="circle" size={size} color={color} />,
    doneCircle: (size, color) => <Octicons name="check-circle-fill" size={size} color={color} />,
    agent: (size, color) => <MaterialCommunityIcons name="face-agent" size={size} color={color} />,
    play: (size, color) => <FontAwesome5 name="play" size={size} color={color} />,
    stop: (size, color) => <Ionicons name="stop" size={size} color={color} />,
    pause: (size, color) => <FontAwesome5 name="pause" size={size} color={color} />,
    previous: (size, color) => <Ionicons name='play-skip-back' size={size} color={color} />,
    next: (size, color) => <Ionicons name='play-skip-forward' size={size} color={color} />,
    fire: (size, color) => <FontAwesome5 name="fire" size={size} color={color} />,
    stepIcon: (size, color) => <MaterialCommunityIcons name="shoe-print" size={size} color={color} />,
    distanceIcon: (size, color) => <MaterialCommunityIcons name="map-marker-distance" size={size} color={color} />,
    time: (size, color) => <Ionicons name="timer-outline" size={size} color={color} />,
    more: (size, color) => <MaterialIcons name="more-horiz" size={size} color={color} />,
}