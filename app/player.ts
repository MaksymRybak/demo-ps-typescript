import { Person } from './person'

export class Player implements Person {
  name: string;
  age?: number;
  hireScore: number;

  formatName() {
    return this.name.toUpperCase();
  }
}