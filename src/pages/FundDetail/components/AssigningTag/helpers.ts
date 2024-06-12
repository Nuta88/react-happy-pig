import * as React from 'react';

import {
  AssociatedObjectType,
  Association,
  CreateAssociation
} from '../../../../types/tag';

interface AutoCompleteOption {
  label: React.ReactNode;
  value?: string | number | null
}

export const generateQueryAssociation = (associatedObjectId: number, tagId: string, associatedObjectType: keyof typeof AssociatedObjectType): CreateAssociation => (
  {
    associatedObjectId,
    tagId,
    associatedObjectType
  }
);

export const findFundAssociations = (id: number, associations: Association[], associatedObjectType: keyof typeof AssociatedObjectType): Association[] =>
  associations.filter((a: Association) =>
    a.associatedObjectType === associatedObjectType && id === a.object.id);

export const generateOptions = (tags: string[], fundAssociations: Association[]): AutoCompleteOption[] => {
  const fundAssociationsTags = fundAssociations.map(fa => fa.tag.toLowerCase());

  return tags.filter(tag => !fundAssociationsTags.includes(tag.toLowerCase()))
    .map(tag => ({ label: tag, value: tag }));
};

export const filterAutoCompleteOption = (option: AutoCompleteOption | undefined, value: string): boolean => {
  if (option?.value) {
    return !!option.value.toString().toLowerCase().includes(value.toLowerCase());
  }
  return false;
};

export const isTagsSelected = (tag: string, tags: string[]): boolean => !tag || tags.includes(tag);
