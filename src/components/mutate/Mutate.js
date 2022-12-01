import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import LoadingBar from '../loadingBar/LoadingBar';

const Mutate = () => {
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

    // Needed to run Cadence functions including sendQuery, initAccount, executeTransaction
    useEffect(() => fcl.currentUser.subscribe(setUser), [])

    const getNFTIDs = () => {
        setError(null)
        setShowError(false)
        setLoading({visible: true})

        fcl.query({
            cadence: `
                import AllDay from 0xAllDay
                import PackNFT from 0xe4cf4bdc1751c65d
                import NonFungibleToken from 0x1d7e57aa55817448

                pub fun main(addr: Address): [UInt64] {

                    let publicReference = getAccount(addr).getCapability(AllDay.CollectionPublicPath)
                        .borrow<&{NonFungibleToken.CollectionPublic}>()
                        ?? panic("Unable to borrow Collection Public reference for recipient")

                    return publicReference.getIDs()
                }
            `,
            args: (arg, t) => [
                arg(user.addr, t.Address) // addr: Address
            ]
            })
        .then(res => {
            setFlowResponse(res)
            setLoading({visible: false})
        })
        .catch(err => {
            setShowError(true)
            setError(err.message)
            setLoading({visible: false})
        })
    }


    const getOtherNFTIDs = () => {
        setError(null)
        setShowError(false)
        setLoading({visible: true})

        fcl.query({
            cadence: `
                import AllDay from 0xAllDay
                import PackNFT from 0xe4cf4bdc1751c65d
                import NonFungibleToken from 0x1d7e57aa55817448

                // The function main runs in simple query requests
                // This function returns an array of integers [UInt64]
                pub fun main(addr: Address): [UInt64] {

                    // Borrowing the interface MomentNFTCollectionPublic https://flow-view-source.com/mainnet/account/0xe4cf4bdc1751c65d/contract/AllDay
                    let publicReference = getAccount(0x8c48176b31d2421d).getCapability(AllDay.CollectionPublicPath)
                        .borrow<&{NonFungibleToken.CollectionPublic}>()
                        ?? panic("Unable to borrow Collection Public reference for recipient")

                    // Return the IDs of NFTs
                    return publicReference.getIDs()
                }
            `,
            args: (arg, t) => [
                arg(user.addr, t.Address) // addr: Address
            ]
            })
        .then(res => {
            console.log('-x-1');
            console.log(res);
            console.log('-x-2');
            setFlowResponse(res)
            setLoading({visible: false})
        })
        .catch(err => {
            setShowError(true)
            setError(err.message)
            setLoading({visible: false})
        })
    }


    const borrowNFT = () => {
        setError(null)
        setShowError(false)
        setLoading({visible: true})

        // NFT functions Line 510 https://flow-view-source.com/mainnet/account/0xe4cf4bdc1751c65d/contract/AllDay
        // pub let id: UInt64
        // pub let editionID: UInt64
        // pub let serialNumber: UInt64
        // pub let mintingDate: UFix64

        fcl.query({
            cadence: `
                import AllDay from 0xAllDay
                import PackNFT from 0xe4cf4bdc1751c65d
                import NonFungibleToken from 0x1d7e57aa55817448

                // The function main runs in simple query requests
                pub fun main(addr: Address): [UInt64] {


                    // let account = getAccount(0xfb3acf2dd1569a14)

                    // let collectionRef = account.getCapability(AllDay.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>()
                    //     ?? panic("Could not borrow capability from public collection")
                    
                    // return collectionRef.getIDs()



                    // Borrowing the interface MomentNFTCollectionPublic https://flow-view-source.com/mainnet/account/0xe4cf4bdc1751c65d/contract/AllDay
                    // let publicReference = getAccount(0x8c48176b31d2421d)
                    let publicReference = getAccount(0xfb3acf2dd1569a14)
                        .getCapability(AllDay.CollectionPublicPath)
                        .borrow<&{NonFungibleToken.CollectionPublic}>()
                        ?? panic("Unable to borrow Collection Public reference for recipient")

                    // Return the IDs of NFTs
                    return publicReference.borrowNFT(id: 3334353).id
                    // return publicReference.borrowNFT(id: 3334353).id
                    // return publicReference.borrowMomentNFT(id: 3334353).id

                    
                    // return publicReference.borrowMomentNFT(id: 3334353)
                }
            `,
            args: (arg, t) => [
                arg(user.addr, t.Address) // addr: Address
            ]
            })
        .then(res => {
            console.log('-x-1');
            console.log(res);
            console.log('-x-2');
            setFlowResponse(res)
            setLoading({visible: false})
        })
        .catch(err => {
            setShowError(true)
            setError(err.message)
            setLoading({visible: false})
        })
    }

    const detailsNFT = () => {
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
                
                // import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
                // import AllDay from "../../contracts/AllDay.cdc"
                // import MetadataViews from "../../contracts/MetadataViews.cdc"

                // This script returns the size of an account's AllDay collection.
                pub fun main(address: Address, id: UInt64): [AnyStruct] {
                    let account = getAccount(address)

                    let collectionRef = account.getCapability(AllDay.CollectionPublicPath)
                        .borrow<&{AllDay.MomentNFTCollectionPublic}>()
                        ?? panic("Could not borrow capability from public collection")
                    
                    let nft = collectionRef.borrowMomentNFT(id: 3334353)
                        ?? panic("Couldn't borrow momentNFT")

                    return [nft.id, nft.editionID, nft.serialNumber, nft.mintingDate]
                }
            `,
            args: (arg, t) => [
                arg(user.addr, t.Address), // addr: Address
                arg(3334353, t.UInt64)
            ]
            })
        .then(res => {
            console.log('-x-1');
            console.log(res);
            console.log('-x-2');
            setFlowResponse(res)
            setLoading({visible: false})
        })
        .catch(err => {
            setShowError(true)
            setError(err.message)
            setLoading({visible: false})
        })
    }



    const metadataNFT = () => {
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

                    let collectionRef = account.getCapability(AllDay.CollectionPublicPath)
                            .borrow<&{AllDay.MomentNFTCollectionPublic}>()
                            ?? panic("Could not borrow capability from public collection")

                    let nft = collectionRef.borrowMomentNFT(id: 3334353)
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



                
                // // import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
                // // import AllDay from "../../contracts/AllDay.cdc"
                // // import MetadataViews from "../../contracts/MetadataViews.cdc"

                // // This script returns the size of an account's AllDay collection.
                // pub fun main(address: Address, id: UInt64): [AnyStruct] {
                //     let account = getAccount(address)

                //     let collectionRef = account.getCapability(AllDay.CollectionPublicPath)
                //         .borrow<&{AllDay.MomentNFTCollectionPublic}>()
                //         ?? panic("Could not borrow capability from public collection")
                    
                //     let nft = collectionRef.borrowMomentNFT(id: 3334353)
                //         ?? panic("Couldn't borrow momentNFT")

                //     return [nft.id, nft.editionID, nft.serialNumber, nft.mintingDate]
                // }
            `,
            args: (arg, t) => [
                arg(user.addr, t.Address), // addr: Address
                arg(3334353, t.UInt64)
            ]
            })
        .then(res => {
            console.log('-x-1');
            console.log(res);
            console.log('-x-2');
            setFlowResponse(res[0].name)
            setLoading({visible: false})
        })
        .catch(err => {
            setShowError(true)
            setError(err.message)
            setLoading({visible: false})
        })
    }

    
    // [Query] Query Profile Name
    const sendQuery = async () => {
        setError(null)
        setLoading({visible: true})

        // Import Profile resource 0xProfile wallet passing Address as an input
        const profile = await fcl.query({
        cadence: `
            // import Profile from 0xProfile
            import AllDay from 0xAllDay
            import DapperWallet from 0xDapperWallet
            import BloctoWallet from 0xBloctoWallet

            pub fun main() {
                let helloAccount = getAccount(DapperWallet)

                // let helloCapability = helloAccount.getCapability<&HelloWorld.HelloAsset>(/public/Hello)

                let helloCapability = helloAccount.getCapability<&AllDay.NFT>(/public/119537)

                let helloReference = helloCapability.borrow()
                    ?? panic("Could not borrow")

                // return helloReference.hello()

                return helloReference.getViews()
            }
            // pub fun main(address: Address): Profile.ReadOnly? {
            /// return Profile.read(address)
            // }
        `,
        args: (arg, t) => [arg(user.addr, t.Address)]
        })
        setReturnedProfileName(profile?.name ?? 'No Profile')
        setLoading({visible: false})
    }


    const sendQueryThenError = () => {
        setError(null)
        setShowError(true)
        setLoading({visible: true})
        // Set Loading Variable
        setIsLoading(true)
        // Send query with bad profile 0xProfile => 0xBadProfile
        fcl.query({
            cadence: `
                import Profile from 0xBadProfile
    
                pub fun main(address: Address): Profile.ReadOnly? {
                return Profile.read(address)
                }
            `,
            args: (arg, t) => [
                arg(user.addr, t.Address)
            ]
            })
        .then(res => {
            // This won't trigger because the request is bad
            setReturnedProfileName(res?.name ?? 'No Profile')
            // Set Loading Variable
            setLoading({visible: false})
        })
        .catch(err => {
            setShowError(true)
            setError(err.message)
            setLoading({visible: false})
        })
    }

    // [Mutate] Initialize Account 
    // For our ccount to have a profile, we need to create a resouce in our account youtube 18:00
    const initAccount = async () => {
        setError(null)
        setLoading({visible: true})
        const transactionId = await fcl.mutate({
        cadence: `
            // import Profile from 0xProfile
            import AllDay from 0xAllDay
            import DapperWallet from 0xDapperWallet
            import BloctoWallet from 0xBloctoWallet

            transaction {
            prepare(account: AuthAccount) {



                // let helloResource <- account.load<@AllDay.NFT>(from: /storage/)

                // return helloResource.getViews()

                // // Only initialize the account if it hasn't already been initialized
                // if (!Profile.check(account.address)) {
                // // This creates and stores the profile in the user's account
                // account.save(<- Profile.new(), to: Profile.privatePath)

                // // This creates the public capability that lets applications read the profile's info
                // account.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
                }
            }
            }
        `,
        payer: fcl.authz,
        proposer: fcl.authz,
        authorizations: [fcl.authz],
        limit: 1
        })
        // const transactionId = await fcl.mutate({
        //     cadence: `
        //         import Profile from 0xProfile
    
        //         transaction {
        //         prepare(account: AuthAccount) {
        //             // Only initialize the account if it hasn't already been initialized
        //             if (!Profile.check(account.address)) {
        //             // This creates and stores the profile in the user's account
        //             account.save(<- Profile.new(), to: Profile.privatePath)
    
        //             // This creates the public capability that lets applications read the profile's info
        //             account.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
        //             }
        //         }
        //         }
        //     `,
        //     payer: fcl.authz,
        //     proposer: fcl.authz,
        //     authorizations: [fcl.authz],
        //     limit: 50
        // })

        const transaction = await fcl.tx(transactionId).onceSealed()

        console.log(transaction)
        console.log(transaction.events[0]);
        console.log(transaction.events[0].transactionId);

        setTransaction(transaction.events[0].transactionId ?? 'No Profile')
        fcl.tx(transactionId).subscribe(res => setTransactionStatus(res.status))
        setLoading({visible: false})
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

    return ( 
        <div className="updateProfile">
            
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                <div className="flex items-center">
                    <button onClick={getNFTIDs} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Account NFT IDs</button>
                    <button onClick={getOtherNFTIDs} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Other NFT IDs</button>
                    <button onClick={borrowNFT} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Borrow NFT</button>
                    <button onClick={detailsNFT} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Details NFT</button>
                    <button onClick={metadataNFT} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Metadata NFT</button>
                    <button onClick={sendQuery} type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Query</button>
                    <button onClick={sendQueryThenError} type="button" className="text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Request Error</button>
                    <button onClick={initAccount} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Init Account</button>
                </div>
                <div className="flex items-center">
                    Profile: {returnedProfileName} {flowResponse}
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
    
        </div>
     );
}
 
export default Mutate;

