import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3modal from 'web3modal';
import { Button, Center, Text, Textarea } from "@mantine/core"
import constants from "../config/constants";

let web3Modal;

const providerOptions = {
    walletConnect:{
        package: WalletConnectProvider,
        options: {
            // rpc:{ 11155111: "https://sepolia.infura.io/v3/"}
            rpc:{ 8995: "https://core.bloxberg.org"}
        }
    }
}

if(typeof window != 'undefined'){
    web3Modal = new Web3modal({
        cacheProvider:false,
        providerOptions,
    })
}

export default function Connect(){

    const [hasMetamask, setHasMetamask] = useState(false);

    const [signer, setSigner] = useState(undefined);

    const [isConnected, setIsConnected] = useState(false);

    const [contract, setContract] = useState(undefined);

    const [currentUserAddress, setCurrentUserAddress] = useState('');

    const [dataToChain, setDataToChain] = useState('');

    const [dataFromChain, setDataFromChain] = useState('');

    useEffect(()=>{
        checkMetamask();

        if(isConnected){
            initialize()
        }
        
    })

    const checkMetamask = () => {
        if (typeof window.ethereum !== 'undefined'){
            setHasMetamask(true)
        }
        else{
            setHasMetamask(false)
        }
    }

    async function connect(){
        if(hasMetamask){
            const web3ModalProvider = await web3Modal.connect()
            //const provider = new ethers.providers.Web3Provider(web3ModalProvider)
            const provider = new ethers.providers.Web3Provider(web3ModalProvider);

            setSigner(provider.getSigner())
            setIsConnected(true)
        }
    }

    async function initialize (){

        console.log(constants.contractAdress)

        const contract = new ethers.Contract(constants.contractAdress, constants.abi, signer);
        const currentUserAddress = await window.ethereum.request({method: 'eth_accounts'})

        setContract(contract)
        setCurrentUserAddress(currentUserAddress)
    }

    async function sendData(){

        if(hasMetamask && isConnected){
            await contract.addItem("TestItem", currentUserAddress[0])
        }
    }

    async function getDataFromChain(){
        const response = await contract.getItemDetails(currentUserAddress[0])
        console.log(response)

        let dataArray = []

        response.forEach((data) => {

            dataArray.push(data[1])
        })

        setDataFromChain(dataArray)
    }

    return(
        <div>
        <Center style={{display: "flex", justifyContent: "center", height: '100vh'}}>
            {hasMetamask? (
                isConnected? (
                    <div>
                    <Center style={{marginBottom: '8px'}}>
                        <Textarea 
                        value={dataToChain}
                        placeholder="store your data to blockchain"
                        label = {"Add data"}
                        onChange={(event) => setDataToChain(event.currentTarget.value)}
                        />                      

                        
                    </Center>

<Button style={{marginRight: '4px'}} onClick={() => sendData()}> Send data</Button>

<Button onClick={() => getDataFromChain()}> Get data</Button>
</div>
                ): (<Button onClick={() => connect()}>
                Connect
                </Button>)                
            ): ("Download Metamask!")}
            {/* Has metamask: {JSON.stringify(hasMetamask)}
            Has connected: {JSON.stringify(isConnected)} */}

            
        </Center>

        <Center>
            <div>
                            {dataFromChain!== ''?
                                dataFromChain.map((data, index) => (
                                <div key={index}>
                                    <Text>
                                        {data.data}
                                    </Text>
                                </div>
                            )):("")}
                        </div>
        </Center>

        </div>
                
    )
}