import { useState , useEffect} from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardHeader, TextField } from '@mui/material';
import { FormControl, InputLabel, FilledInput, InputAdornment, IconButton } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../provider/authProvider';
const Login = () => {

  const { token, setToken } = useAuth();

  const [isButtonActive, setIsButtonActive] = useState(true);
  const [username, setUsername] = useState<String | null>(null);
  const [password, setPassword] = useState<String | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate('/tarefas', { replace: true });
    }
  }, [token]);


  React.useEffect(() => {
    if (username !== null && username !== '' && password !== null && password !== '') {
      setIsButtonActive(false);
    } else {
      setIsButtonActive(true);
    }

  }, [username, password]
  );

  const postLogin = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: username,
        senha: password
      })
    };
    setErrorMessage('');
    fetch('http://localhost:3000/usuarios/login', requestOptions)
      .then(async (response) => {
        const dataResponse = await response.json()
        return {
          responseStatus: response.status,
          data: dataResponse
        }
      })
      .then(data => {
        if (data.responseStatus === 422 && data.data?.mensagem) {
          setErrorMessage(data.data?.mensagem)
        } else if (data.responseStatus === 400) {
          setErrorMessage('Requisição inválida!')
        } else if (data.responseStatus === 200) {
          if (data?.data?.token) {
            setToken(data?.data?.token)
            //console.log(data?.data?.token);
          }
        }
      })
      .catch(error => setErrorMessage('Erro no servidor, tente novamente em alguns minutos!'));
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title="Tafeito" subheader="Transforme suas tarefas em ações"></CardHeader>
        <CardContent>
          <TextField fullWidth id="username" label="Usuário" variant="filled" value={username} onChange={(newValue) => { setUsername(newValue.target.value); }}></TextField>
          <Box py={1}>
            <FormControl sx={{ width: '100%' }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
              <FilledInput
                onChange={(newValue) => {
                  setPassword(newValue.target.value);
                }}
                id="filled-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </CardContent>
        <CardContent>
          <Button disabled={isButtonActive} variant='contained' sx={{ width: '100%' }} onClick={() => { postLogin() }}>Login</Button>
          <Box width={'100%'}>
            {errorMessage && <Typography color={'red'}>
              {errorMessage}
            </Typography>}
          </Box>
          <Box width={'100%'}></Box>
        </CardContent>

      </Card>
    </Box>
  );
}

export default Login;