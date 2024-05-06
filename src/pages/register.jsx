import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import validator from "validator"
import { useForm } from "react-hook-form"
import { server } from "../config"
import { useDispatch } from "react-redux"
import { fetchUser } from "../store/userSlice"

export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
        getValues,
        reset
    } = useForm()

    const registerUser = async function(data) {
        try {
            await axios.post(`${server}/auth/registration`, {
                username: data.username,
                password: data.password
            })

            await dispatch(fetchUser({
                username: data.username,
                password: data.password
            }))
            reset()
            navigate('/')
        } catch (e) {
            console.log(e)
        }

    }

    
    return (
        <div className="auth-form-wrapper">
            <form className="auth-form" method="post" onSubmit={handleSubmit(registerUser)}>
                <h1 className="auth-form__title">Регистрация</h1>
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
                                minLength: {
                                    value: 4,
                                    message: "Минимум 4 символа!"
                                }
                            

                            })}
                            className="auth-form__input" 
                            type="password"
                        />
                    </label>
                    <span className="error">{errors?.password && errors.password.message}</span>
                </div>
                <div className="auth-form__input-wrapper">
                    <label className="auth-form__label">
                        Подтвердите пароль
                        <input
                            {...register('password2', {
                                required: "Поле не может быть пустым",
                                validate: (value) => (
                                    value === getValues('password') || "Пароли не совпадают"
                                )

                            })}
                            className="auth-form__input"
                            type="password" 
                        />
                    </label>
                    <span className="error">{errors?.password2 && errors.password2.message}</span>
                </div>
                <input className="auth-form__input auth-form__input_submit" 
                        type="submit" 
                        value={"Зарегистрироваться"}/>
                <Link to={"/login"} className="auth-form__another">
                    Есть аккаунт? Войти
                </Link>
            </form>
        </div>
    )
}