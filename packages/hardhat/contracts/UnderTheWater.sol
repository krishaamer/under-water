// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ISP } from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import { Attestation } from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import { DataLocation } from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";

interface IFaucet {
    function withdraw(address erc20Address, uint256 amount) external;
}

interface IToucanPool {
    function redeemOutMany(
        address[] memory tco2s,
        uint256[] memory amounts,
        uint256 maxFee
    ) external returns (uint256 poolAmountSpent);
    
    function calculateRedemptionOutFees(
        address[] memory tco2s,
        uint256[] memory amounts,
        bool isExactOutput
    ) external view returns (uint256);
} 

interface ITCO2 {
    struct RetirementRequest {
        uint256[] tokenIds;
        uint256 amount;
        string retiringEntityString;
        address beneficiary;
        string beneficiaryString;
        string retirementMessage;
        string beneficiaryLocation;
        string consumptionCountryCode;
        uint256 consumptionPeriodStart;
        uint256 consumptionPeriodEnd;
    }
    
    function requestRetirement(RetirementRequest memory params) external;
}

contract UnderTheWater {
    using SafeERC20 for IERC20;
    
    address constant FAUCET = 0xf2a25A2b3C9652A3Eb32f7fe18CBf58E664Fd054;
    address constant NCT = 0xf92f74Dd03f9A9E04773cE5fF3BCeaBB2eB1dDf0;
    address constant TCO2 = 0xF0476e6969fab717f7FCbA931b398e5D498D0f08;
    address constant SIGN_PROTOCOL = 0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD;
    
    event DebugInfo(string step, uint256 amount, uint256 balance);
    event TokenApproval(string step, address token, address spender, uint256 amount);
    
    struct RetirementAttestation {
        uint256 nctAmount;
        uint256 tco2Amount;
        string beneficiary;
        string location;
        string countryCode;
    }
    
    // 从水龙头提取NCT代币
    function withdrawFromFaucet(uint256 amount) public {
        IFaucet(FAUCET).withdraw(NCT, amount);
        emit DebugInfo("withdrawFromFaucet called", amount, IERC20(NCT).balanceOf(address(this)));
    }
    
    // 从NCT池子中赎回TCO2代币
    function redeemFromPool(uint256 amount) public {
        address[] memory tco2s = new address[](1);
        tco2s[0] = TCO2;
        
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        
        uint256 fee = IToucanPool(NCT).calculateRedemptionOutFees(tco2s, amounts, false);
        uint256 maxFee = fee * 12 / 10; // 20% buffer
        
        // 允许 IToucanPool 消费 NCT
        IERC20(NCT).approve(NCT, type(uint256).max);
        emit TokenApproval("Approved IToucanPool to spend NCT", NCT, NCT, type(uint256).max);
        
        uint256 poolAmountSpent = IToucanPool(NCT).redeemOutMany(tco2s, amounts, maxFee);
        emit DebugInfo("redeemFromPool executed", poolAmountSpent, IERC20(NCT).balanceOf(address(this)));
    }
    
    // 请求retirement
    function requestTCO2Retirement(
        uint256 tokenId,
        uint256 amount,
        string memory beneficiaryString,
        string memory beneficiaryLocation,
        string memory consumptionCountryCode
    ) public {
        uint256[] memory tokenIds = new uint256[](1);
        tokenIds[0] = tokenId;
        
        ITCO2.RetirementRequest memory request = ITCO2.RetirementRequest({
            tokenIds: tokenIds,
            amount: amount,
            retiringEntityString: "",
            beneficiary: address(0),
            beneficiaryString: beneficiaryString,
            retirementMessage: "",
            beneficiaryLocation: beneficiaryLocation,
            consumptionCountryCode: consumptionCountryCode,
            consumptionPeriodStart: 1719766800,
            consumptionPeriodEnd: 1727715599
        });
        
        IERC20(TCO2).approve(TCO2, type(uint256).max);
        emit TokenApproval("Approved TCO2 to spend TCO2", TCO2, TCO2, type(uint256).max);
        
        ITCO2(TCO2).requestRetirement(request);
        emit DebugInfo("requestTCO2Retirement executed", amount, IERC20(TCO2).balanceOf(address(this)));
    }
    
    // 查询费用（view函数）
    function calculateFee(uint256 amount) public view returns (uint256 fee, uint256 maxFee) {
        address[] memory tco2s = new address[](1);
        tco2s[0] = TCO2;
        
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        
        fee = IToucanPool(NCT).calculateRedemptionOutFees(tco2s, amounts, false);
        maxFee = fee * 12 / 10; // 20% buffer
    }
    
    // 提取ERC20代币的方法
    function withdrawToken(address token, uint256 amount) public {
        IERC20(token).safeTransfer(msg.sender, amount);
    }
    
    // 执行完整的流程
    function executeSequence() external {
        uint256 amountToRedeem = 1e18; // 1 NCT
        
        // 1. 计算费用
        (uint256 fee, uint256 maxFee) = calculateFee(amountToRedeem);
        uint256 totalAmount = amountToRedeem + maxFee;
        emit DebugInfo("Calculated fees", fee, maxFee);
        
        // 2. 从水龙头提取总金额
        withdrawFromFaucet(totalAmount);
        
        // 3. 检查实际收到的余额
        uint256 nctBalance = IERC20(NCT).balanceOf(address(this));
        require(nctBalance >= totalAmount, "Insufficient NCT from faucet");
        emit DebugInfo("After faucet withdrawal", totalAmount, nctBalance);
        
        // 4. 从池子中赎回TCO2
        redeemFromPool(amountToRedeem);
        
        // 5. 检查TCO2余额
        uint256 tco2Balance = IERC20(TCO2).balanceOf(address(this));
        require(tco2Balance >= 1e18, "Insufficient TCO2 after redeem");
        emit DebugInfo("After redeem", 1e18, tco2Balance);
        
        // 6. 执行 retirement
        requestTCO2Retirement(
            2,              // tokenId
            1e18,           // amount
            "ETHGlobal",   
            "Bangkok",     
            "TH"          
        );
        
        emit DebugInfo("After retirement", 1e18, IERC20(TCO2).balanceOf(address(this)));
        
        // After retirement, create attestation
        createRetirementAttestation(
            1205, // Your schema ID (replace with actual schema ID)
            totalAmount, // NCT amount including fees
            1e18,      // TCO2 amount
            "ETHGlobal",
            "Bangkok",
            "TH"
        );
        
        emit DebugInfo("After attestation", 1e18, IERC20(TCO2).balanceOf(address(this)));
    }
    
    function createRetirementAttestation(
        uint64 schemaId,
        uint256 nctAmount,
        uint256 tco2Amount,
        string memory beneficiary,
        string memory location,
        string memory countryCode
    ) internal returns (uint64) {
        RetirementAttestation memory attestation = RetirementAttestation({
            nctAmount: nctAmount,
            tco2Amount: tco2Amount,
            beneficiary: beneficiary,
            location: location,
            countryCode: countryCode
        });
        
        bytes memory attestationData = abi.encode(attestation);
        
        bytes[] memory recipients = new bytes[](1);
        recipients[0] = abi.encode(msg.sender);
        
        Attestation memory a = Attestation({
            schemaId: schemaId,
            linkedAttestationId: 0,
            attestTimestamp: 0,
            revokeTimestamp: 0,
            attester: address(this),
            validUntil: 0,
            dataLocation: DataLocation.ONCHAIN,
            revoked: false,
            recipients: recipients,
            data: attestationData
        });
        
        return ISP(SIGN_PROTOCOL).attest(a, "", "", "");
    }
}
