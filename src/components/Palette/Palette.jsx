/** @jsx jsx */
import { jsx, Box, Flex, Heading, Text } from 'theme-ui'
import { useContext } from 'react';
import _ from 'lodash';
import { COLORS } from 'Constants';
import getColorsFromHue from 'utils/getColorsFromHue';
import ColorTable from 'components/ColorTable';
import Context from 'Context';

const round = val => _.round(val, 2).toFixed(2);

const SmallText = props => <Text {...props} sx={{ fontSize: 0, mb: 1 }} />

const Palette = ({
  selected,
  onClick,
}) => {
  const columns = Array(10)
    .fill()
    .map((_, i) => i)
    .map(i => `${i}00`);

  const { isInverted, onToggle } = useContext(Context);

  return (
    <Box>
      <Flex sx={{ alignItems: 'center', mb: 3 }}>
        <Heading as="h3" sx={{ fontWeight: 500 }}>
          Palette
        </Heading>

        <button
          type="button"
          onClick={onToggle}
          sx={{
            ml: 'auto',
          }}
        >
          <Text>{isInverted ? 'Un-invert' : 'Invert'}</Text>
        </button>
      </Flex>

      <ColorTable columns={columns} showNameColumn>
        {COLORS.map(key => {
          const colors = getColorsFromHue({ hue: key, inverted: isInverted });

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
                        color,
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

      {selected?.color && (
        <Box mt={4}>
          <Heading as="h3" sx={{ fontWeight: 500, mb: 3 }}>Selected</Heading>

          <Box bg={selected?.color?.hex} p={4}>
            <Text sx={{ mb: 2, fontWeight: 500 }}>{selected.hue}-{selected.step}00</Text>
            <SmallText>{selected.color?.hex}</SmallText>
            <SmallText>rgb({selected.color?.rgbString})</SmallText>
            <SmallText>hsl({round(selected.color?.hsl?.[0])}, {round(selected.color?.hsl?.[1])}, {round(selected.color?.hsl?.[2])})</SmallText>
            <SmallText>hsv({round(selected.color?.hsv?.[0])}, {round(selected.color?.hsv?.[1])}, {round(selected.color?.hsv?.[2])})</SmallText>
            <SmallText>lab({round(selected.color?.lab?.[0])}, {round(selected.color?.lab?.[1])},{round(selected.color?.lab?.[2])})</SmallText>
          </Box>
        </Box>
      )}
    </Box>
  )
}

Palette.defaultProps = {
  inverted: false,
}

export default Palette;
