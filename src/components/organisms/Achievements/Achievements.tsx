import React, { FC } from 'react';

import { IAchievement } from 'typings/models';
import AchievementInfo from 'components/molecules/AchievementInfo/AchievementInfo';

interface IProps {
  achievements: IAchievement[];
  handleRemove(id: number): void;
}

const Achievements: FC<IProps> = ({ achievements, handleRemove }) => {
  return (
    <>
      {achievements.map((item) => (
        <AchievementInfo
          key={item.id}
          icon={item.icon}
          id={item.id}
          title={item.title}
          description={item.description}
          handleRemove={handleRemove}
        />
      ))}
    </>
  );
};

export default Achievements;
