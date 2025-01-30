import React, { useEffect } from 'react'
import { FARM_MANAGER } from '../../app/api/apiSlice';
import { selectLang } from '../../features/app/appSlice';
import { useSelector } from 'react-redux';

function ActivityExternal() {

  //const text = useSelector(selectLang)

  console.log(text)

    useEffect(() => { ////
        const uuid = '69721c71-58b5-43d5-89d6-80eafd928953';
        const ref = '2741';
        const bid = '1252';
        const url = `${FARM_MANAGER}/external/activity/${uuid}/${ref}/${bid}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
                // if (data.message) {
                //     setMessage(data.message)
                // } else {
                //     setMessage(null)
                //     setData(data.sort(function (x, y) { return y.dt - x.dt; }))
                // }
            }
            );
    }, [])  
  return (
    <div>ActivityExternal</div>
  )
}

export default ActivityExternal