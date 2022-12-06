import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import LoadingBar from '../loadingBar/LoadingBar';
import Listings from '../listings/Listings';
import MomentNft from '../momentNft/MomentNft';


const Query = () => {

    const [user, setUser] = useState({loggedIn: null})
    const [name, setName] = useState("")

    const [flowResponse, setFlowResponse] = useState("");

    const [returnedProfileName, setReturnedProfileName] = useState("");
    const [inputProfileName, setInputProfileName] = useState("");
    const [transaction, setTransaction] = useState('') // NEW

    const [transactionStatus, setTransactionStatus] = useState(1) // NEW

    const [isLoading, setIsLoading] = useState(false) // NEW



    const [loading, setLoading] = useState({visible: false}) // NEW
    const [showError, setShowError] = useState(false) // NEW
    const [error, setError] = useState(null) // NEW
    // const [responseErrorDetails, setResponseErrorDetails] = useState('hello') // NEW

    const [selectedNft, setSelectedNft] = useState(0) // NEW
    const [allDayNftIds, setAllDayNftIds] = useState([]) // NEW
    const [allDayNfts, setAllDayNfts] = useState([]) // NEW
    const [flowAddress, setFlowAddress] = useState('') // NEW

    // Needed to run Cadence functions including sendQuery, initAccount, executeTransaction
    useEffect(() => fcl.currentUser.subscribe(setUser), [])

    // Update Flow Address with address passed.
    const setWallet = (address) => {
        setFlowAddress(address)
    }

    // Query All Day NFT IDs array from flowAddress
    const queryAllDayNftIds = () => {
        setError(null)
        setShowError(false)
        setLoading({visible: true})

        // Query Flow for All Day NFT IDs from flowAddress
        fcl.query({
            cadence: `
                import AllDay from 0xAllDay
                import PackNFT from 0xe4cf4bdc1751c65d
                import NonFungibleToken from 0x1d7e57aa55817448

                // The function main runs in simple query requests
                // This function returns an array of integers [UInt64]
                pub fun main(address: Address): [UInt64] {

                    // Borrowing the interface MomentNFTCollectionPublic https://flow-view-source.com/mainnet/account/0xe4cf4bdc1751c65d/contract/AllDay
                    let publicReference = getAccount(address).getCapability(AllDay.CollectionPublicPath)
                        .borrow<&{NonFungibleToken.CollectionPublic}>()
                        ?? panic("Unable to borrow Collection Public reference for recipient")

                    // Return the IDs of NFTs
                    return publicReference.getIDs()
                }
            `,
            args: (arg, t) => [
                arg(flowAddress, t.Address) // address: Address
            ]
            })
        .then(res => {
            // Successful request
            console.log("200  | All Day NFTs IDs queried from address " + flowAddress);
            setAllDayNftIds(res)
            setLoading({visible: false})
        })
        .catch(err => {
            // Failed request
            console.log("500- | All Day NFTs IDs query failed for address " + flowAddress);
            setShowError(true)
            setError(err.message)
            setLoading({visible: false})
        })
    }

    const queryAllDayNFT = (NFTId) => {
        setError(null)
        setShowError(false)
        setLoading({visible: true})

        // Sripts
        // https://github.com/dapperlabs/nfl-smart-contracts/tree/main/scripts/nfts
        fcl.query({
            cadence: `
                import AllDay from 0xAllDay
                import PackNFT from 0xe4cf4bdc1751c65d
                import NonFungibleToken from 0x1d7e57aa55817448
                import MetadataViews from 0x1d7e57aa55817448

                pub struct NFT {
                    pub let name: String
                    pub let description: String
                    pub let thumbnail: String
                    pub let owner: Address
                    pub let type: String
                    pub let externalURL: String
                    pub let storagePath: String
                    pub let publicPath: String
                    pub let privatePath: String
                    pub let collectionName: String
                    pub let collectionDescription: String
                    pub let collectionSquareImage: String
                    pub let collectionBannerImage: String
                    pub let royaltyReceiversCount: UInt32
                    pub let traitsCount: UInt32
                    pub let videoURL: String

                    init(
                            name: String,
                            description: String,
                            thumbnail: String,
                            owner: Address,
                            type: String,
                            externalURL: String,
                            storagePath: String,
                            publicPath: String,
                            privatePath: String,
                            collectionName: String,
                            collectionDescription: String,
                            collectionSquareImage: String,
                            collectionBannerImage: String,
                            royaltyReceiversCount: UInt32,
                            traitsCount: UInt32,
                            videoURL: String
                    ) {
                        self.name = name
                        self.description = description
                        self.thumbnail = thumbnail
                        self.owner = owner
                        self.type = type
                        self.externalURL = externalURL
                        self.storagePath = storagePath
                        self.publicPath = publicPath
                        self.privatePath = privatePath
                        self.collectionName = collectionName
                        self.collectionDescription = collectionDescription
                        self.collectionSquareImage = collectionSquareImage
                        self.collectionBannerImage = collectionBannerImage
                        self.royaltyReceiversCount = royaltyReceiversCount
                        self.traitsCount = traitsCount
                        self.videoURL = videoURL
                    }
                }

                pub fun main(address: Address, id: UInt64): [AnyStruct] {
                    let account = getAccount(address)
                    // let account = getAccount(0x8c48176b31d2421d)

                    let collectionRef = account.getCapability(AllDay.CollectionPublicPath)
                            .borrow<&{AllDay.MomentNFTCollectionPublic}>()
                            ?? panic("Could not borrow capability from public collection")

                    let nft = collectionRef.borrowMomentNFT(id: id)
                            ?? panic("Couldn't borrow momentNFT")

                    // Get all core views for this NFT
                    let displayView = nft.resolveView(Type<MetadataViews.Display>())! as! MetadataViews.Display
                    let editionsView = nft.resolveView(Type<MetadataViews.Editions>())! as! MetadataViews.Editions
                    let externalURLView = nft.resolveView(Type<MetadataViews.ExternalURL>())! as! MetadataViews.ExternalURL
                    let nftCollectionDataView = nft.resolveView(Type<MetadataViews.NFTCollectionData>())! as! MetadataViews.NFTCollectionData
                    let nftCollectionDisplayView = nft.resolveView(Type<MetadataViews.NFTCollectionDisplay>())! as! MetadataViews.NFTCollectionDisplay
                    let mediasView = nft.resolveView(Type<MetadataViews.Medias>())! as! MetadataViews.Medias
                    let royaltiesView = nft.resolveView(Type<MetadataViews.Royalties>())! as! MetadataViews.Royalties
                    let serialView = nft.resolveView(Type<MetadataViews.Serial>())! as! MetadataViews.Serial
                    let traitsView = nft.resolveView(Type<MetadataViews.Traits>())! as! MetadataViews.Traits

                    return [displayView, editionsView, externalURLView, mediasView, nftCollectionDisplayView, royaltiesView, serialView, traitsView]
                }
            `,
            args: (arg, t) => [
                arg(flowAddress, t.Address), // addr: Address
                // arg(user.addr, t.Address), // addr: Address
                arg(NFTId, t.UInt64)
            ]
            }) 
        .then(res => {
            console.log('-x-1');
            console.log(res);
            console.log('-x-2');
            console.log(typeof(res));
            console.log('-x-3');
            setAllDayNfts(res)
            setFlowResponse(res[0].name)
            setLoading({visible: false})
        })
        .catch(err => {
            setShowError(true)
            setError(err.message)
            setLoading({visible: false})
        })
    }

        // Github | nfl-smart-contracts | transfer_moment_nft.cdc
        // Link https://github.com/dapperlabs/nfl-smart-contracts/blob/main/transactions/user/transfer_moment_nft.cdc
        const sendSelectedNftToDapper = async () => {

            // Initialize loading and error variables
            setIsLoading(true);
            setTransactionStatus('step1')
            setError(null)
            setLoading({visible: true})

            // Cadence References
            // [Best] NFL ALL DAY sending NFT to custodial wallet | https://flowscan.org/transaction/bb1893e5f35dded7be4423fb0df7617e1c2734cbe7a67cba4ddcc317b5670520/script
            // NFL Smart Contracts Github account | https://github.com/dapperlabs/nfl-smart-contracts/blob/main/transactions/user/transfer_moment_nft.cdc
            const transactionId = await fcl.mutate({
            cadence: `
                import NonFungibleToken from 0x1d7e57aa55817448
                import AllDay from 0xe4cf4bdc1751c65d

                // this transaction transfers an NFT from one account to another.
                transaction(recipientAddress: Address, withdrawID: UInt64) {
                    prepare(signerAcct: AuthAccount) {
                        // get the recipients public account object
                        let recipientAcct = getAccount(recipientAddress)

                        // borrow a reference to the signers NFT collection
                        let signerCollectionRef = signerAcct.borrow<&{NonFungibleToken.Provider}>(from: /storage/AllDayNFTCollection)
                            ?? panic("Could not borrow a reference to the owners collection")

                        // borrow a public reference to the receivers collection
                        let depositRef = recipientAcct.getCapability(/public/AllDayNFTCollection)
                            .borrow<&{NonFungibleToken.CollectionPublic}>()!

                        // withdraw the NFT from the owners collection
                        let nft <- signerCollectionRef.withdraw(withdrawID: withdrawID)

                        // deposit the NFT in the recipients collection
                        depositRef.deposit(token: <-nft)
                    }
                }
            `,
            args: (arg, t) => [
                // arg('0x8c48176b31d2421d', t.Address),   // recipientAddress Address
                arg('0xfb3acf2dd1569a14', t.Address),   // recipientAddress Address
                arg(selectedNft, t.UInt64)              // withdrawID UInt64
                // arg(selectedNft, t.UInt64)              // withdrawID UInt64
            ],
                payer: fcl.authz,
                proposer: fcl.authz,
                authorizations: [fcl.authz],
                limit: 9999 // Never seems to effect flow in account.
            })
            .then(res => {
                setAllDayNfts(res)
                setFlowResponse(res[0].name)
                setLoading({visible: false})
            })
            .catch(err => {
                console.log('Flow Mutate Error ==========| ');
                console.log(err);
                console.log('Flow Mutate Error ==========| ');
                console.log(err.message);
                console.log('Flow Mutate Error ==========| ');
                setShowError(true)
                setError(err.message)
                setLoading({visible: false})
            })
    
            fcl.tx(transactionId).subscribe(res => setTransactionStatus(res.status))
            setLoading({visible: false})
        }


        const handleRentListing = (nftSerial) => {

        }

        // [Mutate] Mutate Profile name 
        const executeTransaction = async () => {

            setIsLoading(true);
            setTransactionStatus('step1')
    
            setError(null)
            setLoading({visible: true})
            const transactionId = await fcl.mutate({
            cadence: `
                import Profile from 0xProfile
    
                transaction(name: String) {
                prepare(account: AuthAccount) {
                    account
                    .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
                    .setName(name)
                }
                }
            `,
            args: (arg, t) => [arg(inputProfileName, t.String)],
            // args: (arg, t) => [arg("Flow Developer!", t.String)],
            payer: fcl.authz,
            proposer: fcl.authz,
            authorizations: [fcl.authz],
            limit: 50
            })
    
            fcl.tx(transactionId).subscribe(res => setTransactionStatus(res.status))
            setLoading({visible: false})
        }

        const [listings, setListings] = useState([
            { name: 'Tom Brady', rentalFeeFlow: 5.0, rentalCollateralFlow: 200.0, serial: 3001, nftSerial: 577428, series: "Series 1", set: 'Base', badges: ['allDayDebut'], imageUrl: "https://assets.nflallday.com/editions/base/98f4d11a-d28c-43f6-b5b1-27c1fe6c86bf/play_98f4d11a-d28c-43f6-b5b1-27c1fe6c86bf_base_capture_Hero_Trans_2880_2880_Transparent.png" },
            { name: 'Micah Parsons', rentalFeeFlow: 15.0, rentalCollateralFlow: 700.0, serial: 140, nftSerial: 686473, series: "Series 1", set: 'In the Trenches', badges: ['rookieYear', 'rookieMint', 'allDayDebut'], imageUrl: "https://assets.nflallday.com/resize/editions/in_the_trenches/ea71ab97-5e26-4369-b609-adfde141d69f/play_ea71ab97-5e26-4369-b609-adfde141d69f_in_the_trenches_capture_Hero_Black_2880_2880_Black.png" },
            { name: 'Patrick Mahomes II', rentalFeeFlow: 35.0, rentalCollateralFlow: 1500.0, serial: 350, nftSerial: 688081, series: "Series 1", set: 'Launch Codes', badges: ['allDayDebut'], imageUrl: "https://assets.nflallday.com/editions/launch_codes/64d00c8c-3b4b-42b5-8885-ffc34b615ad3/play_64d00c8c-3b4b-42b5-8885-ffc34b615ad3_launch_codes_capture_Hero_Trans_2880_2880_Transparent.png" }
        ]);

    
        const handleDeleteListing = (nftSerial) => {
            const newListings = listings.filter(listing => listing.nftSerial !== nftSerial);
            setListings(newListings);
        }

    return ( 
        <div className="query">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                <div className="flex items-center">
                    <button onClick={() => setWallet('0x8c48176b31d2421d')} type="button" className="text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Set Wallet ..2421d</button>
                    <button onClick={() => setWallet('0xfb3acf2dd1569a14')} type="button" className="text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Set Wallet ..69a14</button>
                    <button onClick={queryAllDayNftIds} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Query All Day NFT IDs</button>
                    <button onClick={sendSelectedNftToDapper} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Send Selected NFT to ..2421d</button>
                </div>
                <div className="flex items-center">
                    Wallet: {flowAddress}
                    Selected NFT: {selectedNft}
                </div>
            </div>
            
            <form onSubmit={executeTransaction}>
                <label for="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
                <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onChange={(e) => setInputProfileName(e.target.value)} type="search" id="search" name="search" placeholder="Search" required className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                {inputProfileName !== "" ? (
                    <button onClick={executeTransaction} type="button" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Profile Name</button>
                ) : "" }
                </div>
            </form>
            
            <br />
            {isLoading &&
                <LoadingBar observedStatus={transactionStatus} loadingType='flow-transaction' />
            }

            <br /><br />

            {transactionStatus && <div>{transactionStatus}</div> }
            {loading?.visible && <div>Loading ...</div> }
            { error &&
            <div>
                <br />
            <a href="#" className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Request Error
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                {error}
                </p>
            </a>
            </div>
            }

            {allDayNftIds.map((id) => (
                <MomentNft address={flowAddress} nftId={id} setSelectedNft={setSelectedNft} />
            ))}
        </div>
     );
}
 
export default Query;