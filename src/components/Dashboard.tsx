import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useElementSize } from '@mantine/hooks';
import { Switch } from '@mantine/core';
import { Slider } from '@mantine/core';
import { isTouchDevice } from '../utils';
import useStore from '../hooks';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, width, height } = useElementSize();
  const touchDevice = isTouchDevice();
  const {
    setShowGridLines,
    setShowBenchmark,
    setColorThreshold,
    setScaleFactor,
    setEnableRandomColorGeneration,
    showGridLines,
    showBenchmark,
    colorThreshold,
    scaleFactor,
    enableRandomColorGeneration,
  } = useStore((state) => state);

  let [dashboardWidth, dashboardHeight] = [300, 490];

  if (touchDevice)
    [dashboardWidth, dashboardHeight] = [window.innerWidth * 0.9, 490];

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
          <label>Cell scale</label>
          <Slider
            min={0.5}
            max={3}
            label={(value) => value}
            step={0.5}
            styles={{ markLabel: { display: 'none' } }}
            color="gray"
            size="lg"
            radius="xs"
            defaultValue={scaleFactor}
            onChange={setScaleFactor}
          />
        </li>
        <li>
          <label>Color Treshold</label>
          <Slider
            min={20}
            max={200}
            label={(value) => value}
            step={20}
            styles={{ markLabel: { display: 'none' } }}
            color="gray"
            size="lg"
            radius="xs"
            defaultValue={colorThreshold}
            onChange={setColorThreshold}
          />
        </li>
        <li>
          <label>Show Benchmark tools</label>
          <Switch
            size="xs"
            radius="xs"
            color="gray"
            checked={showBenchmark}
            onChange={(event) => setShowBenchmark(event.currentTarget.checked)}
          />
        </li>
        <li>
          <label>Enable Random Colors</label>
          <Switch
            size="xs"
            radius="xs"
            color="gray"
            checked={enableRandomColorGeneration}
            onChange={(event) =>
              setEnableRandomColorGeneration(event.currentTarget.checked)
            }
          />
        </li>
        <li>
          <label>Show Grid Lines</label>
          <Switch
            size="xs"
            radius="xs"
            color="gray"
            checked={showGridLines}
            onChange={(event) => setShowGridLines(event.currentTarget.checked)}
          />
        </li>
        <li className="buttons">
          <button role="button" id="pause">
            Pause
          </button>
          <button role="button" id="restart">
            Restart
          </button>
        </li>
      </ul>
    </motion.aside>
  );
}
