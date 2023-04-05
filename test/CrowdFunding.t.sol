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
        // https://github.com/foundry-rs/foundry/issues/2943
        crowdfunding.createCampaign(payable(address(0x100)), 100, 100);
        assertEq(crowdfunding.getCampaignsCount(), 1);
    }

    function testContribute() public {
        vm.roll(200);
        crowdfunding.createCampaign(payable(address(0x100)), 100, 100);
        crowdfunding.contribute{value: 10}(0);
        (address payable beneficiary, uint256 goal, uint256 deadline, uint256 amountRaised, bool closed) =
            crowdfunding.campaigns(0);
        assertEq(beneficiary, address(0x100));
        assertEq(goal, 100);
        assertEq(deadline, 300);
        assertEq(amountRaised, 10);
        assertEq(closed, false);
    }

    function testWithdraw() public {
        vm.roll(200);
        crowdfunding.createCampaign(payable(address(0x100)), 100, 100);
        crowdfunding.contribute{value: 100}(0);
        vm.roll(301);
        vm.prank(address(0x100));
        crowdfunding.withdraw(0);
        (address payable beneficiary, uint256 goal, uint256 deadline, uint256 amountRaised, bool closed) =
            crowdfunding.campaigns(0);
        assertEq(beneficiary, address(0x100));
        assertEq(goal, 100);
        assertEq(deadline, 300);
        assertEq(amountRaised, 100);
        assertEq(closed, true);
    }
}
