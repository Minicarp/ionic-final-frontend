import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useContext } from "react";
import { useDialog } from "../hooks/useDialog";
import TaskContext from "../contexts/TaskContext";
import { addOutline } from "ionicons/icons";
import TaskList from "../Components/TaskList";
import './Home.css'

const Home: React.FC = () => {

    const { showPrompt } = useDialog();
    let { addTask } = useContext(TaskContext);

    const prompt = async () => {
      showPrompt("What's Your New Task?").then((task) => {
        if (!task) return;
        addTask({ title: task, completed: false })
          .then(() => {})
          .catch((error: any) => {
            console.log(error);
          });
      });
    };

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar className='ion-padding' color="info">
            <IonTitle class="ion-text-center" color="medium">
              Tony's To Do List:
            </IonTitle>
            <IonButton
              size='small'
              fill='clear'
              color='warning'
              class='ion-float-right'
              onClick={prompt}
            >
              <IonIcon slot='' className = 'add-task' icon={addOutline}></IonIcon>
              Add Task
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <TaskList></TaskList>
        </IonContent>
      </IonPage>
    );
  };
  export default Home;