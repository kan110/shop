import { useState } from "react";

import {styled} from '@mui/material/styles';
import { Button, Drawer, Accordion, AccordionDetails, AccordionSummary, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FilterDrawer ({isScreenMedium}) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const InvalidButton = styled(Button)(({ theme }) => ({
        '&:hover': {
            cursor: 'not-allowed'
        },
    }));

    const responsiveDrawerProps = {
        variant: isScreenMedium ? 'temporary' : 'permanent',
        open: isDrawerOpen,
        onClose: (() => {setIsDrawerOpen(false)})
    }

    return <>
        {isScreenMedium && <Button onClick={() => setIsDrawerOpen(true)}>FILTER</Button>}
        <Drawer anchor='left' {...responsiveDrawerProps}
            PaperProps={{
                style: {
                position: "absolute",
                width: '250px',
                height: '100%',
                border: 'none',
                }
            }}
        >
            <Accordion sx={{boxShadow: 'none'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>Brand</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Fjallraven" />
                        <FormControlLabel control={<Checkbox />} label="Lock and Love" />
                        <FormControlLabel control={<Checkbox />} label="John Hardy" />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{boxShadow: 'none'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>Price</Typography>
                </AccordionSummary>
                
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="$0 - $50" />
                        <FormControlLabel control={<Checkbox />} label="$50 - $500" />
                        <FormControlLabel control={<Checkbox />} label="$500+" />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <InvalidButton>APPLY</InvalidButton>
            <InvalidButton>CLEAR FILTERS</InvalidButton>
        </Drawer>
    </>
}