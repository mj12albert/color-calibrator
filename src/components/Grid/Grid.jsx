/** @jsx jsx */
import { jsx, Box } from 'theme-ui'

const Grid = ({
  display,
  gridGap,
  gridTemplateColumns,
  children,
  ...rest
}) => {
  return (
    <Box
      sx={{
        display: display || 'grid',
        gridGap,
        gridTemplateColumns,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

Grid.defaultProps = {
  display: 'grid' | 'inline-grid',
  gridTemplateColumns: 'none',
  gridGap: 0,
}

export default Grid;
