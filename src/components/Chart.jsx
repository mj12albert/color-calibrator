/** @jsx jsx */
import { jsx, Box, Heading } from 'theme-ui'
import _ from 'lodash';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

const Dot = (props) => {
  const r = 6;
  const { cx, cy, payload } = props;
  const { hex } = payload;
  return (
    <circle cx={cx} cy={cy} r={r} fill={hex} />
  );
}

const Chart = ({
  heading,
  data,
  ...rest
}) => {
  return (
    <Box mb={4} {...rest}>
      <Heading as="h4" sx={{ fontWeight: 500, mb: 3 }}>
        {heading}
      </Heading>

      <Box sx={{ border: '1px solid #ccc' }}>
        <ResponsiveContainer width="100%" height={256}>
          <LineChart data={data}>
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

            <Line xAxisId="bottom" type="monotone" dataKey="value" stroke="#8884d8" dot={<Dot />} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}

export default Chart;
