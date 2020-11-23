/** @jsx jsx */
import { jsx, Box, Text } from 'theme-ui'

const ColorTable = ({
  columns,
  showNameColumn,
  children,
  ...rest
}) => {
  return (
    <Box as="table" width="100%" sx={{ tableLayout: 'fixed', borderCollapse: 'collapse' }} {...rest}>
      <Box as="tbody">
        <Box as="tr" height="32px">
          {showNameColumn && (
            <Box as="td" key="name" />
          )}

          {columns.map(label => (
            <Box as="td" key={label}>
              <Text sx={{ fontSize: 0 }}>{label}</Text>
            </Box>
          ))}
        </Box>

        {children}
      </Box>
    </Box>
  );
}

ColorTable.defaultProps = {
  columns: [],
  showNameColumn: false,
}

export default ColorTable;
