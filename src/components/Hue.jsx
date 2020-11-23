/** @jsx jsx */
import { jsx, Box, Heading } from 'theme-ui'
import getColorsFromHue from 'utils/getColorsFromHue';
import ColorTable from 'components/ColorTable';
import Chart from 'components/Chart';

const Hue = ({
  selected
}) => {
  if (!selected?.hue) {
    return <span key="hue-empty" />
  }

  const columns = Array(10)
    .fill()
    .map((_, i) => i)
    .map(i => `${i}00`);

  const hueScale = getColorsFromHue({ hue: selected.hue });

  const lightnessData = hueScale.map(color => {
    const { hex, hsv, step } = color;

    return {
      hex,
      step,
      value: hsv[2],
    };
  })

  const saturationData = hueScale.map(color => {
    const { hex, hsv, step } = color;

    return {
      hex,
      step,
      value: hsv[1],
    };
  })

  const hueData = hueScale.map(color => {
    const { hex, hsv, step } = color;

    return {
      hex,
      step,
      value: hsv[0],
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

      <Chart heading="Lightness (L)" data={lightnessData} />

      <Chart heading="Saturation/Chroma (S)" data={saturationData} />

      <Chart heading="Hue (H)" data={hueData} />
    </Box>
  )
}

Hue.defaultProps = {
  selected: null,
}

export default Hue;
