import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectState } from "./project.state";

const getProjectFeatureState = createFeatureSelector<ProjectState>('project');

export const getProjects = createSelector(
    getProjectFeatureState,
    state => state.projects
);

export const getFilters = createSelector(
    getProjectFeatureState,
    state => state.filters
);

export const getNumberOfColumns = createSelector(
    getProjectFeatureState,
    state => state.filters.columns.length
);

export const getSupervisorAvailability = createSelector(
    getProjectFeatureState,
    state => state.supervisorsAvailability
);

