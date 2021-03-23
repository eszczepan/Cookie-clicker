import React, { useState } from 'react';
import { CardDeck } from 'react-bootstrap';

import { IAchievement } from 'typings/models';
import { achievements } from 'data/achievements';
import MainTemplate from 'components/templates/MainTemplate';
import AchievementCard from 'components/molecules/AchievmentICard/AchievementCard';

const Achievements = () => {
  const [achievementsProgress, _] = useState<IAchievement[]>(
    JSON.parse(localStorage.getItem('Achievements')!) || achievements
  );
  return (
    <MainTemplate>
      {achievementsProgress.length === 0 ? (
        <h1 className="mt-5 text-center">You have no achievements yet.</h1>
      ) : (
        <CardDeck className="d-flex justify-content-center flex-wrap m-4">
          {achievementsProgress.map((item) => (
            <AchievementCard
              key={item.id}
              icon={item.icon}
              description={item.description}
              title={item.title}
            />
          ))}
        </CardDeck>
      )}
    </MainTemplate>
  );
};

export default Achievements;
