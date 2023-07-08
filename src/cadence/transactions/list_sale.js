export const listForSaleTx= `
import ConnectNFT from 0x3aeeb4de672c74b1
import NonFungibleToken from 0x631e88ae7f1d7c20
import NFTMarketplace from 0x3aeeb4de672c74b1
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

transaction(id: UInt64, price:UFix64) {

  prepare(acct: AuthAccount) {
   let saleCollection = acct.borrow<&NFTMarketplace.SaleCollection>(from: /storage/MySaleCollection)
                            ?? panic("this SaleCollection does not exist")

    saleCollection.listForSale(id: id, price:price)                       
  }

  execute {
    log("user listed their nft for sales")
  }
}

`