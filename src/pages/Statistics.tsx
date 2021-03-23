import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

import { statistics } from 'data/statistics';
import { IStatistics } from 'typings/models';
import StatsImg1 from 'assets/images/statistics/stats-1.png';
import StatsImg2 from 'assets/images/statistics/stats-2.png';
import StatsImg3 from 'assets/images/statistics/stats-3.png';
import StatsImg4 from 'assets/images/statistics/stats-4.png';
import StatsImg5 from 'assets/images/statistics/stats-5.png';
import StatsImg6 from 'assets/images/statistics/stats-6.png';
import MainTemplate from 'components/templates/MainTemplate';

const Statistics = () => {
  const [progress, _] = useState<IStatistics>(
    JSON.parse(localStorage.getItem('Progress')!) || statistics
  );

  return (
    <MainTemplate>
      <div className="d-flex justify-content-around flex-wrap mt-5">
        <Card className="bg-info p-4 mb-3 rounded" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={StatsImg1} />
          <Card.Body className="text-center">
            <Card.Title>{Math.round(progress.cookies)}</Card.Title>
            <Card.Text>Cookies in bank</Card.Text>
          </Card.Body>
        </Card>

        <Card className="bg-info p-4 mb-3 rounded" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={StatsImg2} />
          <Card.Body className="text-center">
            <Card.Title>{Math.round(progress.totalCookies)}</Card.Title>
            <Card.Text>Cookies baked (all time)</Card.Text>
          </Card.Body>
        </Card>

        <Card className="bg-info p-4 mb-3 rounded" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={StatsImg3} />
          <Card.Body className="text-center">
            <Card.Title>{progress.cookieClicks}</Card.Title>
            <Card.Text>Cookie clicks</Card.Text>
          </Card.Body>
        </Card>

        <Card className="bg-info p-4 mb-3 rounded" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={StatsImg4} />
          <Card.Body className="text-center">
            <Card.Title>{progress.level}</Card.Title>
            <Card.Text>Level reached</Card.Text>
          </Card.Body>
        </Card>

        <Card className="bg-info p-4 mb-3 rounded" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={StatsImg5} />
          <Card.Body className="text-center">
            <Card.Title>{progress.buildings}</Card.Title>
            <Card.Text>Buildings amount</Card.Text>
          </Card.Body>
        </Card>

        <Card className="bg-info p-4 mb-3 rounded" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={StatsImg6} />
          <Card.Body className="text-center">
            <Card.Title>{progress.cookiesPerSecond}</Card.Title>
            <Card.Text>Cookies per second</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </MainTemplate>
  );
};

export default Statistics;
