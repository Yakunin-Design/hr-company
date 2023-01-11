"use client"
import Link from 'next/link';

import Card from '@/components/Card';
import Button from '@/components/std/Button';
import Spacer from '@/components/std/Spacer';
import Container from '@/components/std/Container';

import Input from '@/components/std/Inputs/Input';
import PasswordInput from '@/components/std/Inputs/PasswordInput';

import login_controller from './login_controller';
import styles from './login.module.css';

export default function LoginPage() {

    if (localStorage.getItem('jwt')) {
        window.location.replace('/profile');
    }

    const {form_data, errors, sign_in, handle_change} = login_controller()

    const error_style = {
        border: '2px solid red',
    };

    console.log(errors)

    return (
        <Container>
            <div className={styles.auth}>
                <Card>
                    <h2>Вход в аккаунт</h2>

                    <Spacer top ="2"/>
                    <Input 
                        label='Логин (email или телефон)'
                        name='login'
                        onChange={handle_change}
                        style={errors.includes('login') ? error_style : {}}
                        value={form_data.login}
                    />
                    {errors.includes('not_found') && 
                        <span className={styles.wrong}>
                            Аккаунт не найден
                        </span>
                    }

                    <Spacer top ="2"/>
                    <PasswordInput 
                        label='Пароль'
                        name='password'
                        onChange={handle_change}
                        style={errors.includes('uncorrected_password') ? error_style : {}}
                        value={form_data.password}
                    />
                    {errors.includes('wrong_password') && 
                        <span className={styles.wrong}>
                            Неверный пароль
                        </span>
                    }
                    
                    <Spacer top ="3"/>
                    <Button onClick={sign_in} expand>Войти</Button>

                    <Spacer top ="1"/>
                    <Link href="/register">
                        <div className={styles.register}>
                            или зарегестрируйтесь
                        </div>   
                    </Link>
                </Card>
            </div>
        </Container>
    );
}
