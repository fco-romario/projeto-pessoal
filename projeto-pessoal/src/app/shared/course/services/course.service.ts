import { inject, Injectable } from '@angular/core';
import { Course } from '../interfaces/course';
import { Observable } from 'rxjs';
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
}
