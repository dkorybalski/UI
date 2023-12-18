
export interface ScheduleConfig {
    dateRange: {
        start: string; // MM/DD/YYYY
        end: string; // MM/DD/YYYY
    }
    slotDuration: number;
    timeRange: {
        start: string; // 07:00
        end: string; // 16:00
    }
}

export interface SupervisorDefenseAssignment {
    supervisorId: string;
    defenseSlotId: string;
    time: string; // 7:00 - 7:30
    available: boolean; // is user available in the time slot
    chairperson: boolean;
    committeeIdentifier: string | null; // values: A, B, C - hardcoded dropdown
    classroom: string | null; // value from user input
    projectId: string | null;
}

export interface SupervisorAvailabilitySurvey {
    [key: string]: {
        [key: string]: SupervisorDefenseAssignment
    } // date, e.g. 15/11/2023
}

export interface SupervisorDefenseAssignmentAggregated {
    [key: string]: { // date, e.g. 15/11/2023
        [key: string]: { // key - supervisor name
            [key: string]: SupervisorDefenseAssignment // key - time
        } 
    }
}

export interface ProjectDefense {
    projectDefenseId: string;
    projectId: string | null;
    time: string;
    projectName: string | null;
    date: string;
    committeeIdentifier: string | null; // null value should be possible for safety reason
    classRoom: string;
    committee: string;
    students: string | null;
    chairperson: string; // should the chairperson be display also in committee list?
    isEditable: boolean; // for coordinator always true; for student - true only if (the registration is open and the project supervisor is in the committee and the slot is free) and student is the project admin
}
export interface Project {
    id: string,
    name: string,
    projectDefenseId: string | null
}

export interface SupervisorStatistics { 
    supervisor: string;
    numberOfGroups: number;
    totalNumberOfCommittees: number;
    load: number; // result of totalNumberOfCommittees / numberOfGroups
    committeesPerDay: { [key: string]: number} // e.g. '01/10/2024': 1,
}


export interface ChairpersonAssignmentAggregated {
    [key: string]: { // date, e.g. 11.01.2024
        [key: string]:  // committeeIdentifier, e.g. A
        ChairpersonAssignment
    }
}

export interface ChairpersonAssignment {
    chairpersonId: string | null
    classroom: string | null,    
    date: string,
    committeeIdentifier: string,
}