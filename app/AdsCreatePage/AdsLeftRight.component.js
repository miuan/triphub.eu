import React from 'react';
import styled from 'styled-components';

import AdsListCart from './../AdsListPage/AdsListCard.container'

const styleContainer = {    
}

const styleItemLeft = {
    width: '80%',
    padding: 20,
}

const ItemRight = styled.div`
    width: 15%;
    float: right;
    padding: 20;
    @media(max-width:600px){
        float:none;
        width: 100%;
    }
`;

const Fixed = styled.div`
    position: fixed;
    top: 1px;
    @media(max-width:600px){
        position:relative;
    }
`;

const AdsLeftRight = (props) => {


    return (
        <div style={styleContainer}>        
            <div style={styleItemLeft}>
                {props.children}
            </div>

            <ItemRight>
                <Fixed>
                    <AdsListCart ads={props.ads} onSave={props.onSaveAds} onSaveName="Save Or Update"/>
                </Fixed>
            </ItemRight>
        </div>
    )
};

export default AdsLeftRight;