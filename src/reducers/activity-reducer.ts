import { Activity } from "../types"

export type ActivityActions =  //describe lo que pasa en el reducer
    { type: 'save-activity', payload: {newActivity: Activity} } | //tengo una accion y un parametro(payload) que le paso al reducer
    { type: 'set-activeId', payload: {id: Activity['id']} } |
    { type: 'delete-activity', payload: {id: Activity['id']} } |
    { type: 'restart-app' } 

export type ActivityState = {
    activities: Activity[], //el state agrupa todas las actividades
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: localStorageActivities(), //inicializacion
    activeId: ''
} 

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    if(action.type === 'save-activity'){
        //Este codigo maneja la logica para actualizar el state
        let updatedActivities: Activity[] = []
        if(state.activeId) {
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity 
                : activity ) //actualiza el activity que tiene activityId
        }else{
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if(action.type === 'set-activeId'){
        return {
            ...state,
            activeId: action.payload.id
        }
    }
    if(action.type === 'delete-activity'){
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id) //filtra todos los que sean diferente del que vamos a eliminar
        }
    }

    if(action.type === 'restart-app'){
        return {
            activities: [],
            activeId: ''
            
        }
    }

    return state
}