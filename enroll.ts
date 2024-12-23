//WBAQSygkwMox2VuWKU133NxFrpDZUBdvSBeaBEue2Jq
import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import { Program, Wallet, AnchorProvider, Idl } from "@coral-xyz/anchor"
import { IDL } from "./programs/wba_prereq";
import wallet from "./wba-wallet.json"


// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a devnet connection
const connection = new Connection("https://api.devnet.solana.com");

// Github account
const github = Buffer.from("bgraokmush", "utf8");

const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment: "confirmed" });

const program: Program<Idl> = new Program(IDL, provider);


// Create the PDA for our enrollment account
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);


(async () => {
    try {
        const txhash = await program.methods
            .complete(github)
            .accounts({
                signer: keypair.publicKey,
            })
            .signers([
                keypair
            ]).rpc();
        console.log(`Success! Check out your TX here: 
      https://explorer.solana.com/tx/${txhash}?cluster=devnet`);

    } catch (error) {
        console.error(`Oops, something went wrong: ${error}`)
    }
})()