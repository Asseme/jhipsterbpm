export interface ICamunda {
  id?: number;
  name?: string;
}

export class Camunda implements ICamunda {
  constructor(public id?: number, public name?: string) {}
}
