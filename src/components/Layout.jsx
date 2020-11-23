/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui'
import { ReactComponent as Logo } from 'logo.svg';
import Grid from 'components/Grid';

const Layout = ({
  children,
  ...rest
}) => {
  return (
    <Box pt={56}>
      <Flex sx={{
        bg: '#2d2d2d',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        borderBottom: '1px solid #9f9f9f',
        height: 56,
        color: '#f9fafb',
        alignItems: 'center',
        px: 3,
        zIndex: 9,
      }}>
        <Logo alt="logo" sx={{ transform: 'scale(0.88)' }} />
      </Flex>

      <Grid
        gridTemplateColumns="1fr 1fr 1fr"
        gridGap={4}
        p={4}
        {...rest}
      >
        {children}
      </Grid>
    </Box>
  )
}

export default Layout;
