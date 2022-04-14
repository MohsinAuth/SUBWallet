import { MnemonicKey } from "@terra-money/terra.js";
import express from "express";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
