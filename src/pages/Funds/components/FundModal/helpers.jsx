export class Fund {
  constructor(name = '',
              plannedAmount = 0,
              id = null,
              currentAmount = null,
              expenses = []) {
    this.id = id;
    this.name = name;
    this.plannedAmount = plannedAmount;
    this.currentAmount = currentAmount;
    this.expenses = expenses;
  }
}
