import * as fcl from "@onflow/fcl";
import { useState, useEffect } from "react";
import Moment from '../moment/Moment';

import { useAuth } from '../../providers/AuthProvider'


const MyMoments = () => {
    const { user } = useAuth()

    const [momentIds, setMomentIds] = useState([])

    useEffect(() => {
        // Query IDs of All Day Moments for authed user.
        queryAllDayMomentIds();
    },[])

      // Query All Day NFT IDs array from flowAddress
      const queryAllDayMomentIds = () => {

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
                arg(user.addr, t.Address) // address: Address
            ]
            })
        .then(res => {
            // Successful request
            console.log("Successful request")
            setMomentIds(res);
        })
        .catch(err => {
            // Failed request
            console.log("Failed request")
        })
    }

  return (

    <div className="MyMoment">
        <div className="container mx-auto bg-blue-200">
            <h1>
                My Moments
                <button onClick={queryAllDayMomentIds} type="button" className="ml-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Query All Day NFT IDs</button>
            </h1>
            
            <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
                {momentIds.map((momentId) => (
                    <Moment address={user?.addr} momentId={momentId}/>
                ))}

                <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                    <div className="text-sm font-medium text-gray-500 truncate">

                        {/* Set block circle with width and heigt */}
                        <div className="mx-auto w-16 h-16 overflow-hidden rounded-full">
                            {/* Set cover image with height equivilant to zoom size */}
                            <img className="object-cover h-52 -mt-14" src="https://assets.nflallday.com/resize/editions/in_the_trenches/ea71ab97-5e26-4369-b609-adfde141d69f/play_ea71ab97-5e26-4369-b609-adfde141d69f_in_the_trenches_capture_Hero_Black_2880_2880_Black.png" alt="" loading="lazy" />    
                        </div>
                        Micah Parsons
                    </div>

                    <div className="mt-1 text-3xl font-semibold text-gray-900">
                        12,00
                    </div>
                </div>
                   
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                    <div className="text-sm font-medium text-gray-500 truncate">
                        Total Orders
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-gray-900">
                        20k
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyMoments;