import "./App.css";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { useEffect, useState } from "react";
import {getSaleNFTsScript} from "./cadence/scripts/get_sale_nfts.js";

function SaleCollection(props) {

    const [userNFTs, setUserNFTs] = useState();

    useEffect(() => {   
        if (props && props.address){
        getUserSaleNFTs();
        }
    }, []);


    const getUserSaleNFTs = async () => {
        
        const result = await fcl.send([
            fcl.script(getSaleNFTsScript),
            fcl.args([fcl.arg(props.address, t.Address)]),
        ]).then(fcl.decode);
        console.log(result);
        setUserNFTs(result);
        }
  
  return (
    <div className="nft-bg" style={{ backgroundColor: "blue" }}>
           {/* {userNFTs? Object.keys(userNFTs).map(price => ( */}
             {/* <div className="nft-container " key={price}>   */}
                    {/* <h3>{userNFTs[price].id}</h3> */}
                    {/* <h3>{userNFTs[price].ipfshash}</h3> */}
                    {/* <h3>{userNFTs[price].metadata.name}</h3> */}
                    {/* <img style={{width: "100px"}} src={`https://ipfs.io/ipfs/${userNFTs.ipfshash}`} /> */}
                    {/* <img style={{width: "100px"}} src={`https://ipfs.io/ipfs/${userNFTs.ipfshash}/${userNFTs[price].metadata.name}`} /> */}
                    {/* <img src={'https://'+userNFTs.ipfshash+'.ipfs.dweb.link/'} alt="" /> */}
             {/* </div> */}
           {/* )) : ""}          */}
           h1hii
    </div>
  );
}

export default SaleCollection;
