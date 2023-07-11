import React, { useCallback } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import SidebarContext from "../../contexts/SidebarContext";

const drawerWidth = 240;
const minDrawerWidth = 50;
const maxDrawerWidth = 1000;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
  },
  toolbar: theme.mixins.toolbar,
  dragger: {
    width: "5px",
    cursor: "ew-resize",
    padding: "4px 0 0",
    borderTop: "1px solid #ddd",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "#f4f7f9",
  },
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
    const classes = useStyles();

  const {open, setOpen} = React.useState(SidebarContext);
  const [tdrawerWidth, setTDrawerWidth] = React.useState(drawerWidth);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMouseDown = (e) => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseMove = useCallback((e) => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setTDrawerWidth(newWidth);
    }
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Button
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </Button>

      <Drawer
        // sx={{
        //   flexShrink: 0,
        //   "& .MuiDrawer-paper": {
        //     width: drawerWidth,
        //     boxSizing: "border-box",
        //   },
        // }}
        className={classes.drawer}
        variant="persistent"
        PaperProps={{ style: { width: tdrawerWidth } }}
        anchor="left"
        open={open}
      >
        {/* <div className={classes.toolbar} /> */}
        <div
          onMouseDown={(e) => handleMouseDown(e)}
          className={classes.dragger}
        />
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
// import React from "react";
// import { Resizable } from "react-resizable";
// import "./ResizableSidebar.css";

// class ResizableSidebar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       width: 200, // initial width of the sidebar
//       isResizing: false,
//     };
//   }

//   handleResize = (event, { size }) => {
//     this.setState({ width: size.width });
//   };

//   handleResizeStart = () => {
//     this.setState({ isResizing: true });
//   };

//   handleResizeStop = () => {
//     this.setState({ isResizing: false });
//   };

//   render() {
//     const { width, isResizing } = this.state;

//     const sidebarContentStyle = {
//       width: `${width}px`,
//     };

//     return (
//       <div className="resizable-sidebar">
//         <Resizable
//           width={width}
//           height={Infinity}
//           handle={<div className="resizable-handle" />}
//           onResize={this.handleResize}
//           onResizeStart={this.handleResizeStart}
//           onResizeStop={this.handleResizeStop}
//           draggableOpts={{ enableUserSelectHack: false }}
//           className={isResizing ? "resizing" : ""}
//         >
//           <div className="sidebar-content" style={sidebarContentStyle}>
//             {/* Your sidebar content goes here */}
//           </div>
//         </Resizable>
//         <div className="page-content">{/* Your page content goes here */}</div>
//       </div>
//     );
//   }
// }

// export default ResizableSidebar;
