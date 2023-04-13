// SPDX-License-Identifier: apache-2.0
pragma solidity ^0.8.19;

contract CrowdFunding {
    struct Campaign {
        address payable beneficiary;
        uint256 goal;
        uint256 deadline;
        uint256 amountRaised;
        bool closed;
        mapping(address => uint256) contributions;
    }

    uint256 numCampaigns;
    mapping(uint256 => Campaign) public campaigns;

    event CampaignCreated(uint256 campaignId);
    event CampaignContributed(uint256 campaignId, address contributor, uint256 amount);
    event CampaignWithdrawn(uint256 campaignId, address beneficiary, uint256 amount);
    // Campaign[] public campaigns;

    // refs: https://docs.soliditylang.org/en/latest/types.html#structs
    function createCampaign(address payable _beneficiary, uint256 _goal, uint256 _duration) public {
        // a memory-struct can not contain a mapping
        // Campaign memory newCampaign = Campaign({
        //     beneficiary: _beneficiary,
        //     goal: _goal,
        //     deadline: block.number + _duration,
        //     amountRaised: 0,
        //     closed: false
        // });
        // campaigns.push(newCampaign);
        Campaign storage newCampaign = campaigns[numCampaigns];
        newCampaign.beneficiary = _beneficiary;
        newCampaign.goal = _goal;
        newCampaign.deadline = block.number + _duration;
        newCampaign.amountRaised = 0;
        newCampaign.closed = false;
        emit CampaignCreated(numCampaigns);
        numCampaigns++;
    }

    function contribute(uint256 campaignId) public payable {
        Campaign storage campaign = campaigns[campaignId];
        require(block.number < campaign.deadline, "Campaign has ended");
        require(!campaign.closed, "Campaign is closed");
        campaign.contributions[msg.sender] += msg.value;
        campaign.amountRaised += msg.value;
        emit CampaignContributed(campaignId, msg.sender, msg.value);
    }

    function withdraw(uint256 campaignId) public {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.beneficiary == msg.sender, "Only the beneficiary can withdraw");
        require(campaign.amountRaised >= campaign.goal, "Campaign did not reach its goal");
        require(block.number >= campaign.deadline, "Campaign has not ended yet");
        campaign.beneficiary.transfer(campaign.amountRaised);
        campaign.closed = true;
        emit CampaignWithdrawn(campaignId, msg.sender, campaign.amountRaised);
    }

    function getCampaignsCount() public view returns (uint256) {
        return numCampaigns;
    }
}
