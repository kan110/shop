import { Divider, Typography, Link, Stack } from "@mui/material"

export default function Footer () {
    return <Stack sx={{
        width: '1',
        height: 50,
    }}>
        <Divider/>
        <Stack sx={{flexGrow: 1, justifyContent: 'center'}}>
            <Typography sx={{paddingX: 3}}>
                View project on <Link href='https://github.com/kan110/shop' target='_blank' rel='noreferrer'>GitHub</Link>.
            </Typography>
        </Stack>
    </ Stack>
}