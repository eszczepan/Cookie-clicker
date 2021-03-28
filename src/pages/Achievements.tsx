import React from 'react';
import { CardDeck } from 'react-bootstrap';

import MainTemplate from 'components/templates/MainTemplate';
import AchievementCard from 'components/molecules/AchievmentICard/AchievementCard';

import { useStores } from 'stores/RootStore';

const Achievements = () => {
  const { achievements } = useStores();
  return (
    <MainTemplate>
      {achievements.achievements.length === 0 ? (
        <h1 className="mt-5 text-center">You have no achievements yet.</h1>
      ) : (
        <CardDeck className="d-flex justify-content-center flex-wrap m-4">
          {achievements.achievements.map((item) => (
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
