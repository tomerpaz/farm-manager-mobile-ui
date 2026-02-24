import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled, alpha } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';
import { Box, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLang } from '../../features/app/appSlice';


const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;

  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  const { key, ...optionProps } = dataSet[0];

  return (
    <Typography key={dataSet[1]} component="li" {...optionProps} noWrap style={inlineStyle}>
      {` ${dataSet[1].label}`}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = [];

  children.forEach((item) => {

    itemData.push(item);
    itemData.push(...(item.children || []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (child.hasOwnProperty('group')) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <Box display={'flex'} flex={1} ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
          direction={props.dir}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </Box>
  );
});



const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});


export default function SearchBarAutoComplete({ options, onChenge, value }) {
  const theme = useTheme();
  const { dir } = useSelector(selectLang)
  return (
    <Box display={'flex'} flex={1}

      borderRadius={1}
      style={{
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
      }}

    >
      <Autocomplete
        size='small'
        sx={{
          display: 'flex', flex: 1,
          '& .MuiAutocomplete-clearIndicator': {
            color: 'white', // Or any other color value (e.g., 'primary.main', '#00ff00')
          },
          '& .MuiAutocomplete-endAdornment .MuiSvgIcon-root': {
            color: 'white', // Change to your desired color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 0, // Default border color
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 0, // Focused border color
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 0, // Hover border color
          },

        }}

        value={value}
        disableListWrap
        options={options}
        onChange={(e, values, action) => onChenge(values, action)}
        renderInput={(params) => <TextField sx={{ border: 0, input: { color: 'white' } }} {...params}
        />}
        renderOption={(props, option, state) => {
          return [props, option, state.index]
        }
        }
        renderGroup={(params) => params}
        multiple={true}
        slots={{
          popper: StyledPopper,
        }}
        slotProps={{
          listbox: {
            component: ListboxComponent,
            dir,
          },
        }}
        renderValue={(values, getItemProps) =>
          values.map((option, index) => {
            const { key, ...itemProps } = getItemProps({ index });
            return (
              <Chip
                color='primary'
                key={key}
                // variant="outlined"
                label={option.label}
                // size="small"
                {...itemProps}
              />
            );
          })
        }
      />
    </Box>
  );
}
