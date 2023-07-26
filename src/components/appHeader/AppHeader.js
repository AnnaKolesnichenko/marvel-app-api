import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="www.ex.com">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="www.ex.com">Characters</a></li>
                    /
                    <li><a href="www.ex.com">Comics</a></li>
                    /
                    <li><a href="www.ex.com">Search</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;