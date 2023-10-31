import { Link as RouterLink } from "react-router-dom"
import { Stack, Typography, Link } from "@mui/material"

export default function NotFound () {
    return (
        <>
            <Stack sx={{alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
                <Typography variant='h6' align='center'>There's nothing here...</Typography>
                <Link component={RouterLink} to='/' sx={{textDecoration: 'none'}}>
                    <Typography variant='h6' align='center'>Back to shop</Typography>
                </Link>
            </Stack>
        </>
    )
}