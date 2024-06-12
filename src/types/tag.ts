import {
  Expense,
  Fund
} from './fund';

export interface Association {
  id: number;
  object: Fund | Expense;
  tag: string;
  associatedObjectType: keyof typeof AssociatedObjectType
}

export interface CreateAssociation {
  associatedObjectId: number;
  tagId: string;
  associatedObjectType: keyof typeof AssociatedObjectType
}

export interface AssociationTagProps {
  associatedId: number;
  title: string;
  associatedType: keyof typeof AssociatedObjectType
}

export enum AssociatedObjectType {
  FUND = 'FUND',
  EXPENSE = 'EXPENSE'
}
