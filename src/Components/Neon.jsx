import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import TokenCard from './TokenCard';

import { useState, useEffect } from 'react'

import { neon, neonConfig } from '@neondatabase/serverless';

neonConfig.fetchEndpoint = `http://localhost:4444/sql`;
// neonConfig.fetchEndpoint = `https://neon-preprod.sunflower.m2tec.nl/sql`;


let DATABASE_URL = 'postgres://koios:koiostest@db.localtest.me:4444/koioslite'

let address1 = 'addr_test1qqfe8ythz3nsllnux0vfuyqg75dftw65h20de96q9u9a3p9x7w7gh60mfceykp2w094jkwynpgvlv0c3yq9hzgjndvps9v0dwg'
let address2 = 'addr_test1qzkwwap78k5y7lde2efpjclxx9hxe9vv0sa5fhas92yejhgl64pl5qc8qgzzy7s2xcxjcxrxwnrp7an45efpl34d8djqjj8xcn'
let address3 = 'addr_test1qz47vcks2pruaq35g3yzp6ers592kkvvadnuazftzgtdm5texnzzrrpa6r4lzmzpwzzqeryzkn8txgnuz79cqf7643tq6crr4s'
let address4 = 'addr_test1qz759fg46yvp28wrcmnxn87xq30yj6c8mh7y40zjnrg9h546h0qr3avqde9mumdaf4gykrtjz58l30g7mpy3r8nxku7q3dtrlt'
let address5 = 'addr_test1vrk93gulcacrtwputjg4gsn2ztz8nd920hksf29ltah0txsmqssql'
let address = address4


const sql = neon(DATABASE_URL);

// const [post] = await sql`SELECT 	   
//                encode(tx.hash, 'hex'),
//                utxo_view.index,
//                utxo_view.value
//         FROM utxo_view
//         FULL OUTER JOIN tx ON utxo_view.tx_id = tx.id
//         WHERE address = 'addr_test1vrk93gulcacrtwputjg4gsn2ztz8nd920hksf29ltah0txsmqssql'
//         AND consumed_by_tx_id is NULL`;
        
// console.log(post)

// const post3 = await sql`SELECT 
// utxo_view.id,	   
// utxo_view.value as Lovelace
// FROM utxo_view
// WHERE address = 'addr_test1qzkwwap78k5y7lde2efpjclxx9hxe9vv0sa5fhas92yejhgl64pl5qc8qgzzy7s2xcxjcxrxwnrp7an45efpl34d8djqjj8xcn'
// AND consumed_by_tx_id is NULL;`;
        
// console.log(post3)

export default function Neon() {
    const [walletAdaValue, setWalletAdaValue] = useState({});
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            setWalletTotalAda(address)
            getWalletTokens(address)
        })();

    }, []);

    async function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        let address = formData.get("query")

        setWalletTotalAda(address)
    }

    async function setWalletTotalAda(address) {

        const [post3] = await sql`
        SELECT SUM(Lovelace) as Lovelace
        FROM (
        SELECT 	   
            utxo_view.value as Lovelace
        FROM utxo_view
        WHERE address = ${address}
        AND consumed_by_tx_id is NULL
        );`

        // console.log({post3})
        // console.log(typeof(post3))
        setWalletAdaValue(post3)
    }
    
    async function getWalletTokens(address) {

        const post3 = await sql`SELECT 
        encode(tx.hash, 'hex') as hash,
        utxo_view.index as index,	   
        utxo_view.value as lovelace,
        convert_from(multi_asset.name, 'UTF8') as name,
        ma_tx_mint.ident as ident,
        ma_tx_out.quantity as mint_qty,
        tx_metadata.key as metadata_key,
        tx_metadata.json as json
 FROM utxo_view
 FULL OUTER JOIN tx_metadata ON utxo_view.tx_id = tx_metadata.tx_id
 FULL OUTER JOIN tx ON utxo_view.tx_id = tx.id
 FULL OUTER JOIN ma_tx_mint ON utxo_view.tx_id = ma_tx_mint.tx_id
 FULL OUTER JOIN multi_asset ON ma_tx_mint.ident = multi_asset.id
 FULL OUTER JOIN ma_tx_out ON ma_tx_mint.ident = ma_tx_out.ident
 WHERE address = ${address}
 AND consumed_by_tx_id is NULL`

        console.log(post3)

        // post3.forEach(element => { 

        //     if (element.json === null) {
        //         console.log("No json")
        //     } else {
        //         console.log(element.json.title)
        //         // console.log(element.json)
        //     }

            
        //     if (element.name === null) {
        //         console.log("No name")
        //     } else {
        //         console.log(element.name)
        //     } 
        // })

        setData(post3)
    }


    function DataRow({ row, rowNumber}) {
        return (
            <tr >
                <td> {rowNumber} </td>
                <td > {row.hash}#{row.index} </td>
                {/* <td className='align-right'> </td> */}
                <td className='align-right'> {row.lovelace} </td>
                {/* <td className='align-right'> {JSON.stringify(row.json)} </td> */}
            <td className='align-right'> { row.json !== null ? row.json.title : ""} </td>
            </tr>
        )
    }

    return (
        <Container>
            <Row className='mb-5'>
                <Form onSubmit={handleSubmit}>
                    <Container>
                        <h6 className="text-left mt-3 mb-1">Address</h6>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control as="textarea" type="text" name="query" defaultValue={address} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Button variant="primary" type="submit">
                                Query
                            </Button>
                        </Row>
                    </Container >
                </Form >
            </Row>
            <TokenCard walletAdaValue={walletAdaValue} />

            <Row>
                <table className='utxo-container'>
                    <thead>
                        <tr>
                            <th>index</th>
                            <th className='align-center'>Hash</th>
                            {/* <th className='align-right'>id</th> */}
                            <th className='align-right'>Lovelace</th>
                            <th className='align-right'>json</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data != null ? data.map((row, index) =>
                        <DataRow
                            key={index}
                            rowNumber={index}
                            row={row} />
                    ) : null}
                    </tbody>
                </table>
            </Row>
        </Container>
    );
}

