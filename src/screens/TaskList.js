import React, {Component} from 'react'
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native'

import todayImg from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import Task from '../components/Task'

import moment from 'moment'
import 'moment/locale/pt-br'



export default class Tasklist extends Component{
    state = {
        tasks: [{
            id: Math.random(),
            desc: 'Comprar Livro de React Native',
            estimateAt: new Date(),
            doneAt: new Date(),
        }, {
            id: Math.random(),
            desc: 'Ler Livro de React Native',
            estimateAt: new Date(),
            doneAt: null,
        }]
    }

    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <ImageBackground source={todayImg}
                style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>   
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasklist}>
                    <FlatList data={this.state.tasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} />} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background:{
        flex: 3
    },
    tasklist:{
        flex: 7
    },
    titleBar:{
        flex: 1,
        justifyContent: 'flex-end'
    },
    title:{
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary
    },
    subtitle:{
        fontSize: 30,
        marginLeft: 20,
        marginBottom: 30,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary

    },
    taskList: {
        flex: 7
    }
   
})