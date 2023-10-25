import { AppBar, Toolbar, IconButton } from '@mui/material'
import { PictureAsPdfOutlined } from '@mui/icons-material'
import { newDate } from '../../ui/FarmUtil';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectLang } from '../../features/app/appSlice';
import { useParams } from 'react-router-dom';
import { FARM_MANAGER } from '../../app/api/apiSlice';
import AppBarMenu from '../components/AppBarMenu';


const doanlaodFile =(lang, uuid, token)=>{
    const BASE_URL = '/api/file/';

    const url = `${FARM_MANAGER}${BASE_URL}guidance/${uuid}/${newDate().getTime()}/${lang}`
    var filename = "";

    fetch(url, { 
        //method: 'post', 
        headers: new Headers({
            'Cache-Control': 'no-cache',
            "X-Authorization": `Bearer ${token}` ,
            // 'Content-Type': 'application/x-www-form-urlencoded'
        }), 
    }).then((result) => {
        if (!result.ok) {
            throw Error(result.statusText);
        }
        filename = result.headers.get('x-suggested-filename');
        // We are reading the *Content-Disposition* header for getting the original filename given from the server
        const header = result.headers.get('Content-Disposition');
      //  filename = parts[1].split('=')[1].replaceAll("\"", "");

        return result.blob();
    })
    // We use the download property for triggering the download of the file from our browser. 
    // More information about the following code can be found here: https://stackoverflow.com/questions/32545632/how-can-i-download-a-file-using-window-fetch. 
    // The filename from the first promise is used as name of the file.
    .then((blob) => {
        if (blob != null) {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    })
    // The catch is getting called only for client-side errors.
    // For example the throw in the first then-promise, which is the error that came from the server.
    .catch((err) =>
    {
        console.log(err);
    });
    
    

}

const ActivityViewBar = () => {
    const token = useSelector(selectCurrentToken);
    const { activityId, src } = useParams()
    const { lang, dir } = useSelector(selectLang)

    return (
        <AppBar position="static" elevation={0}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => doanlaodFile(lang,activityId, token)}
                    sx={{ mr: 2 }}
                >
                  {activityId  && <PictureAsPdfOutlined />}
                </IconButton>
                <AppBarMenu />
            </Toolbar>
        </AppBar>
    )
}

export default ActivityViewBar

