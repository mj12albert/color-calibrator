/** @jsx jsx */
import { jsx, Box, Heading, Text } from 'theme-ui'
import _ from 'lodash';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const Dot = (props) => {
  const r = 8;
  const { cx, cy, payload } = props;
  const { hex } = payload;
  return (
    <svg
      cx={cx}
      cy={cy}
      stroke="#cdcdcd"
      strokeWidth="1px"
      strokeLinejoin="round"
    >
      <circle cx={cx} cy={cy} r={r} fill="#fff" />
      <circle cx={cx} cy={cy} r={r - 2} fill={hex} />
    </svg>
  );
}

const SmallText = props => <Text {...props} sx={{
  fontSize: 0,
}} />

const ColorTooltip = ({ active, payload, label }) => {
  if (active) {
    const { hex, step } = payload?.[0].payload;
    return (
      <Box
        sx={{
          bg: hex,
          width: 96,
          color: step > 4 ? 'white' : 'black',
          p: 2,
        }}
      >
        <SmallText>{hex}</SmallText>
      </Box>
    );
  }

  return null;
};

const Chart = ({
  name,
  heading,
  data,
  ...rest
}) => {
  const linearGradientId = `${name}-gradient`;

  return (
    <Box mb={4} {...rest}>
      <Heading as="h4" sx={{ fontWeight: 500, mb: 3 }}>
        {heading}
      </Heading>

      <Box sx={{ border: '1px solid #ccc', bg: '#fcfcfc' }}>
        <ResponsiveContainer width="100%" height={256}>
          <LineChart data={data}>
            <defs>
              <linearGradient id={linearGradientId} x1="0" y1="0" x2="100%" y2="0">
                {data.map((color, i) => {
                  const { hex, value } = color;
                  return (
                    <stop key={value} offset={`${i * (100 / data.length)}%`} stopColor={hex} />
                  );
                })}
              </linearGradient>
            </defs>

            <XAxis
              dataKey="value"
              xAxisId="top"
              orientation="top"
              padding={{
                left: 16,
                right: 16,
              }}
              minTickGap={0}
              interval={0}
              tick={{
                fontSize: 10,
              }}
              tickLine={false}
              tickFormatter={val => _.round(val, 2).toFixed(2)}
            />

            <XAxis
              dataKey="step"
              xAxisId="bottom"
              orientation="bottom"
              padding={{
                left: 16,
                right: 16,
              }}
              hide
            />

            <YAxis dataKey="value" hide />

            <Line
              xAxisId="bottom"
              type="monotone"
              dataKey="value"
              stroke={`url(#${linearGradientId})`}
              strokeWidth="3"
              dot={<Dot />}
            />

            <Tooltip content={<ColorTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}

export default Chart;
