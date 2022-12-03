import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Card } from '../../Card';
import { ArrowLeftIcon } from '../../Icons';
import { Title } from '../../Typography/Title';
import { SpaceBetween } from '../../Space/SpaceBetween';

const cardStyle = {
  height: 'calc(100% - 3rem)',
  overflow: 'auto',
  paddingBottom: '1rem'
};

const backIconStyle = {
  cursor: 'pointer'
};

export default function Page({ title, isBack, extra, onBack, children }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if ( onBack ) onBack();

    navigate(-1);
  };

  return (
    <>
      <SpaceBetween>
        <Title>{isBack && <ArrowLeftIcon style={backIconStyle} onClick={handleBack} />} {title}</Title>
        {extra}
      </SpaceBetween>
      <Card style={cardStyle}>
        {children}
      </Card>
    </>
  );
}

Page.propTypes = {
  title: PropTypes.string,
  extra: PropTypes.node,
  isBack: PropTypes.bool,
  onBack: PropTypes.func,
  children: PropTypes.node
};

Page.defaultProps = {
  title: 'Page Title',
  isBack: false
};
