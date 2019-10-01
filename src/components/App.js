import React from 'react';
import { Router, NavLink, Route, Switch } from 'react-router-dom';
import HikesTable from './HikesTable';
import AddHikeForm from './AddHikeForm';
import AggregateHikeInfo from './AggregateHikeInfo';
import NotFound from './404';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';
import { List, ListItemIcon, ListItem, ListItemText } from '@material-ui/core';
import { 
  TableChart as TableChartIcon, 
  BarChart as BarChartIcon,
  PlaylistAdd as PlaylistAddIcon
} from '@material-ui/icons';
import history from '../history';

const drawerWidth=240;
const useStyles = makeStyles(() => ({ 
  root: {display: 'flex' },
  drawerPaper: { 
    flexShrink: 0,
    width: drawerWidth
  },
  main: {
    flexGrow: 0,
    paddingLeft: drawerWidth + 20,
    paddingRight: 20,
    width: '100%'
  },
  activeLink: {
    color: 'red'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <Router history={history}>
      <div className={classes.root}>
        <Drawer
          classes={{paper: classes.drawerPaper}}
          variant='permanent'
          open={true}>
            <List>
              <NavLink exact activeClassName={classes.activeLink} className={classes.link} to='/'>
                <ListItem button>
                  <ListItemIcon>
                    <TableChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Hikes" />
                </ListItem>
              </NavLink>
              <NavLink exact activeClassName={classes.activeLink} className={classes.link} to='/aggregations'>
                <ListItem button>
                  <ListItemIcon>
                    <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Aggregations" />
                </ListItem>
              </NavLink>
              <NavLink exact activeClassName={classes.activeLink} className={classes.link} to='/add'>
                <ListItem button>
                  <ListItemIcon>
                    <PlaylistAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Hike" />
                </ListItem>
              </NavLink>
            </List>
        </Drawer>
        <main className={classes.main}>
          <Switch>
            <Route exact path='/add' component={AddHikeForm} />
            <Route exact path='/aggregations' component={AggregateHikeInfo} />
            <Route exact path='/' component={HikesTable} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
