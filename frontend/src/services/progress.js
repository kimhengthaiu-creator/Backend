import { apiFetch } from './api';

export const getProgress = async (token) => {
  return await apiFetch('/progress', { token });
};

export const saveProgress = async (token, { lessonId, isCompleted, resumeTimestamp }) => {
  return await apiFetch('/progress', {
    method: 'POST',
    token,
    body: JSON.stringify({ lessonId, isCompleted, resumeTimestamp }),
  });
};
