import * as AppState from '../../../app.state';
import { User } from '../models/user.model';

export interface UserState extends User {
    logged: boolean;
    selectedStudyYear: string;
    lang: string;
}

export interface State extends AppState.State {
    user: UserState
}

export const initialState: UserState = {
    indexNumber: '',
    name: '',
    role: 'STUDENT',
    studyYears: [],
    email: '',
    selectedStudyYear: '',
    projects: [],
    acceptedProjects: [],
    logged: false,
    lang: 'pl'
}