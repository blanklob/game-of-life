import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { isTouchDevice } from '../utils';

export default function Window() {
  const [isOpen, setIsOpen] = useState(false);
  const touchDevice = isTouchDevice();
  const size = {
    width: 500,
    height: 500,
  };

  return (
    <motion.div
      className="window"
      dragConstraints={{
        top: -size.height,
        left: -window.innerWidth + size.width,
        right: size.width,
        bottom: window.innerHeight - size.height,
      }}
      drag
      style={{
        display: isOpen && !touchDevice ? 'flex' : 'none',
        inlineSize: size.width,
        blockSize: size.height,
      }}
    ></motion.div>
  );
}
