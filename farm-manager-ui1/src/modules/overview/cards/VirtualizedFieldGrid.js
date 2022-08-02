import React from 'react';
import {AutoSizer, List} from 'react-virtualized';
import FieldCard from '../map/FieldCard'
import { makeStyles } from '@mui/styles';
import {bodyHeight} from "../../../utils/TabUtils";
import {CARDS} from "../../../components/frame/Routes";
import { isEmpty } from '../../../utils/StringUtil';

const useStyles = makeStyles(theme => ({
    row: {
        display: 'flex',
        flexDirection: 'row',

        flex: 1,
    },

    list: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // alignItems: 'flex-start',
    },

    card: {
        display: 'flex',
        margin: theme.spacing(1),
        flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
    }
}));


export const GRID_COLUMN_COUNT = 4;

//
const VirtualizedGrid = (props) => {

    const classes = useStyles();

    const {displayRows, dir, text, user} = props;

    const hasTags =    !isEmpty(user.business.tag1) ||  !isEmpty(user.business.tag2);
    
    const rowHeight = hasTags ? 220: 190 ;

    return (
        <div dir={dir} style={{display: 'flex', flex: 1, width: '100%', height: bodyHeight}}>
            <AutoSizer >

                {({height, width}) => {
                    const itemsPerRow = GRID_COLUMN_COUNT//Math.floor(width / CARD_WIDTH) || 1; // A calculation to establish how many cards will go on each row.

                    // The || 1 part is a simple hack that makes it work in a really small viewport (if someone totally collapses the window)

                    const rowCount = Math.ceil(displayRows.length / itemsPerRow); // List will need the number of rows in order to be able to properly know what to render and what not to

                    return (
                        <div dir={text.dir} >

                            <List

                                  width={width}
                                  height={height}
                                  rowCount={rowCount}
                                  rowHeight={rowHeight}
                                // CARD_WIDTH is a constant of 340

                                  rowRenderer={({index, key, style}) => {
                                      // This is where stuff gets interesting/confusing

                                      // We are going to constantly update an array of items that our rowRenderer will render

                                      const items = [];

                                      // This array will have a start and an end.

                                      // The start is the top of the window

                                      // The end is the bottom of the window

                                      // the for loop below will constantly be updated as the the user scrolls down

                                      const fromIndex = index * itemsPerRow;

                                      const toIndex = Math.min(
                                          fromIndex + itemsPerRow,
                                          displayRows.length
                                      );

                                      for (let i = fromIndex; i < toIndex; i++) {
                                          let domain = displayRows[i];


                                          items.push(
                                              <div className={classes.card} key={i}>
                                                  <FieldCard caller={CARDS} domain={domain} {...props}/>
                                              </div>
                                          );
                                      }

                                      return (
                                          <div dir={dir} className={classes.row} key={key} style={style}>
                                              {items}
                                          </div>
                                      );
                                  }}
                            />
                        </div>
                    );

                }}

            </AutoSizer>
        </div>
    );
}
export default VirtualizedGrid;