import React, {Component} from 'react'
import {View, 
    Text, 
    ImageBackground, 
    StyleSheet, 
    FlatList,
    TouchableOpacity,
    Platform} from 'react-native'

import todayImg from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import Task from '../components/Task'

import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

import AddTask from './AddTask'
import { Alert } from 'react-native'



export default class Tasklist extends Component{
    state = {
        showAddTask :false,
        showDoneTasks: true,
        visibleTasks: [],
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
        }, {
            id: Math.random(),
            desc: 'Terminar tasks',
            estimateAt: new Date(),
            doneAt: null,
        }]
    }

    componentDidMount = () => {
        this.filterTasks()
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    addTask = newTask => {
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dados Inválidos', 'Descrção não informada')
            return
        }

        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })

        this.setState({ tasks, showAddTask: false}, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
        }else{
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({visibleTasks})
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if(task.id === taskId){
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({ tasks }, this.filterTasks)
    }

    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} 
                           onCancel={() => this.setState( { showAddTask: false } )} 
                           onSave={this.addTask}/>
                <ImageBackground source={todayImg}
                style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={40} color={commonStyles.colors.secondary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>   
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasklist}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} />} />
                </View>
                <TouchableOpacity style={styles.addButton} 
                    activeOpascity={0.4}
                    onPress={() => this.setState({showAddTask: true})}>
                    <Icon name="plus" size={20}
                                    color={commonStyles.colors.secondary} />
                </TouchableOpacity>
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
    },
    iconBar:{
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 50 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'

    }
   
})