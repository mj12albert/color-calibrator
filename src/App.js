/** @jsx jsx */
import { useState } from 'react';
import { jsx, ThemeProvider } from 'theme-ui'
import theme from 'assets/theme';
import Layout from 'components/Layout';
import Palette from 'components/Palette';
import Hue from 'components/Hue';
import Step from 'components/Step';

const App = ({ inverted }) => {
  const [selectedColor, setSelected] = useState(null);

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
        <Palette
          inverted={inverted}
          selected={selectedColor}
          onClick={handleClick}
        />

        <Hue selected={selectedColor} />

        <Step selected={selectedColor} />
      </Layout>
    </ThemeProvider>
  );
}

App.defaultProps = {
  inverted: false,
}

export default App;
