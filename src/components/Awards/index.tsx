import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Timeline } from 'antd';

const Awards: React.FC = () => {

  return (
    <Timeline
    items={[
      {
        children: 'Create a services site (2015-09-01)',
      },
      {
        children: 'Solve initial network problems (2015-09-01)',
      },
      {
        children: 'Technical testing (2015-09-01)',
      },
      {
        children: 'Network problems being solved (2015-09-01)',
      },
    ]}
  />
  );
};

export default Awards;