import  './header.css';
import { Typography, Button } from '@mui/material';


function Header() {

    return(
      
        <div id = 'outermostDiv'>
            <div id = 'tk_chess'>
                <Typography>TKCHESS</Typography>
        </div>
        <div id = 'innerDiv'>
          <Button variant='contained' id = 'signup'>SIGNUP</Button>
          <Button variant='contained' id = 'login'>LOGIN</Button>
            </div>
       
      </div>
    
    )
}

export default Header;


