import React from 'react';
import Button from './Button';

const ContainedButton = (props) => {
    return (
        <Button variant="contained"
            disableElevation
            sx={{ margin: 1 }} {...props} />
    )
}
export default ContainedButton;



