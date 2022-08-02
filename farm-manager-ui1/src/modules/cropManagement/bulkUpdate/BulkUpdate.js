import React, { useState } from 'react';
import { FormControlLabel, FormGroup, Checkbox } from '@mui/material';


const Home = (props) => {
    const [type, setType] = useState('resource');

    const { text } = props;
    return (
        <div>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox checked={type === 'resource'}
                            onChange={e => setType('resource')}
                            name="checkedA"
                            color="primary"
                        />
                    }
                    label={text.resource}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={type === 'expectedProduce'}
                            onChange={e => setType('expectedProduce')}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label={text.expectedProduce}
                />
            </FormGroup>
        </div>
    )
}
export default Home;



