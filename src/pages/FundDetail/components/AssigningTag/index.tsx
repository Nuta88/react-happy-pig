import {
  FC,
  useState
} from 'react';
import styled from 'styled-components';

import { colors } from '../../../../assets/colors';
import {
  AddIcon,
  AutoComplete,
  Col,
  Divider,
  Empty,
  Row,
  SpaceBetween,
  Tag,
  TagIcon,
  TooltipIconButton
} from '../../../../components';
import {
  useCreateTagAssociationMutation,
  useDeleteTagAssociationMutation,
  useFetchTagAssociationsQuery,
  useFetchTagQuery
} from '../../../../services/tags';
import {
  AssociatedObjectType,
  Association
} from '../../../../types/tag';

import {
  filterAutoCompleteOption,
  findFundAssociations,
  generateOptions,
  generateQueryAssociation,
  isTagsSelected
} from './helpers';

interface InfoProps {
  associatedObjectId: number;
  asociatedObjectType: keyof typeof AssociatedObjectType
}

const AutoCompleteStyled = styled(AutoComplete)`
  width: 12.5rem
`;

const TagSectionStyled = styled.section`
  margin-top: 1rem;
`;

const AssociationsStyled = styled.section`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  > * {
    margin: .3rem;
  }
`;

export const AssigningTag: FC<InfoProps> = ({ associatedObjectId, asociatedObjectType }): JSX.Element => {
  const [ tag, setTag ] = useState<string>('');
  const { data: tags = [] } = useFetchTagQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data: associations = [] } = useFetchTagAssociationsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [ createTagAssociation ] = useCreateTagAssociationMutation({});
  const [ deleteTagAssociation ] = useDeleteTagAssociationMutation({});
  const fundAssociations = findFundAssociations(associatedObjectId, associations, asociatedObjectType);
  const options = generateOptions(tags, fundAssociations);

  const handleSearch = (value: string): void => {
    setTag(value);
  };

  const handleDelete = (association: Association): void => {
    void deleteTagAssociation(generateQueryAssociation(association.object.id as number, association.tag, asociatedObjectType));
  };

  const handleSelect = (value: string): void => {
    void createTagAssociation(generateQueryAssociation(associatedObjectId, value, asociatedObjectType));
    setTag('');
  };

  const handleCreate = (): void => {
    void createTagAssociation(generateQueryAssociation(associatedObjectId, tag, asociatedObjectType));
    setTag('');
  };

  return (
    <>
      <TagSectionStyled>
        <Row>
          <Col style={{ margin: 'auto' }} span={6}>
            Tag Names:
          </Col>
          <Col className="gutter-row" span={18}>
            <AutoCompleteStyled
              allowClear
              value={tag}
              options={options}
              placeholder="Input tag name"
              onSelect={handleSelect}
              onSearch={handleSearch}
              notFoundContent={
                <SpaceBetween>
                  {isTagsSelected(tag, tags)
                    ? 'Tag selected'
                    : <>
                      Not Found Tag
                      <TooltipIconButton
                        tooltip={`Add new "${tag}" tag`}
                        size="small"
                        icon={<AddIcon />}
                        data-testid="title-input-add-tag"
                        onClick={handleCreate}
                      />
                    </>
                  }
                </SpaceBetween>
              }
              filterOption={(value, option) => filterAutoCompleteOption(option, value)}
            />
          </Col>
        </Row>
      </TagSectionStyled>
      <Divider plain>Selected tags</Divider>
      <AssociationsStyled>
        {!fundAssociations.length && <Empty description="No tags" data-testid="empty-tags"/>}
        {fundAssociations.map(fundAssociation => (
          <Tag
            key={fundAssociation.id}
            icon={<TagIcon />}
            color={colors.primary}
            closable
            onClose={(e) => {
              e.preventDefault();
              handleDelete(fundAssociation);
            }}
          >
            {fundAssociation.tag}
          </Tag>
        ))}
      </AssociationsStyled>
    </>
  );
};
