
import fontLogo from '../images/Easter2.png'

const Navbar = ({ web3Handler, account, explorerURL }) => {
    return (
        <nav className="navbar fixed-top mx-3">
            <header className="header">
                <img class="nav--logo" src={fontLogo} />

                <div className="navbar">
                    <a className="quick-links" href="#home">Home</a>
                    <a className="quick-links" href="#mint">Mint</a>
                    <a className="quick-links" href="#Binkieverse">BinkieVerse</a>
                    <a className="quick-links" href="#roadmap">Roadmap</a>
                    <a className="quick-links" href="#faq">FAQ</a>
                    
                </div>

                <div className="mobile-nav-title">
                    <h2>Binkie Babies</h2>
                </div>

                <div className="icons">
                    <div>
                        <a href="https://twitter.com/binkiebabies" id="search-btn" className="fa-brands fa-twitter search-btn"></a>
                        <a href="https://discord.gg/M8AvNpv5dT" id="cart-btn" className="fa-brands fa-discord"></a>
                    </div>

                    {account ? (
                        <a
                        href={`${explorerURL}/address/${account}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-btn">
                            {account.slice(0, 5) + '...' + account.slice(38, 42)}
                        </a>
                    ) : (
                        <button onClick={web3Handler} className="nav-btn">Connect Wallet</button>
                        )}
                </div>
            </header>
        </nav>
    )
}

export default Navbar;