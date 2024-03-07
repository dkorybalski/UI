export interface Diploma {
  titleEn: string
  titlePl: string
  description: string
  chapters: string
  studentIndex: string
  studentName: string
  projectId: number
  projectName: string
}

export interface AddOrUpdateDiploma {
  titleEn: string
  titlePl: string
  description: string
  chapters: string
  projectId: number
  studentIndex: string
}
