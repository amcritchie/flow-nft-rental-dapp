import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import flowLogo from '../../assets/flowLogo.png';

const MomentNft = ({address, nftId, setSelectedNft}) => {

    // const [selectedNft, setSelectedNft] = useState(0) // NEW
    const [allDayNft, setAllDayNft] = useState({badges: []}) // NEW
    const [erroneousNftResponses, setErroneousNftResponses] = useState([]) // NEW

    // Run hook on initialization and when the nftId changes.
    useEffect(() => {
        // console.log("Selected NFTxx: #")
        // Get AllDayNfts metadata upon load.
        getMetadata();
    }, [nftId]);

    // console.log("Selected NFTxx: #")

    const selectMoment = () => {

        // nftId = nftId

        console.log("Selected NFT: #" + nftId)

        setSelectedNft(nftId)
        // Send NFT to Dapper Wallet ..421d
        // fcl.mutate
    }
    const sendToDapper = () => {
        // Send NFT to Dapper Wallet ..421d
        // fcl.mutate
    }

    // Get and process metadata for NFT with id nftId 
    const getMetadata = () => {
        console.log("Selected NFTyy: #")
        // Cadence script returning metadata for NFT with id nftId 
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

                    // get the recipients public account object
                    let account = getAccount(address)    

                    // Get Collection Reference for All Day NFT based on passed id
                    let collectionRef = account.getCapability(AllDay.CollectionPublicPath)
                            .borrow<&{AllDay.MomentNFTCollectionPublic}>()
                            ?? panic("Could not borrow capability from public collection")

                    // Borrow All Day NFT
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
                    arg(address, t.Address),    // address: Address
                    arg(nftId, t.UInt64),       // id: UInt64
                ]
                }) 
            .then(res => {
                // Process the FCL cadence response for AllDayNftMetadata
                processNftResponce(res)
            })
            .catch(err => {
                // Add erroneous nftId to responses.  This currently doesn't work correctly because erroneousNftResponses [] when pushing after each async call.
                setErroneousNftResponses(erroneousNftResponses.push(nftId))
                console.log("Error loading metadata for NTF #" + nftId);
                console.log(erroneousNftResponses);
            })
        // }
        
        // Process the FCL cadence response for AllDayNftMetadata
        const processNftResponce = (response) => {
            // Validate response exists and has basic formatting.
            if (response && response[0]) {

                console.log("NFT Loaded | " + nftId + " | " + response[0].name)

                // Set All Day NFT normalized object.
                setAllDayNft({
                    name: response[0].name,
                    description: response[0].description,
                    thumbnail: response[0].thumbnail.url,
                    serial: response[1].infoList[0].number,
                    maxMint: response[1].infoList[0].max,
                    allDayLink: response[2].url,
                    badges: [], // Not being returned in response object.
                    rentalFeeFlow: 5, // Placeholder
                    rentalCollateralFlow: 40, // Placeholder
                    image1: response[3].items[0].file.url,
                    image2: response[3].items[1].file.url,
                    image3: response[3].items[2].file.url,
                    image4: response[3].items[3].file.url,
                    image5: response[3].items[4].file.url,
                    // image6: response[3].items[5].file.url,
                    // image7: response[3].items[6].file.url,
                    // image8: response[3].items[7].file.url,
                    // image9: response[3].items[8].file.url
                })
            }
        }        
    }

    return ( 
        <div className="momentNft">
            { allDayNft?.name && // Load Flow wallet when ready.
                <div className="flex p-6 font-mono">
                <div className="flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-teal-400">
                <img src={allDayNft.thumbnail} alt="" className="absolute z-10 inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
                </div>
                <form className="flex-auto pl-6">
                <div className="relative flex flex-wrap items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
                    <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
                        {allDayNft.name} 
                        #  
                        {allDayNft?.serial} 
                        {allDayNft.badges.map((badge) => (
                            <img src={badge[badge]} className="inline h-6 w-6 ml-1" alt="logo" />
                        ))}
                   </h1>
                   <div className="relative flex items-center text-lg text-white">
                       Rent: {allDayNft.rentalFeeFlow} 
                       <img src={flowLogo} className="h-4 w-4 ml-1" alt="logo" />
                   </div>
                   <div className="relative flex items-center uppercase text-teal-400 ml-3">
                       Collateral: {allDayNft.rentalCollateralFlow}
                       <img src={flowLogo} className="h-4 w-4 ml-1" alt="logo" />
                   </div>
               </div>
               <div className="flex items-baseline my-6">
                   <div className="space-x-3 flex text-sm font-medium">
                   <label>
                       <input className="sr-only peer" name="size" type="radio" value="xs" defaultChecked />
                        <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                        XS
                        </div>
                    </label>
                    <label>
                        <input className="sr-only peer" name="size" type="radio" value="s" />
                        <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                        S
                        </div>
                    </label>
                    <label>
                        <input className="sr-only peer" name="size" type="radio" value="m" />
                        <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                        M
                        </div>
                    </label>
                    <label>
                        <input className="sr-only peer" name="size" type="radio" value="l" />
                        <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                        L
                        </div>
                    </label>
                    <label>
                        <input className="sr-only peer" name="size" type="radio" value="xl" />
                        <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                        XL
                        </div>
                    </label>
                    </div>
                </div>
                <div className="flex space-x-2 mb-4 text-sm font-medium">
                    <div className="flex space-x-4">
                        <button 
                        onClick={selectMoment}
                        type="button"
                        className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
                        >
                            Select Moment
                        </button>
                        <button 
                        // onClick={() => handleDeleteListing(allDayNft.nftSerial)}
                        type="button"
                        className="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900"
                        >
                            Delete Listing
                        </button>
                        </div>
                            <button className="flex-none flex items-center justify-center w-12 h-12 text-black" type="button" aria-label="Like">
                                <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                                   <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-xs leading-6 text-slate-500">
                            {allDayNft?.name} {allDayNft?.serial} {allDayNft?.image1}
                        </p>
                    </form>
                </div>
            }
        </div>
     );
}
 
export default MomentNft;