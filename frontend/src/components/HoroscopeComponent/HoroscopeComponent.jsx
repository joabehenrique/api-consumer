import React, { useState, useEffect } from 'react';
import {
    getDailyPhrase,
    getUserDetails,
    getNumerolog,
    getSign,
    getHoroscope
} from '../../routes/AllRoutes';
import {
    MDBContainer,
    MDBBtn
} from 'mdb-react-ui-kit';
import { removeToken, validateToken, getToken } from '../../service/TokenService';
import Auth from '../AuthComponent/AuthComponent';
import { getUsername } from '../../service/AuthService'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        marginBottom: '10px',
        maxHeight: 100,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.2em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    },
});

const Horoscope = ({ userSign }) => {
    const [horoscopeData, setHoroscopeData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [numerolog, setnumerolog] = useState(1);
    const [sign, setSign] = useState('libra');
    const [userSignInput, setUserSignInput] = useState('libra');
    const [numerologyInput, setNumerologyInput] = useState(7);

    const classes = useStyles();

    const handleLogout = () => {
        removeToken();
        window.location.reload();
    };

    const isFeatureAvailable = (featureName) => {
        return userDetails?.plan?.features?.includes(featureName);
    };

    useEffect(() => {
        getDailyPhrase(userSign).then(response => {
            setHoroscopeData(response.data);
        }).catch(err => {
            setError(err.toString());
        });

        getUserDetails(getUsername(), getToken()).then(response => {
            setUserDetails(response.data.content[0]);
        }).catch(err => {
            setError(err.toString());
        });
    }, [userSign]);

    useEffect(() => {
        getNumerolog(Number(numerologyInput)).then(response => {
            setnumerolog(response.data);
        }).catch(err => {
            setError(err.toString());
        });

        getSign(userSignInput).then(response => {
            setSign(response.data);
        }).catch(err => {
            setError(err.toString());
        });
    }, [numerologyInput, userSignInput]);

    useEffect(() => {
        const checkToken = () => {
            const token = getToken();
            if (token) {
                validateToken(token)
                    .then(() => setIsLoggedIn(true))
                    .catch(() => {
                        removeToken();
                        setIsLoggedIn(false);
                        window.localStorage.removeItem('username');
                    });
            }
        };
        checkToken();
        window.addEventListener('storage', checkToken);
        return () => {
            window.removeEventListener('storage', checkToken);
        };
    }, []);

    if (error)
        return <div class="error">Erro: {error}</div>

    if (!horoscopeData)
        return <div class="load">Carregando...</div>

    if (!isLoggedIn) {
        return <Auth />;
    }

    return (
        <div class="tags">
            <Select
                id="user-sign"
                label="Seu Signo"
                value={userSignInput}
                onChange={(e) => setUserSignInput(e.target.value)}
                style={{ margin: '10px 10px 10px 0px', width: '100px' }}
            >
                <MenuItem value="aries">Áries</MenuItem>
                <MenuItem value="taurus">Touro</MenuItem>
                <MenuItem value="gemini">Gêmeos</MenuItem>
                <MenuItem value="cancer">Câncer</MenuItem>
                <MenuItem value="leo">Leão</MenuItem>
                <MenuItem value="virgo">Virgem</MenuItem>
                <MenuItem value="libra">Libra</MenuItem>
                <MenuItem value="scorpio">Escorpião</MenuItem>
                <MenuItem value="sagittarius">Sagitário</MenuItem>
                <MenuItem value="capricorn">Capricórnio</MenuItem>
                <MenuItem value="aquarius">Aquário</MenuItem>
                <MenuItem value="pisces">Peixes</MenuItem>
            </Select>
            <Select
                id="numerology-number"
                label="Seu Número"
                value={numerologyInput}
                onChange={(e) => setNumerologyInput(e.target.value)}
                style={{ margin: '0px 10px 0px 0px', width: '100px' }}
            >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
            </Select>
            {isFeatureAvailable("Daily Horoscope") &&
                <Card className={classes.root}>
                    <CardContent>
                        <Typography style={{ color: '#3B71CA', fontWeight: 'bold' }} gutterBottom>
                            Mensagem do dia
                        </Typography>
                        <Typography variant="body2" component="p">
                            {horoscopeData.daily}
                        </Typography>
                    </CardContent>
                </Card>}
            {isFeatureAvailable("Numerology") &&
                <Card className={classes.root} style={{ marginBottom: '10px', maxHeight: 200, overflow: 'auto' }}>
                    <CardContent>
                        <Typography style={{ color: '#3B71CA', fontWeight: 'bold' }} gutterBottom>
                            Número da sorte
                        </Typography>
                        <Typography variant="body2" component="p">
                            {numerolog.desc}
                        </Typography>
                    </CardContent>
                </Card>}
            {isFeatureAvailable("Sign") &&
                <Card className={classes.root} style={{ marginBottom: '10px', maxHeight: 200, overflow: 'auto' }}>
                    <CardContent>
                        <Typography style={{ color: '#3B71CA', fontWeight: 'bold' }} gutterBottom>
                            Sign
                        </Typography>
                        <Typography variant="body2" component="p">
                            {sign.about}
                        </Typography>
                    </CardContent>
                </Card>}
            <MDBContainer className="p-0 my-2 d-flex flex-column w-50">
                <MDBBtn className="mb-0 w-30" onClick={handleLogout}>Logout</MDBBtn>
            </MDBContainer>
        </div>
    );
};

export default Horoscope;