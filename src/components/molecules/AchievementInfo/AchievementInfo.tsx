import React, { FC, useState } from 'react';

import { Row, Col, Toast } from 'react-bootstrap';

interface IProps {
  icon: string;
  id: number;
  title: string;
  description: string;
  handleRemove(id: number): void;
}

const AchievementInfo: FC<IProps> = ({ icon, id, title, description, handleRemove }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    handleRemove(id);
  };

  return (
    <Row className="d-flex justify-content-end pr-2">
      <Col xs={8} className="d-flex justify-content-end">
        <Toast onClose={handleClose} show={show} delay={5000} autohide>
          <Toast.Header>
            <img src={icon} className="rounded mr-2" alt="" />
            <strong className="mr-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body className="bg-info">{description}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};

export default AchievementInfo;
