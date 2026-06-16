// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/// @title IdentityRegistry
/// @notice Enterprise identity registry for Dennco Chain participants.
contract IdentityRegistry is AccessControl {
    bytes32 public constant IDENTITY_ADMIN_ROLE = keccak256("IDENTITY_ADMIN_ROLE");

    enum IdentityStatus {
        None,
        Active,
        Suspended,
        Revoked
    }

    struct Identity {
        address account;
        string legalName;
        string metadataURI;
        IdentityStatus status;
        uint256 createdAt;
        uint256 updatedAt;
    }

    mapping(address => Identity) private identities;
    address[] private identityAccounts;

    event IdentityRegistered(address indexed account, string legalName, string metadataURI);
    event IdentityStatusChanged(address indexed account, IdentityStatus status);
    event IdentityMetadataUpdated(address indexed account, string metadataURI);

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(IDENTITY_ADMIN_ROLE, admin);
    }

    function registerIdentity(
        address account,
        string calldata legalName,
        string calldata metadataURI
    ) external onlyRole(IDENTITY_ADMIN_ROLE) {
        require(account != address(0), "IdentityRegistry: zero account");
        require(identities[account].status == IdentityStatus.None, "IdentityRegistry: already registered");

        identities[account] = Identity({
            account: account,
            legalName: legalName,
            metadataURI: metadataURI,
            status: IdentityStatus.Active,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        identityAccounts.push(account);

        emit IdentityRegistered(account, legalName, metadataURI);
    }

    function setIdentityStatus(address account, IdentityStatus status) external onlyRole(IDENTITY_ADMIN_ROLE) {
        require(identities[account].status != IdentityStatus.None, "IdentityRegistry: not registered");
        identities[account].status = status;
        identities[account].updatedAt = block.timestamp;
        emit IdentityStatusChanged(account, status);
    }

    function updateMetadata(address account, string calldata metadataURI) external onlyRole(IDENTITY_ADMIN_ROLE) {
        require(identities[account].status != IdentityStatus.None, "IdentityRegistry: not registered");
        identities[account].metadataURI = metadataURI;
        identities[account].updatedAt = block.timestamp;
        emit IdentityMetadataUpdated(account, metadataURI);
    }

    function getIdentity(address account) external view returns (Identity memory) {
        return identities[account];
    }

    function isActive(address account) external view returns (bool) {
        return identities[account].status == IdentityStatus.Active;
    }

    function totalIdentities() external view returns (uint256) {
        return identityAccounts.length;
    }
}
