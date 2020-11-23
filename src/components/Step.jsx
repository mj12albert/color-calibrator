/** @jsx jsx */
import { jsx, Box, Heading } from 'theme-ui'
import { COLORS } from 'Constants';
import getColorsFromHue from 'utils/getColorsFromHue';
import ColorTable from 'components/ColorTable';
import Chart from 'components/Chart';

const Step = ({
  selected
}) => {
  if (!selected) {
    return <span key="step-empty" />
  }

  const steps = COLORS.map(key => {
    const colors = getColorsFromHue({ hue: key });

    const hue = colors.find(c => c.step === selected.step);

    return hue;
  })

  const lightnessData = steps.map(color => {
    const { hex, hsv, step } = color;

    return {
      hex,
      step,
      value: hsv[2],
    };
  })

  const saturationData = steps.map(color => {
    const { hex, hsv, step } = color;

    return {
      hex,
      step,
      value: hsv[1],
    };
  })

  const hueData = steps.map(color => {
    const { hex, hsv, step } = color;

    return {
      hex,
      step,
      value: hsv[0],
    };
  })

  return (
    <Box>
      <Heading as="h3" sx={{ fontWeight: 500, mb: 3 }}>
        {selected.step}00
      </Heading>

      <ColorTable columns={COLORS} mb={4}>
        <Box as="tr" height="32px">
          {steps.map(color => {
            const { step, hex } = color;

            return (
              <Box as="td" key={`step-${step}-${hex}`} bg={hex} sx={{
                position: 'relative',
              }} />
            )
          })}
        </Box>
      </ColorTable>

      <Chart heading="Lightness (L)" data={lightnessData} />

      <Chart heading="Saturation/Chroma (S)" data={saturationData} />

      <Chart heading="Hue (H)" data={hueData} />
    </Box>
  )
}

Step.defaultProps = {
  selected: null,
}

export default Step;
