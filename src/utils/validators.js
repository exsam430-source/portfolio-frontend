/* Shared validation rules — mirrors the Express Validator chains
   on the backend so users never get a surprise server-side rejection. */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const len = (v = '') => v.trim().length;

export const validateContact = (v) => ({
  name:
    len(v.name) < 2 ? 'Please enter your name (at least 2 characters).'
    : len(v.name) > 80 ? 'Name cannot exceed 80 characters.'
    : undefined,
  email:
    !len(v.email) ? 'Email address is required.'
    : !EMAIL_RE.test(v.email.trim()) ? 'Please enter a valid email address.'
    : undefined,
  subject:
    len(v.subject) < 3 ? 'Subject must be at least 3 characters.'
    : len(v.subject) > 140 ? 'Subject cannot exceed 140 characters.'
    : undefined,
  message:
    len(v.message) < 10 ? 'Please write at least 10 characters.'
    : len(v.message) > 4000 ? 'Message cannot exceed 4000 characters.'
    : undefined,
});

export const validateOrder = (v) => ({
  name:
    len(v.name) < 2 ? 'Please enter your full name.'
    : len(v.name) > 80 ? 'Name cannot exceed 80 characters.'
    : undefined,
  email:
    !len(v.email) ? 'Email address is required.'
    : !EMAIL_RE.test(v.email.trim()) ? 'Please enter a valid email address.'
    : undefined,
  phone:
    len(v.phone) > 30 ? 'Phone number is too long.'
    : v.phone && !/^[+\d\s()-]{7,30}$/.test(v.phone.trim()) ? 'Please enter a valid phone number.'
    : undefined,
  serviceType: !len(v.serviceType) ? 'Please select a service type.' : undefined,
  projectTitle:
    len(v.projectTitle) < 3 ? 'Project title must be at least 3 characters.'
    : len(v.projectTitle) > 140 ? 'Project title cannot exceed 140 characters.'
    : undefined,
  description:
    len(v.description) < 20 ? 'Please describe your project in at least 20 characters.'
    : len(v.description) > 5000 ? 'Description cannot exceed 5000 characters.'
    : undefined,
  budget: !len(v.budget) ? 'Please select a budget range.' : undefined,
  timeline: !len(v.timeline) ? 'Please select a timeline.' : undefined,
  techPreference: len(v.techPreference) > 300 ? 'Keep tech preferences under 300 characters.' : undefined,
});

export const validateSubscribe = (v) => ({
  email:
    !len(v.email) ? 'Please enter your email address.'
    : !EMAIL_RE.test(v.email.trim()) ? 'That does not look like a valid email address.'
    : undefined,
});
