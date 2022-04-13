import {
    MnemonicKey,
    LCDClient,
    MsgExecuteContract,
} from "@terra-money/terra.js";
import express from "express";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const terra = new LCDClient({
//     URL: "https://bombay-lcd.terra.dev/",
//     chainID: "bombay-12",
// });

// const wallet = terra.wallet(MNE_KEY_RANDOM);

// const execute = new MsgExecuteContract(
//     wallet.key.accAddress, // sender
//     "terra1ec4vxhuh8jpmqsu4ermsc9zvt6mx3z0pqtdktj", // contract account address
//     { create_account: {} }, // handle msg
//     { uusd: 200000 } // coins
// );

// async function create() {
//     const executeTx = await wallet.createAndSignTx({
//         msgs: [execute],
//     });

//     const executeTxResult = await terra.tx.broadcast(executeTx);
//     console.log(executeTxResult);
// }
// create();

app.get("/createWallet", async (_req, res) => {
    const client = new MongoClient(
        "mongodb+srv://mqAuth:3rpgzKtSYt7PvVTN@cluster0.iyzkd.mongodb.net/"
    );
    await client.connect();
    const random = new MnemonicKey();
    client.db("TerraWallets").collection("Waletts").insertOne({
        mnemonic: random.mnemonic,
        address: random.accAddress,
    });
    res.status(200).json({ address: random.accAddress });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.debug(`Server is running on port ${PORT}`);
});
