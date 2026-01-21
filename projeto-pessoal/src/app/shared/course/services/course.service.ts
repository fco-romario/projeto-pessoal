import { inject, Injectable } from '@angular/core';
import { Course, CourseRequest } from '../interfaces/course';
import { forkJoin, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PageJsonServer } from '../../commons/paginator/interfaces/i-page-';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly _baseUrl = 'http://localhost:3000/courses';
  private _http = inject(HttpClient);

  getAllCourses(): Observable<Course[]> {
    return this._http.get<Course[]>(`${this._baseUrl}`)
  }

  getAllCoursesPaginated(page: number, size: number): Observable<PageJsonServer<Course>> {
    return this._http.get<PageJsonServer<Course>>(`${this._baseUrl}`,
      { 
        params: { 
          _page: page.toString(),
          _per_page: size.toString()
        } 
      });
  }
  
  getCourseById(id: string): Observable<Course> {
    return this._http.get<Course>(`${this._baseUrl}/${id}`)
  }
  getCourseByPersonId(personId: string): Observable<Course[]> {
    // return this._http.get<Course>(`${this._baseUrl}/${personId}?_embed=people`)
    return this._http.get<Course[]>(`${this._baseUrl}?personId=${personId}&_embed=people`);
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

  updateCourse(course: Course) {
    return this._http.put(`${this._baseUrl}/${course.id}`, course)
  }
}
