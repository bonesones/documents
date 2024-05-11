import { Link } from "react-router-dom";

export default function Error404() {
    return (
        <div className="error-404">
            <h1>Страница не найдена</h1>
            <Link to="/" className="backlink">На главную</Link>
        </div>
    )
}