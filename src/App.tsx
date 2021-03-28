import React, { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'react-bootstrap';

import { nFormatter } from 'utils/nFormatter';
import { cpsCounter } from 'utils/cpsCounter';
import { checkAchievement } from 'utils/checkAchievement';

import MainTemplate from 'components/templates/MainTemplate';
import CookieCounter from 'components/organisms/CookieCounter/CookieCounter';
import Store from 'components/organisms/Store/Store';
import Achievements from 'components/organisms/Achievements/Achievements';

import { useStores } from 'stores/RootStore';
import { observer } from 'mobx-react';

const App: FC = () => {
  const { statistics, achievements, buildings } = useStores();

  useEffect(() => {
    const interval = setInterval(() => {
      statistics.cookieInc();
    }, 100);
    if (Math.round(statistics.totalCookies) >= statistics.nextLevel) {
      statistics.levelInc();
    }
    const newAchievement = checkAchievement(statistics.totalCookies, achievements.cookies);
    if (newAchievement !== null) {
      achievements.add(newAchievement);
      achievements.updateCookies(newAchievement);
    }
    return () => clearInterval(interval);
  }, [statistics.totalCookies, statistics, achievements]);

  const handleCookieClick = () => {
    statistics.cookieClick();
    const newAchievement = checkAchievement(statistics.cookieClicks, achievements.clicking);
    if (newAchievement !== null) {
      achievements.add(newAchievement);
      achievements.updateClicks(newAchievement);
    }
  };

  const handleBuildingPurchase = (cost: number, index: number) => {
    const updatedProgress = buildings.buildings.map((el, i) => {
      const { quantity } = el;
      return i === index
        ? {
            ...el,
            quantity: quantity + 1,
            cost: Math.round(cost * 1.15),
          }
        : el;
    });

    buildings.purchase(updatedProgress);
    const cpsProgress = cpsCounter(updatedProgress);
    statistics.purchase(cpsProgress, cost);
    const newAchievement = checkAchievement(cpsProgress, achievements.cps);
    if (newAchievement !== null) {
      achievements.add(newAchievement);
      achievements.updateCps(newAchievement);
    }
  };

  const handleResetProgress = () => {
    statistics.clearStore();
    achievements.clearStore();
    buildings.clearStore();
  };

  const handleRemoveAchievement = (id: number) => achievements.removeCurrent(id);

  return (
    <>
      <Helmet>
        <title>
          {nFormatter(Math.round(statistics.cookies)).toString()} cookies | Cookie Clicker
        </title>
      </Helmet>

      <MainTemplate>
        <Row className="no-gutters" style={{ height: 'calc(100% - 51.44px)' }}>
          <Col className="h-100">
            <CookieCounter
              totalCookies={Math.round(statistics.totalCookies)}
              counter={Math.round(statistics.cookies)}
              cps={Math.round((statistics.cookiesPerSecond + Number.EPSILON) * 100) / 100}
              level={statistics.level}
              setCounter={handleCookieClick}
              nextLevel={statistics.nextLevel}
            />
          </Col>
          <Col className="h-100">
            <Store
              buildings={buildings.buildings}
              cookies={statistics.cookies}
              handlePurchase={handleBuildingPurchase}
              handleResetProgress={handleResetProgress}
              level={statistics.level}
            />
          </Col>
          <Col className="fixed-bottom">
            <Achievements
              achievements={achievements.current}
              handleRemove={handleRemoveAchievement}
            />
          </Col>
        </Row>
      </MainTemplate>
    </>
  );
};

export default observer(App);
