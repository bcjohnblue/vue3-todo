import Dexie, { Table } from 'dexie'
import { Task } from '../interfaces'

interface TaskDB extends Omit<Task, 'id'> {
  id?: number
}

export class MySubClassedDexie extends Dexie {
  tasks!: Table<TaskDB>

  constructor() {
    super('myDatabase')
    this.version(1).stores({
      tasks: '++id, description, completed'
    })
  }
}

export const db = new MySubClassedDexie()
