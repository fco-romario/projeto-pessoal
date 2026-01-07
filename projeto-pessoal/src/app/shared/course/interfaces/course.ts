export interface Course {
  id: string;
  name: string;
  url: string;
  date: Date;
}

export type CourseRequest = Omit<Course, 'id'>