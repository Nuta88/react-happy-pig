import {
  useCallback,
  useState
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  Page,
  EditableTitle,
  AddIcon,
  TooltipIconButton,
  SpaceBetween,
  InfoIcon
} from '../../components';
import { apiUrls } from '../../constants/apiUrls';
import { useModal } from '../../hooks';
import {
  useFetchLoanQuery,
  useUpdateLoanMutation
} from '../../services/bank';
import {
  ILoan,
  LoanPayment
} from '../../types/bank';
import { getAmount } from '../../utils/fund';

import LoanInfo from './components/LoanInfo';
import PaymentModal from './components/PaymentModal';
import PaymentsTable from './components/PaymentsTable';
import {
  getLoanWithNewPayments,
  removePaymentFromLoan
} from './helpers';

const LoanDetail = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ updateLoan ] = useUpdateLoanMutation();
  const { data: loan, isLoading, isFetching } = useFetchLoanQuery(Number(id));
  const {
    isOpenModal: isPaymentOpenModal,
    modalContent: selectedPayment,
    openModal: openPaymentModal,
    hideModal: hidePaymentModal
  } = useModal<LoanPayment>();
  const [ isOpenInfo, setIsOpenInfo ] = useState(false);

  const navigateToLoans = (): void => {
    navigate(apiUrls.bank.loans, { replace: true });
  };

  const onUpdateName = (name: string | number): void => {
    void updateLoan({ ...loan, name: name as string });
  };

  const onOpenCreateModal = (): void => {
    openPaymentModal();
  };

  const onCreateOrUpdatePayment = (payment: LoanPayment): void => {
    void updateLoan(getLoanWithNewPayments(loan as ILoan, payment));
    hidePaymentModal();
  };
  const onRemovePayment = (id: number): void => {
    removePaymentFromLoan(loan as ILoan, id);

    void updateLoan(removePaymentFromLoan(loan as ILoan, id));
  };

  const handleToggleInfo = useCallback(() => {
    setIsOpenInfo(open => !open);
  }, [ setIsOpenInfo ]);

  const onUpdateLoanIno = (loan: ILoan): void => {
    void updateLoan(loan);
    setIsOpenInfo(false);
  };

  return (
    <Page
      title={
        <EditableTitle
          data-testid="loan-page-name"
          title={loan?.name ?? ''}
          tooltip="Click to edit fund name"
          secondaryText={`(${getAmount(loan?.amount)})`}
          onChange={onUpdateName}
        />
      }
      isBack
      data-testid="loan-page-content"
      onBack={navigateToLoans}
      extra={[
        <SpaceBetween key="actions">
          <TooltipIconButton
            tooltip="Open loan info"
            icon={<InfoIcon />}
            data-testid="btn-info-modal"
            onClick={handleToggleInfo}
          />
          <TooltipIconButton
            id="add-payments"
            tooltip="Add payments"
            icon={<AddIcon />}
            data-testid="btn-create-modal"
            onClick={onOpenCreateModal}
            disabled={(loan?.amount ?? 0) <= 0}
          />
        </SpaceBetween>
      ]}
    >
      <PaymentsTable
        balance={loan?.balance ?? 0}
        repaymentAmount={loan?.repaymentAmount ?? 0}
        payments={loan?.loanPayments ?? []}
        isLoading={isLoading && isFetching}
        onRemovePayment={onRemovePayment}
        onEditPayment={openPaymentModal}
      />
      {isPaymentOpenModal && (
        <PaymentModal
          loanId={loan?.id ?? 0}
          payment={selectedPayment}
          minAmount={loan?.paymentAmount ?? 0}
          isOpen={isPaymentOpenModal}
          onCancel={hidePaymentModal}
          onCreatePayment={onCreateOrUpdatePayment}
        />)
      }
      { isOpenInfo && (
        <LoanInfo loan={loan} onClose={handleToggleInfo} isOpen={isOpenInfo} onUpdateLoanIno={onUpdateLoanIno} />
      )}
    </Page>
  );
};

export default LoanDetail;
