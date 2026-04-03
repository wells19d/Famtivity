# Famtivity

Famtivity is a family-based task and activity management app built with React Native and Firebase.  
The goal is to provide a shared, real-time environment where families can manage tasks, responsibilities, and (later) medications.

---

## Core Concept

Famtivity is centered around a family unit, not individual users.

Each family:

- Shares tasks and responsibilities
- Has role-based permissions (adult vs child)
- Can assign, track, and complete tasks collaboratively

---

## Current Architecture

- React Native (CLI, no Expo)
- TypeScript
- Redux + Redux-Saga (structure in place)
- Firebase (Auth, Firestore, Storage, Analytics)
- Custom UI system (src/ui)
- Test Data Hook simulating backend (useTestData)

---

## Task System Rules

### Permissions

- Adults can create, edit, and delete tasks
- Children can create tasks (auto-assigned to themselves)
- Only the creator can edit/delete private tasks

### Assignment

- Tasks can be assigned to multiple users
- Tasks can be unassigned
- Unassigned tasks appear in the To-Do list
- Users can claim unassigned tasks
- Adult-only tasks cannot be claimed by children

### Visibility

- All family members see all tasks except private tasks
- Private tasks are only visible to assigned users
- Adults can see private child tasks

### Status

- Tasks move to the bottom when completed
- Completed tasks are archived based on plan:
  - Free: 2 weeks
  - Basic: 1 month
  - Premium: 3 months

---

## Data Structure (High-Level)

The app uses a normalized data model centered around the family unit.

Core collections:

- user.auth → authentication (Firebase)
- profile → user identity and role within a family
- family → household grouping and permissions
- tasks → assigned and unassigned tasks (supports multi-user assignment)
- medications → (planned) tracking and reminders
- medLogs → (planned) historical logs for medication events

Key design decisions:

- Tasks store `assignedTo: string[]` (no duplicated user data)
- Relationships resolved through IDs (profiles, families)
- Data is structured for real-time updates and scalability

---

## Technology Stack

- React Native (CLI)
- TypeScript
- Redux + Redux-Saga (architecture in place)
- Firebase (Auth, Firestore, Storage, Analytics)
- FlashList (high-performance lists)
- Custom UI System (modular, reusable components)

---

## License

© 2026 AJ

All rights reserved.

This project is provided for portfolio and educational purposes only.

You may view and learn from this code, but you may not copy, reproduce,
distribute, modify, or use it in any commercial or production environment
without explicit permission.
