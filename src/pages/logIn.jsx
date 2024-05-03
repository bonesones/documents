import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import axios from "axios";
import { getUserData } from "../store/userSlice";
import { useDispatch } from "react-redux";

export default function Login() {

    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
        reset
    } = useForm()

    const [authError, setAuthError] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleAuthError = function() {
        setAuthError(true)
    }

    const loginUser = function(data) {
        try {
            axios.post('http://localhost:5000/auth/login', {
                username: data.username,
                password: data.password
            }).then(res => {
                localStorage.setItem('token', res.data.token)
                setAuthError(false)
                navigate('/')
                reset()
            }).catch(e => {
                if(e?.response?.status === 403) {
                    handleAuthError()
                }
            })
        } catch(e) {
            console.log(e)
        }
    }

    
    return (
        <div className="auth-form-wrapper">
            <form className="auth-form" method="post" onSubmit={handleSubmit(loginUser)}>
                <h1 className="auth-form__title">Вход</h1>
                <div className="auth-form__input-wrapper">
                    <label className="auth-form__label">
                        Логин
                        <input
                            {...register('username', {
                                required: true,

                            })}
                            className="auth-form__input" 
                        />
                    </label>
                    <span className="error">{errors?.username && "Логин не может быть пустым!"}</span>
                </div>
                <div className="auth-form__input-wrapper">
                    <label className="auth-form__label">
                        Пароль
                        <input
                            {...register('password', {
                                required: "Поле не может быть пустым!",
                            })}
                            className="auth-form__input" 
                            type="password"
                        />
                    </label>
                    <span className="error">{errors?.password && errors.password.message}</span>
                </div>
                <input className="auth-form__input auth-form__input_submit" 
                        type="submit" 
                        value={"Войти"}/>
                {authError && <span className="error" style={{ placeSelf: "center" }}>Неверный логин или пароль</span>}
                <Link to={"/register"} className="auth-form__another">
                    Нет аккаунта? Зарегистрироваться
                </Link>
        </form>
    </div>
    )
}