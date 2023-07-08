import "./App.css";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { useEffect, useState } from "react";
import { getNFTsScript } from "./cadence/scripts/get_nfts.js";

function Collection(props) {
    const [userNFTs, setUserNFTs] = useState();

    useEffect(() => {   
        if (props && props.address){
        getUserNFTs();
        }
    }, []);


    const getUserNFTs = async () => {
        const result = await fcl.send([
            fcl.script(getNFTsScript),
            fcl.args([fcl.arg(props.address, t.Address)]),
        ]).then(fcl.decode);
        console.log(result);
        setUserNFTs(result);
        }
  
  return (
    <div className="nft-bg">
           {userNFTs? userNFTs.map(userNFTs => (
            <div className="nft-container " key={userNFTs.id}>  
                {/* <img src={userNFTs.image} alt="NFT" className="nft-img" /> */}
                <div className="nft-text" >
                    <h3>{userNFTs.id}</h3>
                    <h3>{userNFTs.ipfshash}</h3>
                    <h3>{userNFTs.metadata.name}</h3>
                    {/* <img style={{width: "100px"}} src={`https://ipfs.io/ipfs/${userNFTs.ipfshash}`} /> */}
                    <img style={{width: "100px"}} src={`https://ipfs.io/ipfs/${userNFTs.ipfshash}/${userNFTs.metadata.name}`} />
                    {/* <img src={'https://'+userNFTs.ipfshash+'.ipfs.dweb.link/'} alt="" /> */}

                </div>
            </div>
           )) : ""}         
    </div>
  );
}

export default Collection;
