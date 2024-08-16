import { Box, Stack, Typography } from "@mui/material";
import Logo from "../assets/images/Logo.png";
import Logo2 from "../assets/images/Logo-2.svg";

const Footer = () => (
  <Box mt="80px" bgcolor="#FFF3F4">
    <Stack
      gap="40px"
      sx={{ alignItems: "center" }}
      flexWrap="wrap"
      px="40px"
      pt="24px"
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap="20px"
      >
        <img src={Logo} alt="logo" style={{ width: "100px", height: "41px" }} />
        <img src={Logo2} alt="" width="100px" />
      </Stack>
    </Stack>
    <Typography
      variant="h5"
      sx={{ fontSize: { lg: "28px", xs: "20px" } }}
      mt="41px"
      textAlign="center"
      pb="40px"
    >
      Made with ❤️ by Tega
    </Typography>
  </Box>
);

export default Footer;
