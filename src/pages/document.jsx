<div className="auth-form__input-wrapper">
<input className="auth-form__input" 
        type="text" name="username" 
        placeholder="Логин" 
        onChange={(e) => handleChangeLogin(e)} 
        value={login}/>
<span className={"error" + (formErrors.loginError ? "" : " hidden")}>
    {formErrors.loginError}
</span>
</div>
<div className="auth-form__input-wrapper">
<input className="auth-form__input" 
        type="password" 
        name="password" 
        placeholder="Пароль" 
        onChange={(e) => handleChangePassword(e)} 
        value={password} />
<span className={"error" + (formErrors.loginError ? "" : " hidden")}>
        {formErrors.passwordError}
</span>
</div>
<div className="auth-form__input-wrapper">
<input className="auth-form__input" 
        type="password" 
        name="password_2" 
        placeholder="Подтвердите пароль" 
        onChange={(e) => handleChangeSubmitPassword(e)} 
        value={submitPassword}/>
<span className={"error" + (formErrors.loginError ? "" : " hidden")}>
        {formErrors.passwordSubmitError}
</span>
</div>