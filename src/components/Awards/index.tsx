import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Timeline } from 'antd';

type AwardsProps = {
  awards: {
    name: string;
    timeAchieve: string;
  }[]
}

const Awards: React.FC<AwardsProps> = (props) => {

  // {
  //   children: 'Create a services site (2015-09-01)',
  // },

  return (
    <Timeline
    items={props.awards.map((award) => {
      return {
        children: `${award.name} - (${award.timeAchieve})`,
      };
    })}
  />
  );
};

export default Awards;