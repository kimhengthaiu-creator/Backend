import { apiFetch } from './api';

export const getCourses = async () => {
  return await apiFetch('/courses');
};

export const getCourseBySlug = async (slug) => {
  return await apiFetch(`/courses/${slug}`);
};
