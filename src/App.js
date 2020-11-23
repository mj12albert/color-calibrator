/** @jsx jsx */
import { useState } from 'react';
import { jsx, ThemeProvider } from 'theme-ui'
import theme from 'assets/theme';
import Layout from 'components/Layout';
import Palette from 'components/Palette';
import Hue from 'components/Hue';
import Step from 'components/Step';
import Context from './Context';

const App = () => {
  const [selectedColor, setSelected] = useState(null);

  const [isInverted, setInverted] = useState(false);

  const handleToggle = () => setInverted(!isInverted);

  const handleClick = ({
    hue,
    step,
    color,
  }) => {
    // console.log(`selected: ${hue}-${step}00`)
    setSelected({ hue, step, color });
  }

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Context.Provider value={{ isInverted, onToggle: handleToggle }}>
          <Palette
            inverted={isInverted}
            selected={selectedColor}
            onClick={handleClick}
          />

          <Hue selected={selectedColor} />

          <Step selected={selectedColor} />
        </Context.Provider>
      </Layout>
    </ThemeProvider>
  );
}

App.defaultProps = {
  inverted: false,
}

export default App;
