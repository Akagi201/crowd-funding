// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.19;

import {CREATE3Script} from "./base/CREATE3Script.sol";
import {CrowdFunding} from "../src/CrowdFunding.sol";

contract DeployScript is CREATE3Script {
    constructor() CREATE3Script(vm.envString("VERSION")) {}

    function run() external returns (CrowdFunding c) {
        uint256 deployerPrivateKey = uint256(vm.envBytes32("PRIVATE_KEY"));

        uint256 param = 123;

        vm.startBroadcast(deployerPrivateKey);

        c = CrowdFunding(
            create3.deploy(
                getCreate3ContractSalt("Counter"), bytes.concat(type(CrowdFunding).creationCode, abi.encode(param))
            )
        );

        vm.stopBroadcast();
    }
}
