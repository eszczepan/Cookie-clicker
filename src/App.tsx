import React, { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'react-bootstrap';

import { statistics } from 'data/statistics';
import { buildings } from 'data/buildings';
import { achievements } from 'data/achievements';
import { cookiesAchievements } from 'api/cookiesAchievements';
import { cpsAchievements } from 'api/cpsAchievements';
import { clickingAchievements } from 'api/clickingAchievements';
import { cpsCounter } from 'utils/cpsCounter';
import { checkAchievement } from 'utils/checkAchievement';
import { IBuilding, IStatistics, IAchievement } from 'typings/models';

import MainTemplate from 'components/templates/MainTemplate';
import CookieCounter from 'components/organisms/CookieCounter/CookieCounter';
import Store from 'components/organisms/Store/Store';
import Achievements from 'components/organisms/Achievements/Achievements';

const App: FC = () => {
  const [progress, setProgress] = useState<IStatistics>(
    JSON.parse(localStorage.getItem('Progress')!) || statistics
  );
  const [buildingProgress, setBuildingProgress] = useState<IBuilding[]>(
    JSON.parse(localStorage.getItem('Buildings')!) || buildings
  );
  const [achievementsProgress, setAchievementsProgress] = useState<IAchievement[]>(
    JSON.parse(localStorage.getItem('Achievements')!) || achievements
  );
  const [cookiesAchievementsData, setCookiesAchievementsData] = useState<IAchievement[]>(
    JSON.parse(localStorage.getItem('cookiesAchievementsData')!) || cookiesAchievements
  );
  const [clickingAchievementsData, setClickingAchievementsData] = useState<IAchievement[]>(
    JSON.parse(localStorage.getItem('clickingAchievementsData')!) || clickingAchievements
  );
  const [cpsAchievementsData, setCpsAchievementsData] = useState<IAchievement[]>(
    JSON.parse(localStorage.getItem('cpsAchievementsData')!) || cpsAchievements
  );
  const [currentAchievements, setCurrentAchievements] = useState<IAchievement[]>(achievements);

  // Interval update progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevState) => ({
        ...prevState,
        cookies: prevState.cookies + prevState.cookiesPerSecond / 10,
        totalCookies: prevState.totalCookies + prevState.cookiesPerSecond / 10,
      }));
      localStorage.setItem('Progress', JSON.stringify(progress));
      localStorage.setItem('Buildings', JSON.stringify(buildingProgress));
      localStorage.setItem('Achievements', JSON.stringify(achievementsProgress));
    }, 100);

    if (Math.round(progress.totalCookies) >= progress.nextLevel) {
      setProgress((prevState) => ({
        ...prevState,
        level: prevState.level + 1,
        nextLevel: prevState.nextLevel * 2,
      }));
    }
    return () => clearInterval(interval);
  }, [progress, buildingProgress, achievementsProgress, currentAchievements]);

  // Check total cookies achievements
  useEffect(() => {
    const newAchievement = checkAchievement(progress.totalCookies, cookiesAchievementsData);
    if (newAchievement !== null) {
      const updated = [...cookiesAchievementsData].filter((obj) => newAchievement.id !== obj.id);
      setCookiesAchievementsData((prevState) => updated);
      setAchievementsProgress((prevState) => [...prevState, newAchievement]);
      setCurrentAchievements((prevState) => [...prevState, newAchievement]);
      localStorage.setItem('cookiesAchievementsData', JSON.stringify(updated));
    }
  }, [progress.totalCookies, cookiesAchievementsData, achievementsProgress]);

  // Handle cookie click and check clicking achievements
  const handleCookieClick = () => {
    setProgress((prevState) => ({
      ...prevState,
      cookies: prevState.cookies + 1,
      totalCookies: prevState.totalCookies + 1,
      cookieClicks: prevState.cookieClicks + 1,
    }));
    const newAchievement = checkAchievement(progress.cookieClicks + 1, clickingAchievementsData);
    if (newAchievement !== null) {
      const updated = [...clickingAchievementsData].filter((obj) => newAchievement.id !== obj.id);
      setClickingAchievementsData((prevState) => updated);
      setAchievementsProgress((prevState) => [...prevState, newAchievement]);
      setCurrentAchievements((prevState) => [...prevState, newAchievement]);
      localStorage.setItem('clickingAchievementsData', JSON.stringify(updated));
    }
  };

  // Handle building purchase and check cps achievements
  const handleBuildingPurchase = (cost: number, index: number) => {
    const updatedProgress = [...buildingProgress].map((el, i) => {
      const { quantity } = el;
      return i === index
        ? {
            ...el,
            quantity: quantity + 1,
            cost: Math.round(cost * 1.15),
          }
        : el;
    });
    setBuildingProgress(updatedProgress);
    setProgress((prevState) => ({
      ...prevState,
      cookies: prevState.cookies - cost,
      cookiesPerSecond: cpsCounter(updatedProgress),
      buildings: prevState.buildings + 1,
    }));
    const newAchievement = checkAchievement(cpsCounter(updatedProgress), cpsAchievementsData);
    if (newAchievement !== null) {
      const updated = [...cpsAchievementsData].filter((obj) => newAchievement.id !== obj.id);
      setCpsAchievementsData((prevState) => updated);
      setAchievementsProgress((prevState) => [...prevState, newAchievement]);
      setCurrentAchievements((prevState) => [...prevState, newAchievement]);
      localStorage.setItem('cpsAchievementsData', JSON.stringify(updated));
    }
  };

  const handleResetProgress = () => {
    setBuildingProgress(buildings);
    setProgress(statistics);
    setAchievementsProgress(achievements);
    setCurrentAchievements(achievements);
    setCookiesAchievementsData(cookiesAchievements);
    setClickingAchievementsData(clickingAchievements);
    setCpsAchievementsData(cpsAchievements);
  };

  const handleRemoveAchievement = (id: number) => {
    setCurrentAchievements((prevState) => prevState.filter((obj) => id !== obj.id));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {nFormatter(Math.round(progress.cookies)).toString()} cookies | Cookie Clicker
        </title>
        <meta name="description" content="Cookie Clicker game" />
        <meta name="theme-color" content="#666" />
      </Helmet>

      <MainTemplate>
        <Row className="no-gutters" style={{ height: 'calc(100% - 51.44px)' }}>
          <Col className="h-100">
            <CookieCounter
              totalCookies={Math.round(progress.totalCookies)}
              counter={Math.round(progress.cookies)}
              cps={Math.round((progress.cookiesPerSecond + Number.EPSILON) * 100) / 100}
              level={progress.level}
              setCounter={handleCookieClick}
              nextLevel={progress.nextLevel}
            />
          </Col>
          <Col className="h-100">
            <Store
              buildings={buildingProgress}
              cookies={progress.cookies}
              handlePurchase={handleBuildingPurchase}
              handleResetProgress={handleResetProgress}
              level={progress.level}
            />
          </Col>
          <Col className="fixed-bottom">
            <Achievements
              achievements={currentAchievements}
              handleRemove={handleRemoveAchievement}
            />
          </Col>
        </Row>
      </MainTemplate>
    </>
  );
};

export default App;
