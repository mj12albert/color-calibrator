/** @jsx jsx */
import { jsx, Box, Heading } from 'theme-ui'
import getColorsFromHue from 'utils/getColorsFromHue';
import ColorTable from 'components/ColorTable';

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

  console.log(hueScale)

  return (
    <Box>
      <Heading as="h3" sx={{ textTransform: 'capitalize', fontWeight: 500, mb: 3 }}>
        {selected.hue}
      </Heading>

      <ColorTable columns={columns}>
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
    </Box>
  )
}

Hue.defaultProps = {
  selected: null,
}

export default Hue;
