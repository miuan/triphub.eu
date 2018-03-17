import React from 'react';
import styled from 'styled-components';

import AdsListCart from './../AdsListPage/AdsListCard.container'

const ItemLeft = styled.div`

    width: 750px;
    padding: 20px;
    padding-right:120px;
    overflow:hidden;
    @media(max-width:600px){
        float:none;
        width: 100%;
        padding-right:20px;
    }
`;

const ItemRight = styled.div`
    width: 15%;
    float: right;
    padding: 20;
    z-index: 0;
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
    const { tripFirst } = props;
    // on computer view looks the same
    // in mobile is trip on first and then
    // other data as comments, etc..  
    if( tripFirst ) {
        return (
            <div >
                <ItemRight>
                    <Fixed>
                        <AdsListCart 
                                ads={props.ads} 
                                onSave={props.onSaveAds} 
                                onSaveName="Save Or Update"
                                hideDetail={props.hideDetail}
                                onTakeMeToo={props.onTakeMeToo} />
                    </Fixed>
                    </ItemRight>
                    <ItemLeft >
                        {props.children}
                    </ItemLeft>
            </div>
        );
    } else {
        return (
            <div>
                <ItemLeft >
                    {props.children}
                </ItemLeft>
                <ItemRight>
                <Fixed>
                    <AdsListCart 
                            ads={props.ads} 
                            onSave={props.onSaveAds} 
                            onSaveName="Save Or Update" 
                            hideDetail={props.hideDetail}
                            onTakeMeToo={props.onTakeMeToo} />
                </Fixed>
                </ItemRight>
            </div>
        );
    }
};

export default AdsLeftRight;