import { inject, Injectable } from '@angular/core';
import { Course, CourseFilter, CourseRequest } from '../interfaces/course';
import { forkJoin, map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAllCoursesPaginated(page: number, size: number, courseFilterDto?: CourseFilter): Observable<PageJsonServer<Course>> {
    let params = new HttpParams()
    .set('_page', page.toString())
    .set('_limit', size.toString()); // v0.17 usa _limit

    if (courseFilterDto?.name) {
      params = params.set('name_like', courseFilterDto.name); // v0.17 usa _like
    }
    if (courseFilterDto?.category) {
      params = params.set('category_like', courseFilterDto.category);
    }
    if (courseFilterDto?.url) {
      params = params.set('url_like', courseFilterDto.url);
    }
    if (courseFilterDto?.status) {
      params = params.set('status_like', courseFilterDto.status);
    }

    return this._http.get<Course[]>(this._baseUrl, { 
      params, 
      observe: 'response' // Necessário para ler o cabeçalho X-Total-Count
    }).pipe(
      map(res => {
        const totalItems = Number(res.headers.get('X-Total-Count') || 0);
        const totalPages = Math.ceil(totalItems / size);

        return {
          first: 1,
          prev: page > 1 ? page - 1 : 1,
          next: page < totalPages ? page + 1 : page,
          last: totalPages,
          pages: totalPages,
          items: totalItems,
          number: page,
          data: res.body || []
        } as PageJsonServer<Course>;
      })
    );
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
