import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import axios from 'axios'
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

const theme = createTheme();

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Home = () => {
    const navigate = useNavigate()
    // State untuk mengecek apakah user sudah login atau belum
    const [isLogin, setIsLogin] = React.useState(false)

    // Modifikasi kode di bawah ini untuk mengambil data dari localstorage
    React.useEffect(() => {
        // 1. Ambil data 'user' dan 'token' dari localstorage
        const user = localStorage.getItem('user');
        const id = localStorage.getItem('id');
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');

        // 2. Lempar ke halaman login bila user atau token tidak ada
        if (!user || !id || !email || !token) {
            navigate('../login')
        }

        // 3. definisikan fungsi verifikasi token
        function verifikasi(user,token){
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/verify`, {
                token   : token
            })
            .then(function (response) {
                console.log(response)
                console.log(user)
                if (response.status==200 && id==response.data[0].id) {
                    console.log('Verified')
                    setIsLogin(true)
                } else {
                    console.log('Not Verified')
                    navigate('../login')
                }
            })
            .catch(function (error) {
                console.log(error.response);
                navigate('../login')
            });
        }
        // fungsi ini akan melakukan HTTP POST request ke endpoint
        // /verify pada backend dengan mengirimkan token yang didapat dari localstorage.
        // bila response status-nya 200 dan id dari response sama dengan id user pada localstorage,
        // set isLogin menjadi true. bila tidak, redirect ke halaman login
        
        // 4. Panggil fungsi verifikasi token
        verifikasi(user,token)
    }, [])

    const handleToHome = () => {
        window.location.href = '/';
    };

    if(!isLogin) {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Profile
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleToHome}
                            >
                                Back to Home
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
 
    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}
        >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
            <Typography variant="h2" component="h1" gutterBottom>
            Hello!
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
            {'You can view this page because you`re logged in.'}
            </Typography>
            <Grid container>
                <Grid item>
                <Link href="/profile" variant="body2">
                    {"Go to your profile."}
                </Link>
                </Grid>
            </Grid>
        </Container>
        <Box
            component="footer"
            sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm">
            <Typography variant="body1">
                My sticky footer can be found here.
            </Typography>
            <Copyright />
            </Container>
        </Box>
        </Box>
    );
}

export default Home;