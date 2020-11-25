/** @jsx jsx */
import { jsx, Box, Grid, Heading, Text } from 'theme-ui'
import _ from 'lodash';
import {
  hex as hexFn,
  score as scoreFn,
} from 'wcag-contrast';

const round = val => _.round(val, 2).toFixed(2);

const SmallText = props => <Text {...props} sx={{ fontSize: 0, mb: 1, color: 'inherit' }} />

const Color = ({
  name,
  step,
  // props below this line is generated
  hex,
  hsl,
  hsv,
  rgbString,
  lab,
  ...rest
}) => {
  const contrastOnWhite = hexFn('#fff', hex);
  const contrastOnBlack = hexFn('#000', hex);

  const scoreOnWhite = scoreFn(contrastOnWhite)
  const scoreOnBlack = scoreFn(contrastOnBlack)

  return (
    <Box {...rest}>
      <Heading as="h3" sx={{ fontWeight: 500, mb: 3 }}>Selected</Heading>

      <Box sx={{ border: '1px solid', borderColor: '#eee' }}>
        <Box bg={hex} p={4} sx={{ color: step > 4 ? 'white' : 'black' }}>
          <Text sx={{ mb: 2, fontWeight: 500, color: 'inherit' }}>{name}-{step}00</Text>
          <SmallText>{hex}</SmallText>
          <SmallText>rgb({rgbString})</SmallText>
          <SmallText>hsl({round(hsl?.[0])}, {round(hsl?.[1])}, {round(hsl?.[2])})</SmallText>
          <SmallText>hsv({round(hsv?.[0])}, {round(hsv?.[1])}, {round(hsv?.[2])})</SmallText>
          <SmallText>lab({round(lab?.[0])}, {round(lab?.[1])}, {round(lab?.[2])})</SmallText>
          <SmallText>0xff{hex.replace('#', '')}</SmallText>
        </Box>
        <Grid sx={{
          gridTemplateColumns: '1fr 1fr',
          gridAutoRows: '1fr',
        }}>
          <Box sx={{
            bg: 'white',
            p: 4,
          }}>
            <Text sx={{ fontWeight: 500, color: hex }}>
              {round(contrastOnWhite)}
            </Text>
            <Text sx={{ color: 'black', fontWeight: 700, fontSize: '12px' }}>
              {scoreOnWhite}
            </Text>
          </Box>

          <Box sx={{
            bg: 'black',
            p: 4,
          }}>
            <Text sx={{ fontWeight: 500, color: hex }}>
              {round(contrastOnBlack)}
            </Text>
            <Text sx={{ color: 'white', fontWeight: 700, fontSize: '12px' }}>
              {scoreOnBlack}
            </Text>
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

export default Color;
