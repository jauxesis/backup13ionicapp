pragma solidity ^0.4.0;

contract SimpleStorage {
    uint256 storedData;

    address public lastAddress;

    mapping (address => uint256) public balanceOf;

    event Setting(uint256 x);

    function() payable{
    	balanceOf[msg.sender] += msg.value;
    	lastAddress = msg.sender;
    	
    }

    function set(uint256 x) returns (uint256) {
        storedData = x/7;
        Setting(x);
        return storedData;
    }


    function get() returns (uint) {
        uint256 ret;
        uint256 n;
        uint256 d;
        n = 23;
        d = 7;
        ret = n/d;
        return ret;
    }
}