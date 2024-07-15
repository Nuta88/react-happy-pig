import {
  FC,
  memo,
  MouseEvent
} from 'react';
import { Link } from 'react-router-dom';

import {
  CheckIcon,
  Col,
  Confirm,
  DeleteIcon,
  Dropdown,
  ProgressBar,
  SecondaryText,
  Text,
  TooltipIconButton
} from '../../../../components';
import { apiUrls } from '../../../../constants/apiUrls';
import { FundPriority } from '../../../../constants/fund';
import {
  useCloseFundMutation,
  useUpdateFundMutation
} from '../../../../services/funds';
import { Fund } from '../../../../types';
import { NotificationType } from '../../../../types/notification';
import {
  getAmount,
  getPercentage
} from '../../../../utils/fund';
import { getFirstUpperCaseLetter } from '../../../../utils/string';
import {
  ButtonPriority,
  cardBodyStyle,
  cardHeadStyle,
  CardStyled,
  PriorityIcon
} from '../styled';

const layout = {
  xs: 24,
  md: 12,
  lg: 8
};

interface IFundCardProps {
  fund: Fund;
  openNotification: (type: NotificationType, content: string) => void
}

const FundCard: FC<IFundCardProps> = ({ fund, openNotification }) => {
  const [ closeFund ] = useCloseFundMutation();
  const [ updateFund ] = useUpdateFundMutation();
  const title: string = `${fund.name} (${getAmount(fund.currentAmount)})`;
  const priorityOptions = Object.values(FundPriority);
  const confirmRemoveTitle: string = `Are you sure you want to close "${fund.name}" fund?`;
  const currencyAmount: string = getAmount(fund.plannedAmount);
  const fundDetailLocation: string = apiUrls.funds.rootWithId(fund.id ?? 0);

  const handlePreventFundOpening = (event: MouseEvent<HTMLElement> | undefined): void => {
    event?.stopPropagation();
    event?.preventDefault();
  };

  const onRemoveFund = (event: MouseEvent<HTMLElement> | undefined): void => {
    handlePreventFundOpening(event);
    void closeFund(fund.id as number)
      .then(() => {
        openNotification(NotificationType.SUCCESS, `Fund "${fund.name}" was closed successfully!`);
      });
  };

  const onUpdateFundPriority = (event: MouseEvent<HTMLElement> | undefined, priority: string): void => {
    event?.preventDefault();

    void updateFund({ ...fund, priority });
  };

  return (
    <Col
      {...layout}
      data-testid={`fund-${fund.name}`}
    >
      <Link to={fundDetailLocation}>
        <CardStyled
          headStyle={cardHeadStyle}
          bodyStyle={cardBodyStyle}
          title={title}
          extra={
            <>
              <Dropdown items={[
                ...priorityOptions.map(priority => (
                  {
                    label: (
                      <Text
                        onClick={(e) => { onUpdateFundPriority(e, priority); }}
                      >
                        <PriorityIcon isShowIcon={priority === fund.priority}>
                          <CheckIcon /> {priority}
                        </PriorityIcon>
                      </Text>
                    ),
                    key: priority
                  }
                ))
              ]}>
                <ButtonPriority priority={fund.priority}>
                  <TooltipIconButton
                    tooltip="Fund priority"
                    size="small"
                    data-testid={`fund-${fund.name}-priority`}
                    onClick={(e) => { e.preventDefault(); }}
                  >
                    {getFirstUpperCaseLetter(fund.priority)}
                  </TooltipIconButton>
                </ButtonPriority>
              </Dropdown>
              <Confirm
                title={confirmRemoveTitle}
                onConfirm={onRemoveFund}
                onCancel={handlePreventFundOpening}
              >
                <TooltipIconButton
                  tooltip="Close fund"
                  size="small"
                  icon={<DeleteIcon />}
                  data-testid={`fund-${fund.name}-remove-fund`}
                />
              </Confirm>
            </>
          }
        >
          <SecondaryText>{currencyAmount}</SecondaryText>
          <ProgressBar percent={getPercentage(fund)} aria-label="Fund bar" />
        </CardStyled>
      </Link>
    </Col>
  );
};

export default memo(FundCard);
