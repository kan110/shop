import { Divider, Typography, Box, Link } from "@mui/material"

export default function Footer () {
    return <Box sx={{
        width: '1',
        height: 50
    }}>
        <Divider/>
        <Typography sx={{paddingY: 2, paddingX: 3}}>
            View project on <Link href='https://github.com/kan110/shop' target='_blank' rel='noreferrer'>Github</Link>.
        </Typography>
    </ Box>
}