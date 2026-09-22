import { apiFetch } from './api';

export const getLessonBySlug = async (slug) => {
  return await apiFetch(`/lessons/${slug}`);
};
