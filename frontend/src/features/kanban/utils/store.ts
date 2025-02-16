import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { persist } from 'zustand/middleware';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Column } from '../components/board-column';

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

const defaultCols = [
  {
    id: 'TODO',
    title: 'Todo'
  },
  {
    id: 'IN_PROGRESS',
    title: 'In Progress'
  },
  {
    id: 'DONE',
    title: 'Done'
  }
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]['id'];

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
};

export type State = {
  tasks: Task[];
  columns: Column[];
  draggedTask: string | null;
};

const initialTasks: Task[] = [
  {
    id: 'task1',
    status: 'TODO',
    title: 'Project initiation and planning',
    description: 'Define project scope and objectives'
  },
  {
    id: 'task2',
    status: 'TODO',
    title: 'Gather requirements from stakeholders',
    description: 'Schedule meetings with key stakeholders'
  },
  {
    id: 'task3',
    status: 'IN_PROGRESS',
    title: 'Design system architecture',
    description: 'Create technical specifications and diagrams'
  },
  {
    id: 'task4',
    status: 'IN_PROGRESS',
    title: 'Develop MVP features',
    description: 'Implement core functionality'
  },
  {
    id: 'task5',
    status: 'DONE',
    title: 'Initial project setup',
    description: 'Repository creation and development environment setup'
  },
  {
    id: 'task6',
    status: 'DONE',
    title: 'Team onboarding',
    description: 'Complete team member orientation and setup'
  }
];

export type Actions = {
  addTask: (title: string, description?: string) => void;
  addCol: (title: string) => void;
  dragTask: (id: string | null) => void;
  removeTask: (title: string) => void;
  removeCol: (id: UniqueIdentifier) => void;
  setTasks: (updatedTask: Task[]) => void;
  setCols: (cols: Column[]) => void;
  updateCol: (id: UniqueIdentifier, newName: string) => void;
};

export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      columns: defaultCols,
      draggedTask: null,
      addTask: (title: string, description?: string) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: uuid(), title, description, status: 'TODO' }
          ]
        })),
      updateCol: (id: UniqueIdentifier, newName: string) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === id ? { ...col, title: newName } : col
          )
        })),
      addCol: (title: string) =>
        set((state) => ({
          columns: [
            ...state.columns,
            { title, id: state.columns.length ? title.toUpperCase() : 'TODO' }
          ]
        })),
      dragTask: (id: string | null) => set({ draggedTask: id }),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      removeCol: (id: UniqueIdentifier) =>
        set((state) => ({
          columns: state.columns.filter((col) => col.id !== id)
        })),
      setTasks: (newTasks: Task[]) => set({ tasks: newTasks }),
      setCols: (newCols: Column[]) => set({ columns: newCols })
    }),
    { name: 'task-store', skipHydration: true }
  )
);
