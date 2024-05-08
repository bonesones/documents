import { useState } from "react"
import { Link, redirect, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import axios from "axios";
import { fetchUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

export default function Login() {

    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
        reset
    } = useForm()


    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    
    const user = useSelector(state => state.user.user)
    const authError = useSelector(state => state.user.error)
    const loginUser = function(data) {  
        setLoading(true)

        dispatch(fetchUser({
            username: data.username,
            password: data.password
        })).then(res => {
            setLoading(false)
            if(!res.error) {
                reset();
                navigate('/')
            }
            if(res.payload === "Нет связи с сервером") {
                reset();
                navigate("/error")
            }
        })
   
    }

    
    if(loading) {
        return <Loading />
    } else {
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
                        {authError && <span className="error" style={{ placeSelf: "center" }}>{authError}</span>}
                        <Link to={"/register"} className="auth-form__another">
                            Нет аккаунта? Зарегистрироваться
                        </Link>
                </form>
            </div>
        )
    }
}