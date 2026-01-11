export interface Course {
  id: string;
  name: string;
  url: string;
  category: string;
  status: any;
  createdAt: Date;
}

export type CourseRequest = Omit<Course, 'id'>