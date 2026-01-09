export interface Course {
  id: string;
  name: string;
  url: string;
  category: string;
  createdAt: Date;
}

export type CourseRequest = Omit<Course, 'id'>