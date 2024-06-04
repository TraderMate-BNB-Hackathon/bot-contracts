// 0xc02155946dd8C89D3D3238A6c8A64D04E2CD4500
import { ethers, run } from 'hardhat';

export async function verifyContract(
  contract: string,
  constructorArguments: any[] = []
) {
  if (process.env.ETHERSCAN_API_KEY) {
    try {
      console.info('Verifying', contract, constructorArguments);
      const verify = await run('verify:verify', {
        address: contract,
        constructorArguments,
      });
      console.log(contract, ' verify successfully');
    } catch (error) {
      console.log(
        '....................',
        contract,
        ' error start............................',
        '\n',
        error,
        '\n',
        '....................',
        contract,
        ' error end............................'
      );
    }
  }
}

const FEE_RECIEVER = '0x15fA5b666a513144995131006F4cb50e02C0f6D5';
// const WBNB = '0x4200000000000000000000000000000000000006';
const WBNB = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
async function main() {
  const PancakeAdapter = await ethers.getContractFactory('PancakeAdapter');
  const pancakeAdapter = await PancakeAdapter.deploy(
    'PancakeAdapter',
    '0x6725F303b657a9451d8BA641348b6761A6CC7a17',
    25,
    215000
  );
  await pancakeAdapter.deployed();
  // const adapterRegistration = await pancakeAdapter.register(
  //   SFSAddress,
  //   FEE_RECIEVER
  // );
  // await adapterRegistration.wait();

  //deploy factory
  const RouterFactory = await ethers.getContractFactory('BotAggregator');
  const routerFactory = await RouterFactory.deploy(
    [pancakeAdapter.address],
    FEE_RECIEVER,
    WBNB,
    []
  );
  await routerFactory.deployed();
  // const factoryRegistration = await routerFactory.register(
  //   SFSAddress,
  //   FEE_RECIEVER
  // );

  // await factoryRegistration.wait();

  console.log('deployed', routerFactory.address, pancakeAdapter.address);

  //verify contracts
  // await verifyContract(pancakeAdapter.address, [
  //   'PancakeAdapter',
  //   '0x6725F303b657a9451d8BA641348b6761A6CC7a17',
  //   25,
  //   215000,
  // ]);
  // await verifyContract(routerFactory.address, [
  //   [pancakeAdapter.address],
  //   FEE_RECIEVER,
  //   WBNB,
  //   [],
  // ]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
