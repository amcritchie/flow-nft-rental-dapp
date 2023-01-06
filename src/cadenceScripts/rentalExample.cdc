// https://flowscan.org/transaction/a33569f1924e44e0b6b07adb6605ae4214a23359c7f1964438386cf6b5a38800/script
- Arguments: [795398478, 0x52676d61dedd0ba2, true]

import FungibleToken from 0xf233dcee88fe0abe
import NonFungibleToken from 0x1d7e57aa55817448
import MetadataViews from 0x1d7e57aa55817448
import FlowToken from 0x1654653399040a61
import FlowtyRentals from 0x5c57f79c6694797f

import TopShot from 0x0b2a3299cc857e29


transaction(listingResourceID: UInt64, flowtyStorefrontAddress: Address, autoReturn: Bool) {
    let paymentVault: @FungibleToken.Vault
    let storefront: &amp;FlowtyRentals.FlowtyRentalsStorefront{FlowtyRentals.FlowtyRentalsStorefrontPublic}
    let listing: &amp;FlowtyRentals.Listing{FlowtyRentals.ListingPublic}

    let tokenReceiver: Capability&lt;&amp;{FungibleToken.Receiver}&gt;
    let nftReceiver: Capability&lt;&amp;AnyResource{NonFungibleToken.CollectionPublic}&gt;
    let provider: Capability&lt;&amp;AnyResource{NonFungibleToken.CollectionPublic, NonFungibleToken.Provider}&gt;?

    prepare(acct: AuthAccount) {
    		if(acct.borrow&lt;&amp;FlowtyRentals.FlowtyRentalsStorefront&gt;(from: FlowtyRentals.FlowtyRentalsStorefrontStoragePath) == nil) {
            log("Setup Account NFT storefront sorage paths")
            // Create a new empty .Storefront
            let storefront &lt;- FlowtyRentals.createStorefront() as! @FlowtyRentals.FlowtyRentalsStorefront
            
            // save it to the account
            acct.save(&lt;-storefront, to: FlowtyRentals.FlowtyRentalsStorefrontStoragePath)

            // create a public capability for the .Storefront
            acct.link&lt;&amp;FlowtyRentals.FlowtyRentalsStorefront{FlowtyRentals.FlowtyRentalsStorefrontPublic}&gt;(FlowtyRentals.FlowtyRentalsStorefrontPublicPath, target: FlowtyRentals.FlowtyRentalsStorefrontStoragePath)
        }
        
        // ensure collection exists
        if acct.borrow&lt;&amp;NonFungibleToken.Collection&gt;(from: StoragePath(identifier: "MomentCollection")!) == nil {
					// create a new Collection
					let collection &lt;- TopShot.createEmptyCollection()
					
						// Put the new Collection in storage
						acct.save(&lt;-collection, to: StoragePath(identifier: "MomentCollection")!)
	
						// create a public capability for the collection
						acct.link&lt;&amp;{TopShot.MomentCollectionPublic,NonFungibleToken.Provider,NonFungibleToken.Receiver,NonFungibleToken.CollectionPublic,MetadataViews.ResolverCollection}&gt;(PublicPath(identifier: "MomentCollection")!, target: StoragePath(identifier: "MomentCollection")!)
				}

				self.storefront = getAccount(flowtyStorefrontAddress)
            .getCapability&lt;&amp;FlowtyRentals.FlowtyRentalsStorefront{FlowtyRentals.FlowtyRentalsStorefrontPublic}&gt;(
                FlowtyRentals.FlowtyRentalsStorefrontPublicPath
            ).borrow()
            ?? panic("Could not borrow FlowtyRentalsStorefront from provided address")

        self.listing = self.storefront.borrowListing(listingResourceID: listingResourceID)
                    ?? panic("No Listing with that ID in FlowtyRentalsStorefront. Already rented or delisted.")
        let price = self.listing.getDetails().amount

        let vault = acct.borrow&lt;&amp;FlowToken.Vault&gt;(from: /storage/flowTokenVault)
            ?? panic("Cannot borrow FlowToken vault from acct storage")

        let paymentAmount = self.listing.getDetails().getTotalPayment()
        self.paymentVault &lt;- vault.withdraw(amount: paymentAmount)

        self.tokenReceiver = acct.getCapability&lt;&amp;FlowToken.Vault{FungibleToken.Receiver}&gt;(/public/flowTokenReceiver)
        assert(self.tokenReceiver.check(), message: "Missing or mis-typed FlowToken receiver")

				let publicCollectionPath = /public/TopShotCollectionFlowty
        if !acct.getCapability&lt;&amp;AnyResource{NonFungibleToken.CollectionPublic}&gt;(publicCollectionPath).check() {
        		acct.unlink(publicCollectionPath)
            acct.link&lt;&amp;AnyResource{NonFungibleToken.CollectionPublic}&gt;(publicCollectionPath, target: StoragePath(identifier: "MomentCollection")!)
        }
        self.nftReceiver = acct.getCapability&lt;&amp;{NonFungibleToken.CollectionPublic}&gt;(publicCollectionPath)
        assert(self.nftReceiver.check(), message: "Missing or mis-typed TopShot.Collection")

        var provider: Capability&lt;&amp;AnyResource{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}&gt;? = nil
        if autoReturn {
            let nftCollectionProviderPath = /private/TopShotCollectionProviderForFlowtyStorefront
            if !acct.getCapability&lt;&amp;{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}&gt;(nftCollectionProviderPath)!.check() {
            		acct.unlink(nftCollectionProviderPath)
                acct.link&lt;&amp;{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}&gt;(nftCollectionProviderPath, target: StoragePath(identifier: "MomentCollection")!)
            }

            provider = acct.getCapability&lt;&amp;AnyResource{NonFungibleToken.CollectionPublic, NonFungibleToken.Provider}&gt;(nftCollectionProviderPath)!
            assert(provider!.check(), message: "Missing or mis-typed TopShot provider")
        }
        self.provider = provider
    }

    execute {
        self.listing.rent(
            payment: &lt;-self.paymentVault,
            renterFungibleTokenReceiver: self.tokenReceiver,
            renterNFTCollection: self.nftReceiver,
            renterNFTProvider: self.provider
        )
    }
}