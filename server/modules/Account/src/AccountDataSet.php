<?php
namespace Account;

class AccountDataSet implements \JsonSerializable
{
	/**
	 * @var DbModel\AccountDatum[]
	 */
	private $data = [];
	
	/**
	 * Constructor
	 * 
	 * @param DbModel\AccountData[] $data
	 */
	public function __construct(array $data = [])
	{
		foreach ($data as $datum) {
			$this->set($datum);
		}
	}
	
	/**
	 * Set a value in the dataset
	 * 
	 * @param \Account\DbModel\AccountDatum $datum
	 */
	public function set(DbModel\AccountDatum $datum)
	{
		$this->data[$datum->key] = $datum->value;
	}
	
	/**
	 * @return array
	 */
	public function jsonSerialize() : array 
	{
		return $this->data;
	}
}