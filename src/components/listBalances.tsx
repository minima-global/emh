import React, {useState, useEffect, useRef, ChangeEvent} from 'react';
import {connect} from 'react-redux';

import SparkMD5 from 'spark-md5';

import {Token as Balance} from 'minima';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';

import SearchDelete from '../images/searchDelete.svg';
import SortIcon from '../images/menuIcon.svg';

import {
  Misc,
  Search,
  Balances as BalanceVars,
} from '../config/vars';

import {theme, themeStyles} from '../styles';

import {
  ApplicationState,
  BalanceProps,
  BalanceSortTypes,
} from '../store';

import SearchIcon from '../images/search.svg';

interface StateProps {
  balanceData: BalanceProps
}

type Props = StateProps

const SortMenu = withStyles({
  paper: {
    background: 'linear-gradient(#FFFFFF, #FFFFFF)',
  },
})((props: any) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const SortMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#edefef',
      color: 'red',
    },
    '&:active': {
      backgroundColor: '#edefef',
      color: 'red',
    },
  },
}))(MenuItem);

const display = (props: Props) => {
  const [data, setData] = useState([] as Balance[]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);

  const classes = themeStyles();

  useEffect(() => {
    if ( props.balanceData?.data ) {
      setData(props.balanceData.data);
    }
  }, [props.balanceData]);

  const doSetSearchTerm =
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.target.value);
      };

  const doSearch = () => {
    if ( searchTerm ) {
      const thisData = [] as Balance[];
      props.balanceData?.data.map( ( balance: Balance ) => {
        if ( (balance.token.includes(searchTerm)) ||
             (balance.tokenid.includes(searchTerm)) ) {
          thisData.push(balance);
        }
        setData(thisData);
      });
    } else {
      setData(props.balanceData.data);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setData(props.balanceData.data);
    (searchRef.current as HTMLInputElement).value = '';
  };

  const menuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const menuClose = () => {
    setAnchorEl(null);
  };


  const compareByName = (a: Balance, b: Balance) => {
    return a.token.localeCompare(b.token);
  };

  const compareByID = (a: Balance, b: Balance) => {
    return a.tokenid.localeCompare(b.tokenid);
  };

  const compareByBalanceAsc = (a: Balance, b: Balance) => {
    const aFloat = parseFloat(a.sendable);
    const bFloat = parseFloat(b.sendable);
    if (aFloat < bFloat) {
      return -1;
    }
    if (aFloat > bFloat) {
      return 1;
    }
    // a must be equal to b
    return 0;
  };

  const compareByBalanceDesc = (a: Balance, b: Balance) => {
    const aFloat = parseFloat(a.sendable);
    const bFloat = parseFloat(b.sendable);
    if (aFloat > bFloat) {
      return -1;
    }
    if (aFloat < bFloat) {
      return 1;
    }
    return 0;
  };

  const doSort = ( sortType: BalanceSortTypes ) => {
    if ( sortType === BalanceSortTypes.NAME ) {
      data.sort(compareByName);
    } else if ( sortType === BalanceSortTypes.ID ) {
      data.sort(compareByID);
    } else if ( sortType === BalanceSortTypes.BALANCEASC ) {
      data.sort(compareByBalanceAsc);
    } else if ( sortType === BalanceSortTypes.BALANCEDESC ) {
      data.sort(compareByBalanceDesc);
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Grid
        item
        container
        alignItems="flex-start"
        style={{
          padding: theme.spacing(2),
        }}
        xs={12}
      >

        <Grid
          item
          xs={3}
        >
          <Typography variant="h3">
            {BalanceVars.heading}
          </Typography>
        </Grid>

        <Grid
          item
          xs={8}
        >

          <TextField
            fullWidth
            placeholder={Search.placeHolder}
            inputRef={searchRef}
            size="small"
            name="search"
            type="text"
            variant='outlined'
            onChange={(e) => {
              doSetSearchTerm(e);
            }}
            onKeyPress= {(e) => {
              if (e.key === 'Enter') {
                doSearch();
              }
            }}
            InputProps={{
              endAdornment: (
                <>
                  <InputAdornment
                    position="start"
                    onClick={() => clearSearch()}>
                    <SearchDelete className={classes.searchIcon} />
                  </InputAdornment>
                  <InputAdornment position="start">
                    |
                  </InputAdornment>
                  <InputAdornment position="end">
                    <SearchIcon className={classes.searchIcon} />
                  </InputAdornment>
                </>
              ),
            }}
          />
        </Grid>

        <Grid item container justify="flex-end" xs={1}>
          <IconButton
            onClick={menuClick}
            color="primary"
            aria-label={BalanceVars.sortHeading}
            component="span"
            size="small"
          >
            <SortIcon />
          </IconButton>
          <SortMenu
            id="sortMenu"
            anchorEl={anchorEl}
            keepMounted
            open={menuOpen}
            onClose={menuClose}
          >
            <SortMenuItem disabled={true}>
              {BalanceVars.sortHeading}
            </SortMenuItem>
            <SortMenuItem
              onClick={
                () => doSort(BalanceSortTypes.NAME)}
            >
              {BalanceVars.sortByName}
            </SortMenuItem>
            <SortMenuItem
              onClick={
                () => doSort(BalanceSortTypes.ID)}
            >
              {BalanceVars.sortByID}
            </SortMenuItem>
            <SortMenuItem
              onClick={
                () => doSort(BalanceSortTypes.BALANCEASC)}
            >
              {BalanceVars.sortByBalanceAsc}
            </SortMenuItem>
            <SortMenuItem
              onClick={
                () => doSort(BalanceSortTypes.BALANCEDESC)}
            >
              {BalanceVars.sortByBalanceDesc}
            </SortMenuItem>
          </SortMenu>
        </Grid>

        <Grid
          item
          container
          alignItems="flex-start"
          style={{
            marginTop: theme.spacing(1),
            width: '100%',
            maxHeight: '220px',
            overflow: 'auto',
          }}
          xs={12}
        >
          {
            data.map( ( balance: Balance, index: number ) => {
              const sendable = +balance.sendable;
              const thisSendable = sendable.toFixed(Misc.sendableDecimals);
              const tokenId =
                  balance.tokenid === '0x00' ?
                    '0x00' : balance.tokenid.substring(0, 20) + '...';

              // console.log('balance: ', balance);

              return (
                <React.Fragment key={index}>

                  <Grid
                    item
                    container
                    alignItems='center'
                    xs={1}
                  >
                    {balance.icon?
                        <Avatar
                          alt='Token Icon'
                          src={balance.icon} /> :
                        <Avatar
                          alt='Token Icon'
                          src={'https://www.gravatar.com/avatar/' + SparkMD5.hash(balance.tokenid) + '?d=identicon'} />
                    }
                  </Grid>
                  <Grid
                    item
                    container
                    justifyContent="flex-start"
                    xs={11}
                  >
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        noWrap={true}
                      >
                        {balance.token}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                    >
                      <Typography
                        variant="body1"
                        noWrap={true}
                      >
                        {tokenId}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      style={{
                        marginBottom: theme.spacing(3),
                      }}
                      xs={12}>

                      <Typography
                        variant="body2"
                        noWrap={true}
                      >
                        {thisSendable}
                      </Typography>
                    </Grid>
                  </Grid>

                </React.Fragment>
              );
            })}
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  const balances = state.balanceData as BalanceProps;
  return {
    balanceData: balances,
  };
};

export const ListBalances =
connect<StateProps, {}, {}, ApplicationState>(
    mapStateToProps,
)(display);
