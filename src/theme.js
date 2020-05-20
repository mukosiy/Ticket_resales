import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    colors: {
      white: "#fff",
      primary: "#556cd6",
      secondary: "#19857b",
      danger: red.A400,
    },
  },
});

export default theme;
