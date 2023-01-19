// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./interface/IERC721Extensions.sol";

contract Ticketing is Ownable {
    error ZeroBytes();
    error ZeroAddress();
    error MinAmount();
    error UnregisteredTicket();
    error NotEnoughBalance();
    error NotSubjectToMinting();
    error DuplicateApplication();

    IERC20 public token;
    IERC721Extensions public nft;

    // title => rank => merkleRoot
    mapping (bytes32 => bytes32) public _merkleRoot;
    mapping (bytes32 => mapping(address => bool)) public isEntry;

    constructor(address _token,address _nft) {
        token = IERC20(_token);
        nft = IERC721Extensions(_nft);
    }

    event Enter(address applicant,bytes32 title);


    // 응모
    function enter(address applicant, bytes32 title) external onlyOwner {
        // 등록되지 않은 티켓에 응모할 경우
        if(nft.getProductionCost(title) == 0) { revert UnregisteredTicket(); }
        if(isEntry[title][applicant]) { revert DuplicateApplication(); }

        isEntry[title][applicant] = true;
        emit Enter(applicant, title);
    }

    function airdrop(bytes32 title, bytes32 merkleRoot) public onlyOwner {
        // 등록되지 않은 티켓이름과 등급일 경우
        if(nft.getProductionCost(title) == 0) { revert UnregisteredTicket(); }
        _merkleRoot[title] = merkleRoot;
    }

    function buyNft(bytes32 title, address buyer, string memory uri, bytes32[] calldata merkleProof) external {
        // 민팅 권한이 없는 경우
        if(!canClaim(title,buyer,merkleProof)) { revert NotSubjectToMinting(); }
        nft.safeMint(buyer,uri,title);
    }

    function canClaim(bytes32 title, address claimer, bytes32[] calldata merkleProof)
        public
        view
        returns (bool)
    {
        return MerkleProof.verify(
                merkleProof,
                _merkleRoot[title],
                keccak256(abi.encodePacked(claimer))
            );
    }
}

