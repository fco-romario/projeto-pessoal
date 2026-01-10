export interface Course {
  id: string;
  name: string;
  url: string;
  category: string;
  createdAt: Date;
  status: boolean;
}

export type CourseRequest = Omit<Course, 'id'>