// 0xc02155946dd8C89D3D3238A6c8A64D04E2CD4500
import { ethers, run } from "hardhat";

export async function verifyContract(
  contract: string,
  constructorArguments: any[] = []
) {
  if (process.env.ETHERSCAN_API_KEY) {
    try {
      console.info("Verifying", contract, constructorArguments);
      const verify = await run("verify:verify", {
        address: contract,
        constructorArguments,
      });
      console.log(contract, " verify successfully");
    } catch (error) {
      console.log(
        "....................",
        contract,
        " error start............................",
        "\n",
        error,
        "\n",
        "....................",
        contract,
        " error end............................"
      );
    }
  }
}

const FEE_RECIEVER = "0x15fA5b666a513144995131006F4cb50e02C0f6D5";
// const WETH = "0x4200000000000000000000000000000000000006";
const WETH = "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83";
const SFSAddress = "0x8680CEaBcb9b56913c519c069Add6Bc3494B7020";
async function main() {
  const KimAdapter = await ethers.getContractFactory("KimAdapter");
  const kimAdapter = await KimAdapter.deploy(
    "KimAdapter",
    // "0xc02155946dd8C89D3D3238A6c8A64D04E2CD4500",
    "0x152eE697f2E276fA89E96742e9bB9aB1F2E61bE3",
    25,
    215000
  );
  await kimAdapter.deployed();
  // const adapterRegistration = await kimAdapter.register(
  //   SFSAddress,
  //   FEE_RECIEVER
  // );
  // await adapterRegistration.wait();

  //deploy factory
  const RouterFactory = await ethers.getContractFactory("BotAggregator");
  const routerFactory = await RouterFactory.deploy(
    [kimAdapter.address],
    FEE_RECIEVER,
    WETH,
    []
  );
  await routerFactory.deployed();
  // const factoryRegistration = await routerFactory.register(
  //   SFSAddress,
  //   FEE_RECIEVER
  // );

  // await factoryRegistration.wait();

  //verify contracts
  await verifyContract(kimAdapter.address, [
    "KimAdapter",
    "0x152eE697f2E276fA89E96742e9bB9aB1F2E61bE3",
    25,
    215000,
  ]);
  await verifyContract(routerFactory.address, [
    [kimAdapter.address],
    FEE_RECIEVER,
    WETH,
    [],
  ]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
