/** @jsx jsx */
import { jsx, Box, Heading, Text } from 'theme-ui'
import { COLORS } from 'Constants';
import getColorsFromHue from 'utils/getColorsFromHue';
import ColorTable from 'components/ColorTable';

const Palette = ({
  selected,
  inverted,
  onClick,
}) => {
  const columns = Array(10)
    .fill()
    .map((_, i) => i)
    .map(i => `${i}00`);

  return (
    <Box>
      <Heading as="h3" sx={{ fontWeight: 500, mb: 3 }}>
        Palette
      </Heading>

      <ColorTable columns={columns} showNameColumn>
        {COLORS.map(key => {
          const colors = getColorsFromHue({ hue: key, inverted });

          return (
            <Box as="tr" height="32px" key={key}>
              <Box as="td" >
                <Text sx={{
                  fontSize: 0,
                }}>{key}</Text>
              </Box>

              {colors.map(color => {
                const { step, hex } = color;

                const isSelected = selected?.step === step  && selected?.hue === key;

                return (
                  <Box as="td" key={`palette-${key}-${step}`} bg={hex} sx={{
                    position: 'relative',
                  }}>
                    <button
                      type="button"
                      onClick={() => onClick({
                        hue: key,
                        step,
                      })}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        appearance: 'none',
                        width: '100%',
                        height: '100%',
                        bg: 'transparent',
                        border: isSelected ? '2px solid white' : 0,
                        outline: 0,
                        p: 0,
                        cursor: isSelected ? 'default' : 'pointer',
                      }}
                    />
                  </Box>
                )
              })}
            </Box>
          )
        })}
      </ColorTable>
    </Box>
  )
}

Palette.defaultProps = {
  inverted: false,
}

export default Palette;
