import React, { FC } from 'react';

import { Card } from 'react-bootstrap';

interface IProps {
  icon: string;
  description: string;
  title: string;
}

const AchievementItem: FC<IProps> = ({ icon, title, description }) => {
  return (
    <Card bg="info" className="m-3" style={{ minWidth: '15rem', maxWidth: '15rem' }}>
      <Card.Img
        variant="top"
        src={icon}
        className="d-block m-auto pt-2 "
        style={{ width: '4rem' }}
      />
      <Card.Body className="p-0">
        <Card.Title className="text-center p-2">{title}</Card.Title>
        <Card.Text className="text-center border-top p-2 pt-3">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AchievementItem;
