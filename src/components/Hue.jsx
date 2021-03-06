/** @jsx jsx */
import { jsx, Box, Heading } from 'theme-ui'
import { useContext } from 'react';
import getColorsFromHue from 'utils/getColorsFromHue';
import ColorTable from 'components/ColorTable';
import Chart from 'components/Chart';
import Context from 'Context';

const Hue = ({
  selected
}) => {
  const { isInverted } = useContext(Context);

  if (!selected?.hue) {
    return <span key="hue-empty" />
  }

  const columns = Array(10)
    .fill()
    .map((_, i) => i)
    .map(i => `${i}00`);

  const hueScale = getColorsFromHue({ hue: selected.hue, inverted: isInverted });

  const lightnessData = hueScale.map(color => {
    const { hex, hsv, step } = color;

    return {
      hex,
      step,
      value: hsv[2],
      name: selected.hue,
    };
  })

  const saturationData = hueScale.map(color => {
    const { hex, hsv, step } = color;

    return {
      hex,
      step,
      value: hsv[1],
      name: selected.hue,
    };
  })

  const hueData = hueScale.map(color => {
    const { hex, hsv, step } = color;

    return {
      hex,
      step,
      value: hsv[0],
      name: selected.hue,
    };
  })

  return (
    <Box>
      <Heading as="h3" sx={{ textTransform: 'capitalize', fontWeight: 500, mb: 3 }}>
        {selected.hue}
      </Heading>

      <ColorTable columns={columns} mb={4}>
        <Box as="tr" height="32px">
          {hueScale.map(color => {
            const { step, hex } = color;

            return (
              <Box as="td" key={`hue-${selected.hue}-${step}`} bg={hex} sx={{
                position: 'relative',
              }} />
            )
          })}
        </Box>
      </ColorTable>

      <Chart name="hue-l" heading="Lightness (L)" data={lightnessData} />

      <Chart name="hue-s" heading="Saturation/Chroma (S)" data={saturationData} />

      <Chart name="hue-h" heading="Hue (H)" data={hueData} />
    </Box>
  )
}

Hue.defaultProps = {
  selected: null,
}

export default Hue;
