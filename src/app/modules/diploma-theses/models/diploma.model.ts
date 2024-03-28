import {Project} from "../../project/models/project.model";

export interface Diploma {
  titleEn: string
  titlePl: string
  description: string
  projectId: number
  chapters: DiplomaChapter[]
}

export interface DiplomaWithProject {
  diploma: Diploma
  project: Project
  studentDiplomasCount: number
  studentsCount: number
}

export interface AddOrUpdateDiploma {
  titleEn: string
  titlePl: string
  description: string
  projectId: number
}

export interface AddOrUpdateDiplomaChapter {
  title: string
  description: string
  studentIndex: string
  projectId: number
}

export interface DiplomaChapter {
  title: string
  description: string
  studentIndex: string
}
