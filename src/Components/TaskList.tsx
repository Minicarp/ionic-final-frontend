import { IonCheckbox, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonToolbar } from "@ionic/react"
import { useContext } from "react";
import TaskContext from "../contexts/TaskContext";
import { trash, trashOutline } from 'ionicons/icons';
import './TaskList.css'


const TaskList: React.FC = () => {

    const { updateTask, deleteTask } = useContext(TaskContext);

    const taskComplete = (task: any) => {
        const updatedTask = { ...task, completed: true}
        updateTask(updatedTask)
        .then(()=>{
            console.log('success')
        })
        .catch((error: any) =>{
            console.log(error)
        })
    }

    const taskIncomplete = (task: any) => {
        const updatedTask = { ...task, completed: false}
        updateTask(updatedTask)
        .then(()=>{
            console.log('success')
        })
        .catch((error: any) => {
            console.log(error)
        })
    }

    const slideToDelete = (id: any) => {
        deleteTask(id)
        .then(() => {})
        .catch((error: any) => {
            console.log(error)
        })
    }

    return (
           <div>
            <div>
                <TaskContext.Consumer>
                    {({task}) => {
                        return (
                            <>
                                 <IonHeader>
                                    <IonToolbar>
                                    <IonLabel className="ion-padding" color="secondary">
                                        Incomplete
                                    </IonLabel>
                                    </IonToolbar>
                                </IonHeader>
                                {task.map((t: any) => {
                                    if(t.completed === false){
                                        return(
                                            <IonList key={t.taskId}>
                                                <IonItemSliding>
                                                    <IonItem className="listItem" color="success">
                                                        <IonLabel>{t.title}</IonLabel>
                                                        <IonCheckbox aria-label="Label" onIonChange={() => taskComplete(t)} slot="start" checked={false}></IonCheckbox>
                                                    </IonItem>
                                                    <IonItemOptions aria-expanded side='end'>
                                                        <IonItemOption onClick={() => slideToDelete(t.taskId)}>
                                                            <IonIcon slot="icon-only" icon={trash}></IonIcon> 
                                                        </IonItemOption>
                                                    </IonItemOptions>
                                                </IonItemSliding>
                                            </IonList>
                                        )
                                    }
                                })}
                            </>
                        )
                    }} 
                </TaskContext.Consumer>
            </div>
            <div>
                <TaskContext.Consumer>
                        {({task}) => {
                            return (
                                <>
                                   <IonHeader>
                                        <IonToolbar>
                                        <IonLabel className="ion-padding" color="primary">
                                            Complete
                                        </IonLabel>
                                        </IonToolbar>
                                    </IonHeader>
                                    {task.map((t: any) => {
                                        if(t.completed === true){
                                            return(
                                                <IonList key={t.taskId}>
                                                    <IonItemSliding>
                                                        <IonItem className="listItem" color="primary">
                                                            <IonLabel>{t.title}</IonLabel>
                                                            <IonCheckbox aria-label="Label" onIonChange={() => taskIncomplete(t)} slot="start" checked={true} color="success"></IonCheckbox>
                                                        </IonItem>
                                                        <IonItemOptions aria-expanded side='end'>
                                                            <IonItemOption onClick={() => slideToDelete(t.taskId)}>
                                                                <IonIcon slot="icon-only" icon={trashOutline}></IonIcon>
                                                            </IonItemOption>
                                                        </IonItemOptions>
                                                    </IonItemSliding>
                                                </IonList>
                                            )
                                        }
                                    })}
                                </>
                            )
                        }} 
                </TaskContext.Consumer>
            </div>
           </div>
    )
};

export default TaskList


