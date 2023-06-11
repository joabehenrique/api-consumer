import React, { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBInput
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './AuthComponent.css';
import { signin } from '../../service/AuthService';
import { getToken, validateToken } from '../../service/TokenService';
import Horoscope from '../HoroscopeComponent/HoroscopeComponent';
import { getPlans, authSignup } from '../../routes/AllRoutes';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [justifyActive, setJustifyActive] = useState('tab1');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [plans, setPlans] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [plan, setPlan] = useState(1);
    const [birthdate, setBirthdate] = useState('');
    const [zodiacSign, setZodiacSign] = useState('');

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };

    const handleSignIn = async () => {
        try {
            const response = await signin(username, password);
            console.log('Login bem-sucedido:', response.data);
            setIsLoggedIn(true);
            window.localStorage.setItem('username', username);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    const handleSignup = async () => {
        try{
            await authSignup({
                name: name,
                username: username,
                email: email,
                password: password,
                birthdate: birthdate,
                zodiacSign: zodiacSign,
                plan: {
                    id: Number(plan)
                }
            });
            handleJustifyClick('tab1');
        }catch (error) {
            console.error('Erro ao se registrar:', error);
        }
    };

    useEffect(() => {
        const token = getToken();
        if (token) {
            validateToken(token)
                .then(() => setIsLoggedIn(true))
                .catch(() => setIsLoggedIn(false));
        }
    }, []);

    useEffect(() => {
        getPlans().then(response => {
            setPlans(response.data.content);
        }).catch(error => {
            console.error('Erro ao buscar planos:', error);
        });
    }, []);

    if (isLoggedIn) {
        return <Horoscope />;
    }

    return (
        <MDBContainer className="p-1 my-2 d-flex flex-column w-500">
            <MDBTabs pills justify className='mb-1 d-flex flex-row justify-content-between'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Register
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>
            <MDBTabsContent>
                <MDBTabsPane show={justifyActive === 'tab1'}>
                    <div className="text-center mb-3">
                        <p>Sign in with:</p>
                    </div>
                    <MDBInput wrapperClass='mb-4 label' label='Username' id='form1' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <MDBInput wrapperClass='mb-4 label' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    <MDBBtn className="mb-4 w-100" onClick={handleSignIn}>Sign in</MDBBtn>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Register
                    </MDBTabsLink>
                    <div className='nac'>
                        <p className="text-center">Not a member?
                            <MDBTabsLink className="" onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                                <a href="#">Register</a>
                            </MDBTabsLink>
                        </p>
                    </div>
                </MDBTabsPane>
                <MDBTabsPane show={justifyActive === 'tab2'}>
                    <div className="text-center mb-1">
                        <p>Sign up with:</p>
                    </div>

                    <MDBInput
                        wrapperClass='mb-3 label'
                        label='Name'
                        id='form1'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <MDBInput
                        wrapperClass='mb-3 label'
                        label='Username'
                        id='form1'
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <MDBInput
                        wrapperClass='mb-3 label'
                        label='Email'
                        id='form1'
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <MDBInput
                        wrapperClass='mb-3 label'
                        label='Password'
                        id='form1'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <MDBInput
                        wrapperClass='mb-3 label'
                        label='Birthdate'
                        id='form1'
                        type='birthdate'
                        value={birthdate}
                        onChange={e => setBirthdate(e.target.value)}
                    />
                    <MDBInput
                        wrapperClass='mb-3 label'
                        label='ZodiacSign'
                        id='form1'
                        type='zodiacSign'
                        value={zodiacSign}
                        onChange={e => setZodiacSign(e.target.value)}
                    />
                    <select
                        className="form-select mb-3"
                        value={plan}
                        onChange={e => setPlan(Number(e.target.value))}
                    >
                        {plans.map(currentPlan => (
                            <option key={currentPlan.id} value={currentPlan.id}>{currentPlan.name}</option>
                        ))}
                    </select>
                    <MDBBtn className="mb-3 w-100" onClick={handleSignup}>Sign up</MDBBtn>
                </MDBTabsPane>
            </MDBTabsContent>
        </MDBContainer>
    );
};


export default Auth;