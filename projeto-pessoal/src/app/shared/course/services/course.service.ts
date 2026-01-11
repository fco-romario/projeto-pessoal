import { inject, Injectable } from '@angular/core';
import { Course, CourseRequest } from '../interfaces/course';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly _baseUrl = 'http://localhost:3000/courses';
  private _http = inject(HttpClient);

  getAllCourses(): Observable<Course[]> {
    return this._http.get<Course[]>(`${this._baseUrl}`)
  }
  savaCourses(courses: CourseRequest[]) {
    const coursesToSave = courses.map(course => {
      course.createdAt = new Date();
      return course;
    });
   
    const request =  coursesToSave.map((course) => this.savaCourse(course));
    
    return forkJoin(request);
  }
  savaCourse(course: CourseRequest) {
    return this._http.post(`${this._baseUrl}`, course)
  }

  deleteCourse(courseId: string) {
    return this._http.delete(`${this._baseUrl}/${courseId}`)
  }
}
