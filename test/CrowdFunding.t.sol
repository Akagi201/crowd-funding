// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/CrowdFunding.sol";

contract CrowdfundingTest is Test {
    CrowdFunding public crowdfunding;

    function setUp() public {
        crowdfunding = new CrowdFunding();
    }

    function testCreateCampaign() public {
        crowdfunding.createCampaign(payable(address(0x1)), 100, 100);
        assertEq(crowdfunding.getCampaignsCount(), 1);
    }

    function testContribute() public {
        crowdfunding.createCampaign(payable(address(0x1)), 100, 100);
        crowdfunding.contribute{value: 10}(0);
        // assertEq(crowdfunding.campaigns(0).amountRaised, 10);
    }

    function testWithdraw() public {
        crowdfunding.createCampaign(payable(address(0x1)), 10, 100);
        crowdfunding.contribute{value: 10}(0);
        vm.roll(201);
        vm.prank(address(0x1));
        // crowdfunding.withdraw(0);
        // assertEq(crowdfunding.campaigns(0).amountRaised, 0);
    }
}
