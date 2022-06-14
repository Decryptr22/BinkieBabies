const Footer = () => {
    return (
        <footer>
            <section className="footer" id="footer" >
                <div className="footer-box-container">
                    <div className="box">
                        <h3>Quick Links</h3>
                            <a href="#home"> <i className="fa fa-arrow-right"></i>Home</a>
                            <a href="#mint"> <i className="fa fa-arrow-right"></i>Mint</a>
                            <a href="#rarities"> <i className="fa fa-arrow-right"></i>Rarities</a>
                            <a href="#chickencoop"> <i className="fa fa-arrow-right"></i>BinkieVerse</a>
                            <a href="#roadmap"> <i className="fa fa-arrow-right"></i>Roadmap</a>
                            <a href="#faq"> <i className="fa fa-arrow-right"></i>FAQ</a>
                    </div>

                    <div className="box">
                        <h3>Extra Links</h3>
                        <a href="https://medium.com/@cluckies/are-you-going-to-be-a-lucky-mother-clucker-c6bf7ab5adf0"> <i className="fa fa-arrow-right"></i> Medium Page</a>
                        <a href="https://opensea.io/"> <i className="fa fa-arrow-right"></i> OpenSea</a>
                        <a href="https://etherscan.io/"> <i className="fa fa-arrow-right"></i> Etherscan</a>
                        <a href="https://looksrare.org/"> <i className="fa fa-arrow-right"></i> Looks Rare</a>
                        <a href="#home"> <i className="fa fa-arrow-right"></i> Binkies Lab</a>
                    </div>
                    
                    <div className="box">
                        <h3>Follow Us</h3>
                        <a href="https://twitter.com/binkiebabies"> <i className="fab fa-twitter"></i> Twitter</a>
                        <a href="https://discord.gg/binkies"> <i className="fab fa-discord"></i> Discord</a>
                    </div>
                </div>
            </section>

            <section className="credit">Created by <span>Binkies #4036</span></section>
        </footer>
    );
}

export default Footer

