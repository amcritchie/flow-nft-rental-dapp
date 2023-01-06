import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";

const Moment = ({address, momentId}) => {

    const [nftMetadata, setNftMetadata] = useState({badges: []}) // NEW
    const [nftProperties, setNftProperties] = useState({badges: []}) // NEW

    // Run hook on initialization and when the nftId changes.
    useEffect(() => {
        // Get NFT properties & metadata upon load.
        getNftProperties();
        getMetadata();
    }, [momentId]);

    // Get properties of NFT: id, editionId, serialNumber, mintingDate
    // https://github.com/dapperlabs/nfl-smart-contracts/blob/main/scripts/nfts/read_moment_nft_properties.cdc
    const getNftProperties = () => {
        console.log("get Properties for NFT " + momentId);
        // Cadence script returning metadata for NFT based on id
        fcl.query({
            cadence: `
                import NonFungibleToken from 0x1d7e57aa55817448
                import AllDay from 0xAllDay

                // This script returns the size of an account's AllDay collection.
                pub fun main(address: Address, id: UInt64): [AnyStruct] {
                    let account = getAccount(address)

                    let collectionRef = account.getCapability(AllDay.CollectionPublicPath)
                        .borrow<&{AllDay.MomentNFTCollectionPublic}>()
                        ?? panic("Could not borrow capability from public collection")
                    
                    let nft = collectionRef.borrowMomentNFT(id: id)
                        ?? panic("Couldn't borrow momentNFT")

                    return [nft.id, nft.editionID, nft.serialNumber, nft.mintingDate]
                }
    
                `,
                args: (arg, t) => [
                    arg(address, t.Address),    // address: Address
                    arg(momentId, t.UInt64),       // id: UInt64
                ]
                }) 
            .then(res => {
                // Process the FCL cadence response for AllDayNftMetadata
                processNftProperties(res)
            })
            .catch(err => {
                // Add erroneous nftId to responses.  This currently doesn't work correctly because erroneousNftResponses [] when pushing after each async call.
                // setErroneousNftResponses(erroneousNftResponses.push(momentId))
                console.log("Error loading metadata for NTF #" + momentId);
                // console.log(erroneousNftResponses);
            })

                    // Process the FCL cadence response for AllDayNftMetadata
        const processNftProperties = (response) => {
            // Validate response exists and has basic formatting.
            if (response && response[0]) {

                // console.log("NFT Loaded | " + momentId + " | " + response[0].name)
                console.log("NFT Properties Loaded | " + momentId + " | ")
                console.log(response)

                // Set All Day NFT normalized object.
                setNftProperties({
                    id: response[0],
                    editionID: response[1],
                    serialNumber: response[2],
                    mintingDate: response[3]
                })
            }
        } 
    }

    // Get metadata of NFT: name, description, serialNumber, thumbnail
    // https://github.com/dapperlabs/nfl-smart-contracts/blob/main/scripts/nfts/read_moment_nft_metadata.cdc
    const getMetadata = () => {
        console.log("get Metadata for NFT " + momentId);
        // Cadence script returning metadata for NFT based on id
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
                    arg(momentId, t.UInt64),       // id: UInt64
                ]
                }) 
            .then(res => {
                // Process the FCL cadence response for AllDayNftMetadata
                processNftMetadata(res)
            })
            .catch(err => {
                // Add erroneous nftId to responses.  This currently doesn't work correctly because erroneousNftResponses [] when pushing after each async call.
                // setErroneousNftResponses(erroneousNftResponses.push(momentId))
                console.log("Error loading metadata for NTF #" + momentId);
                // console.log(erroneousNftResponses);
            })
        // }
        
        // Process the FCL cadence response for AllDayNftMetadata
        const processNftMetadata = (response) => {
            // Validate response exists and has basic formatting.
            if (response && response[0]) {

                console.log("NFT Loaded | " + momentId + " | " + response[0].name)
                console.log(response)

                // Set All Day NFT normalized object.
                setNftMetadata({
                    name: response[0].name,
                    description: response[0].description,
                    thumbnail: response[0].thumbnail.url,
                    serial: response[1].infoList[0].number,
                    maxMint: response[1].infoList[0].max,
                    allDayLink: response[2].url,
                    badges: [], // Not being returned in response object.
                    rentalFeeFlow: 5, // Placeholder
                    rentalCollateralFlow: 40, // Placeholder
                    videoURL: response[0].videoURL,
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
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 truncate">

                {/* Set block circle with width and heigt */}
                <div className="mx-auto w-16 h-16 overflow-hidden rounded-full">
                    {/* Set cover image with height equivilant to zoom size */}
                    <img className="object-cover h-52 -mt-14" src={nftMetadata?.thumbnail} alt="" loading="lazy" />    
                </div>
                {nftMetadata?.name}
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
                #{nftMetadata?.serial} 
                Edition ID: {nftProperties?.editionID} 
            </div>
        </div>
     );
}
 
export default Moment;
