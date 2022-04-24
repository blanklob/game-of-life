import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useElementSize } from '@mantine/hooks';
import { isTouchDevice } from '../utils';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, width, height } = useElementSize();
  const touchDevice = isTouchDevice();

  let [dashboardWidth, dashboardHeight] = [300, 270];

  if (touchDevice)
    [dashboardWidth, dashboardHeight] = [window.innerWidth * 0.9, 270];

  const variants = {
    opened: { width: dashboardWidth, height: dashboardHeight },
    closed: { width: width + 15, height: height + 10 },
  };

  return (
    <motion.aside
      className="dashboard"
      drag={!touchDevice}
      variants={variants}
      initial={false}
      animate={isOpen ? 'opened' : 'closed'}
      dragConstraints={{
        top: 0,
        left: -window.innerWidth / 2 + 320,
        right: 0,
        bottom: window.innerHeight / 2 - 320,
      }}
      tabIndex={-1}
    >
      <h3 ref={ref} role="button" onClick={() => setIsOpen(!isOpen)}>
        Settings
      </h3>
      <ul role="list">
        <li>
          <label>Number of intial cells</label>
          <input
            onFocus={() => setIsOpen(true)}
            type="number"
            name="cellsNumber"
          />
        </li>
        <li>
          <label>Earth dimensions</label>
          <input
            onFocus={() => setIsOpen(true)}
            type="number"
            name="cellsNumber"
          />
        </li>
        <li>
          <button role="button">Pause</button>
          <button role="button">Restart</button>
        </li>
      </ul>
    </motion.aside>
  );
}
