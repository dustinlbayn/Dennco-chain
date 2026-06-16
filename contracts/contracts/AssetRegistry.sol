// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

interface IIdentityRegistry {
    function isActive(address account) external view returns (bool);
}

/// @title AssetRegistry
/// @notice Registry for enterprise asset records on Dennco Chain.
contract AssetRegistry is AccessControl {
    bytes32 public constant ASSET_ADMIN_ROLE = keccak256("ASSET_ADMIN_ROLE");
    bytes32 public constant ASSET_ISSUER_ROLE = keccak256("ASSET_ISSUER_ROLE");

    enum AssetStatus {
        None,
        Active,
        Locked,
        Retired
    }

    struct AssetRecord {
        bytes32 assetId;
        address owner;
        string assetType;
        string metadataURI;
        AssetStatus status;
        uint256 createdAt;
        uint256 updatedAt;
    }

    IIdentityRegistry public immutable identityRegistry;
    mapping(bytes32 => AssetRecord) private assets;
    bytes32[] private assetIds;

    event AssetRegistered(bytes32 indexed assetId, address indexed owner, string assetType, string metadataURI);
    event AssetTransferred(bytes32 indexed assetId, address indexed from, address indexed to);
    event AssetStatusChanged(bytes32 indexed assetId, AssetStatus status);
    event AssetMetadataUpdated(bytes32 indexed assetId, string metadataURI);

    constructor(address admin, address identityRegistryAddress) {
        require(identityRegistryAddress != address(0), "AssetRegistry: zero identity registry");
        identityRegistry = IIdentityRegistry(identityRegistryAddress);

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ASSET_ADMIN_ROLE, admin);
        _grantRole(ASSET_ISSUER_ROLE, admin);
    }

    function registerAsset(
        bytes32 assetId,
        address owner,
        string calldata assetType,
        string calldata metadataURI
    ) external onlyRole(ASSET_ISSUER_ROLE) {
        require(assetId != bytes32(0), "AssetRegistry: zero asset id");
        require(owner != address(0), "AssetRegistry: zero owner");
        require(assets[assetId].status == AssetStatus.None, "AssetRegistry: already registered");
        require(identityRegistry.isActive(owner), "AssetRegistry: owner identity inactive");

        assets[assetId] = AssetRecord({
            assetId: assetId,
            owner: owner,
            assetType: assetType,
            metadataURI: metadataURI,
            status: AssetStatus.Active,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        assetIds.push(assetId);

        emit AssetRegistered(assetId, owner, assetType, metadataURI);
    }

    function transferAsset(bytes32 assetId, address to) external {
        AssetRecord storage record = assets[assetId];
        require(record.status == AssetStatus.Active, "AssetRegistry: asset not active");
        require(record.owner == msg.sender || hasRole(ASSET_ADMIN_ROLE, msg.sender), "AssetRegistry: not authorized");
        require(identityRegistry.isActive(to), "AssetRegistry: recipient identity inactive");

        address from = record.owner;
        record.owner = to;
        record.updatedAt = block.timestamp;

        emit AssetTransferred(assetId, from, to);
    }

    function setAssetStatus(bytes32 assetId, AssetStatus status) external onlyRole(ASSET_ADMIN_ROLE) {
        require(assets[assetId].status != AssetStatus.None, "AssetRegistry: not registered");
        assets[assetId].status = status;
        assets[assetId].updatedAt = block.timestamp;
        emit AssetStatusChanged(assetId, status);
    }

    function updateMetadata(bytes32 assetId, string calldata metadataURI) external onlyRole(ASSET_ADMIN_ROLE) {
        require(assets[assetId].status != AssetStatus.None, "AssetRegistry: not registered");
        assets[assetId].metadataURI = metadataURI;
        assets[assetId].updatedAt = block.timestamp;
        emit AssetMetadataUpdated(assetId, metadataURI);
    }

    function getAsset(bytes32 assetId) external view returns (AssetRecord memory) {
        return assets[assetId];
    }

    function totalAssets() external view returns (uint256) {
        return assetIds.length;
    }
}
