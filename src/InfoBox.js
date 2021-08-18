    import {Card, CardContent, Typography } from '@material-ui/core'
    import "./InfoBox.css";
    import React from 'react'

    function InfoBox({title,isYellow, isGreen, isRed, cases, active, total, ...props }) {
        return (
            <Card 
            onClick={props.onClick} className={`infoBox ${active && "infoBox-selected"} ${isYellow && "infoBox-cases"}  ${isGreen && "infoBox-recovered"}  ${isRed && "infoBox-deaths"}`}
            >
                <CardContent>
            
                    <Typography className="infoBox_title" color = "textSecondary">
                        {title}
                    </Typography>
                    
                    <h2 className={`infoBox_cases  ${isYellow && "infoBox__cases-cases"}  ${isGreen && "infoBox__cases-recovered"}  ${isRed && "infoBox__cases-deaths"}`}>{cases}</h2>
            
                    <Typography className= "infoBox_total" color = "textSecondary">
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    export default InfoBox
