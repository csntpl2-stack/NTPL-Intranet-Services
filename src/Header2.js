import React from 'react';
import headerimage from './pictures/new_head_ntpl.JPG'

const Header = ()=>
{
    const styles={
        header:{
            textAlign:'center'
        },
        image:{
            width:'50%',
            height:'auto',
        },
    };
    return(
        <div>
            <header style={styles.header}>
                <img src={headerimage}  alt='header' style={styles.image} />
            </header>
        </div>
    );
};

export default Header;
