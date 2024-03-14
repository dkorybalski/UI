import {Project} from "../../project/models/project.model";

export interface Diploma {
  titleEn: string
  titlePl: string
  description: string
  projectId: number
  projectName: string
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
  chapters: string
  projectId: number
  studentIndex: string
}

export interface AddOrUpdateDiplomaProject {
  titleEn: string
  titlePl: string
  description: string
  projectId: number
}

export interface DiplomaChapter {
  name: string
  description: string
  studentIndex: string
}
