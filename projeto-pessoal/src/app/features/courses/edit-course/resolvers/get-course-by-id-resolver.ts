import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CourseService } from '../../../../shared/course/services/course.service';
import { Course } from '../../../../shared/course/interfaces/course';

export const getCourseByIdResolver: ResolveFn<Course> = (route, state) => {
  const _courseService = inject(CourseService);
  const _id = route.params['id'];

  return _courseService.getCourseById(_id);
};
