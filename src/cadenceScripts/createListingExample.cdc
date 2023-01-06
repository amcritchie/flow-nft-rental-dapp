// https://flowscan.org/transaction/b802e45bb52a6527ee6d2485f7e2afb6dba3c358a9a16037406070d21243fbca
- Arguments: [3455123, 1.00, 10.00, 864000.0, 2592000.00, null]

import FungibleToken from 0xf233dcee88fe0abe
import NonFungibleToken from 0x1d7e57aa55817448
import FlowToken from 0x1654653399040a61

import FlowtyRentals from 0x5c57f79c6694797f
import Flowty from 0x5c57f79c6694797f

import AllDay from 0xe4cf4bdc1751c65d


transaction(listItemID: UInt64, amount: UFix64, deposit: UFix64, term: UFix64, expiresAfter: UFix64, renter: Address?) {
    let receiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
    let nftProvider: Capability<&AnyResource{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
    let storefront: &FlowtyRentals.FlowtyRentalsStorefront
    let nftReceiver: Capability<&AnyResource{NonFungibleToken.CollectionPublic}>

    prepare(acct: AuthAccount) {
    		if(acct.borrow<&FlowtyRentals.FlowtyRentalsStorefront>(from: FlowtyRentals.FlowtyRentalsStorefrontStoragePath) == nil) {
            log("Setup Account NFT storefront sorage paths")
            // Create a new empty .Storefront
            let storefront <- FlowtyRentals.createStorefront() as! @FlowtyRentals.FlowtyRentalsStorefront
            
            // save it to the account
            acct.save(<-storefront, to: FlowtyRentals.FlowtyRentalsStorefrontStoragePath)

            // create a public capability for the .Storefront
            acct.link<&FlowtyRentals.FlowtyRentalsStorefront{FlowtyRentals.FlowtyRentalsStorefrontPublic}>(FlowtyRentals.FlowtyRentalsStorefrontPublicPath, target: FlowtyRentals.FlowtyRentalsStorefrontStoragePath)
        }
        
        if acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault) == nil {
            acct.save(<-FlowToken.createEmptyVault(), to: /storage/flowTokenVault)
            acct.link<&FlowToken.Vault{FungibleToken.Receiver}>(
                /public/flowTokenReceiver,
                target: /storage/flowTokenVault
            )
            acct.link<&FlowToken.Vault{FungibleToken.Balance}>(
                /public/flowTokenBalance,
                target: /storage/flowTokenVault
            )
        }
        
        // We need a provider capability, but one is not provided by default so we create one if needed.
        let collectionProviderPrivatePath = /private/AllDayCollectionProviderForFlowtyRentalsStorefront
        let publicCollectionPath = /public/AllDayPublicCollectionFlowtyRentals
        let tokenProviderPrivatePath = /private/FlowTokenForFlowtyRentalsSmartContract
        
        let nftCollectionProviderPrivatePath = /private/AllDayCollectionProviderForFlowtyRentalsStorefront

        self.receiver = acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
        assert(self.receiver.check(), message: "Missing or mis-typed FlowToken receiver")

        if !acct.getCapability<&AllDay.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(nftCollectionProviderPrivatePath)!.check() {
					acct.unlink(nftCollectionProviderPrivatePath)
					acct.link<&AllDay.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(nftCollectionProviderPrivatePath, target: StoragePath(identifier: "AllDayNFTCollection")!)
        }

        self.nftProvider = acct.getCapability<&AnyResource{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(nftCollectionProviderPrivatePath)!
        assert(self.nftProvider.check(), message: "Missing or mis-typed AllDay.Collection provider")

        self.storefront = acct.borrow<&FlowtyRentals.FlowtyRentalsStorefront>(from: FlowtyRentals.FlowtyRentalsStorefrontStoragePath)
            ?? panic("Missing or mis-typed FlowtyRentals.FlowtyRentalsStorefront")
			
				if !acct.getCapability<&AnyResource{NonFungibleToken.CollectionPublic}>(publicCollectionPath)!.check() {
					acct.unlink(publicCollectionPath)
					acct.link<&AnyResource{NonFungibleToken.CollectionPublic}>(publicCollectionPath, target: StoragePath(identifier: "AllDayNFTCollection")!)
        }
        self.nftReceiver = acct.getCapability<&{NonFungibleToken.CollectionPublic}>(publicCollectionPath)!
        assert(self.nftReceiver.check(), message: "Missing or mis-typed AllDay.Collection")
    }

    execute {
        let paymentCut = Flowty.PaymentCut(
            receiver: self.receiver,
            amount: amount
        )

        self.storefront.createListing(
            nftProviderCapability: self.nftProvider,
            nftPublicCollectionCapability: self.nftReceiver,
            ownerFungibleTokenReceiver: self.receiver,
            nftType: Type<@AllDay.NFT>(),
            nftID: listItemID,
            amount: amount,
            deposit: deposit,
            term: term,
            paymentVaultType: Type<@FlowToken.Vault>(),
            paymentCut: paymentCut,
            expiresAfter: expiresAfter,
            renter: renter
        )
    }
}