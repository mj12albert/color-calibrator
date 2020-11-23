// @flow
import React from 'react';

export default React.createContext<{
  isInverted: boolean,
  onToggle: boolean => void,
}>({
  onToggle: _b => {},
  isInverted: false,
});
