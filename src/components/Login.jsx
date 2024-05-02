export default function Login () {
    return (
        <form type="post" onSubmit={(e) => loginUser(e)}>
                <input type="text" name="username" placeholder="username" onChange={(e) => handleChangeLogin(e)} />
                <input type="password" name="password" placeholder="password" onChange={(e) => handleChangePassword(e)} />
         </form>
    )
}