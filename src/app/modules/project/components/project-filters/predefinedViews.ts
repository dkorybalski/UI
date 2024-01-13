export const predefinedViews = [
    {
      id: 'PROJECT_GROUPS',
      name: 'Project groups',
      columns: [
        'name',
        'supervisorName',
        'accepted',
      ]
    },
    {
      id: 'GRADES',
      name: 'Grades',
      columns: [
        'name',
        'supervisorName',
        'evaluationPhase',
        'firstSemesterGrade',
        'secondSemesterGrade',
        'criteriaMetStatus',
      ]
    },
    {
      id: 'DEFENSE_SCHEDULE',
      name: 'Defense schedule',
      columns: [
        'name',
        'supervisorName',
        'defenseDay',
        'evaluationPhase',
        'classroom',
        'committee',
        'students',
      ]
    },
    {
      id: 'ALL',
      name: 'All columns',
      columns: [
        'name',
        'supervisorName',
        'accepted',
        'firstSemesterGrade',
        'secondSemesterGrade',
        'criteriaMetStatus',
        'defenseDay',
        'evaluationPhase',
        'classroom',
        'committee',
        'students'
      ]
    },
  ]