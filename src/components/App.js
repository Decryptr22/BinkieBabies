import { useState, useEffect } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import Countdown from 'react-countdown'
import Web3 from 'web3'

// Import Images + CSS
import MintBinkies from '../images/windowbinkie.png'
import '../App.css'

// Import Components
import Navbar from './Navbar'
import Footer from './footer'
import Faq from './faq'
import Team from './team'
import Roadmap from './roadmap'
import Binkieverse from './binkieverse'
import Home from './home'
import MintAmount from './mintamount'

// Import ABI + Config
import BinkieBabies from '../abis/BinkieBabies.json'
import config from '../config.json'


function App() {
	const [web3, setWeb3] = useState(null)
	const [openPunks, setOpenPunks] = useState(null)

	const [supplyAvailable, setSupplyAvailable] = useState(0)

	const [account, setAccount] = useState(null)
	const [networkId, setNetworkId] = useState(null)
	const [ownerOf, setOwnerOf] = useState([])

	const [explorerURL, setExplorerURL] = useState('https://etherscan.io')
	const [openseaURL, setOpenseaURL] = useState('https://opensea.io')

	const [isMinting, setIsMinting] = useState(false)
	const [isError, setIsError] = useState(false)
	const [message, setMessage] = useState(null)

	const [currentTime, setCurrentTime] = useState(new Date().getTime())
	const [revealTime, setRevealTime] = useState(0)

	const [counter, setCounter] = useState(7)
	const [isCycling, setIsCycling] = useState(false)

	const [mintCount, setMintCount] = useState(0)

	const loadBlockchainData = async (_web3, _account, _networkId) => {
		// Fetch Contract, Data, etc.
		try {
			const openPunks = new _web3.eth.Contract(BinkieBabies.abi, BinkieBabies.networks[_networkId].address)
			setOpenPunks(openPunks)

			const maxSupply = await openPunks.methods.maxSupply().call()
			const totalSupply = await openPunks.methods.totalSupply().call()
			setSupplyAvailable(maxSupply - totalSupply)

			const allowMintingAfter = await openPunks.methods.allowMintingAfter().call()
			const timeDeployed = await openPunks.methods.timeDeployed().call()
			setRevealTime((Number(timeDeployed) + Number(allowMintingAfter)).toString() + '000')

			if (_account) {
				const ownerOf = await openPunks.methods.walletOfOwner(_account).call()
				setOwnerOf(ownerOf)
				console.log(ownerOf)
			} else {
				setOwnerOf([])
			}

		} catch (error) {
			setIsError(true)
			setMessage("Contract not deployed to current network, please change network in MetaMask")
		}
	}

	const loadWeb3 = async () => {
		if (typeof window.ethereum !== 'undefined') {
			const web3 = new Web3(window.ethereum)
			setWeb3(web3)

			const accounts = await web3.eth.getAccounts()
			console.log(accounts)

			if (accounts.length > 0) {
				setAccount(accounts[0])
			} else {
				setMessage('Please connect with MetaMask')
			}

			const networkId = await web3.eth.net.getId()
			setNetworkId(networkId)

			if (networkId !== 5777) {
				setExplorerURL(config.NETWORKS[networkId].explorerURL)
				setOpenseaURL(config.NETWORKS[networkId].openseaURL)
			}

			await loadBlockchainData(web3, accounts[0], networkId)

			window.ethereum.on('accountsChanged', function (accounts) {
				setAccount(accounts[0])
				setMessage(null)
			})

			window.ethereum.on('chainChanged', (chainId) => {
				// Handle the new chain.
				// Correctly handling chain changes can be complicated.
				// We recommend reloading the page unless you have good reason not to.
				window.location.reload();
			})
		}
	}

	// MetaMask Login/Connect
	const web3Handler = async () => {
		if (web3) {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			setAccount(accounts[0])
		}
	}

	const mintNFTHandler = async () => {

		if (ownerOf.length >= 10) {
			window.alert('Woah, save some babies for the rest of us!')
			return
		}



		// Mint NFT
		if (openPunks && account) {
			setIsMinting(true)
			setIsError(false)

			await openPunks.methods.mint(mintCount).send({ from: account, value: 0 })
				.on('confirmation', async () => {
					const maxSupply = await openPunks.methods.maxSupply().call()
					const totalSupply = await openPunks.methods.totalSupply().call()
					setSupplyAvailable(maxSupply - totalSupply)

					const ownerOf = await openPunks.methods.walletOfOwner(account).call()
					setOwnerOf(ownerOf)
				})
				.on('error', (error) => {
					window.alert(error)
					setIsError(true)
				})
		}

		setIsMinting(false)
	}

	const cycleImages = async () => {
		const getRandomNumber = () => {
			const counter = (Math.floor(Math.random() * 1000)) + 1
			setCounter(counter)
		}

		if (!isCycling) { setInterval(getRandomNumber, 3000) }
		setIsCycling(true)
	}

	useEffect(() => {
		loadWeb3()
		cycleImages()
	}, [account]);

	return (
		<section id="main--container">
			<Navbar web3Handler={web3Handler} account={account} explorerURL={explorerURL} />
			<div id="content--container">
				<Home/>
				<section className="banner-container" id="mint">
					<div className="banner">
						<img src={MintBinkies}/>
						<div className="mint-content">
							<h3>Supply: 3,333</h3>
							<h3>FREE MINT</h3>
							<h3>CC0</h3>
							<h3 className="soldout">SOLD OUT!</h3>
							{/* <MintAmount setMintCount={setMintCount} />
							{isMinting ? (
								<Spinner animation="border" className='p-3 m-2' />
							) : (
								<button onClick={mintNFTHandler} className='mint-button'>Mint</button>
							)}

							{ownerOf.length > 0 &&
								<p className="view-nft"><small>View your NFT(s) on
									<a
										href={`${openseaURL}/assets/${openPunks._address}/${ownerOf[0]}`}
										target="_blank"
										style={{ display: 'inline-block', marginLeft: '3px' }}>
										OpenSea
									</a>
								</small></p>} */}
						</div>
					</div>
				</section>
				<Binkieverse/>
				<Roadmap/>
				<Team/>
				<Faq/>
				<Footer/>
			</div>
		</section>
	)
}

export default App
