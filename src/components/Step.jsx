/** @jsx jsx */
import { jsx, Box, Heading } from 'theme-ui'
import { COLORS } from 'Constants';
import getColorsFromHue from 'utils/getColorsFromHue';
import ColorTable from 'components/ColorTable';

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

  return (
    <Box>
      <Heading as="h3" sx={{ fontWeight: 500, mb: 3 }}>
        {selected.step}00
      </Heading>

      <ColorTable columns={COLORS}>
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
    </Box>
  )
}

Step.defaultProps = {
  selected: null,
}

export default Step;
