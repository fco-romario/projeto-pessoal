export interface Course {
  id: string;
  name: string;
  url: string;
  category: string; //todo trocar para enum
  status: any;
  createdAt: Date;
  personId: string;
}

export type CourseRequest = Omit<Course, 'id'>

export type CourseFilter = Omit<Course, 'id' | 'createdAt' | 'personId'>