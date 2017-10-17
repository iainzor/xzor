<?php
namespace Account\Form;

use Account\AccountSaver,
	Account\AccountLoader,
	Account\Account,
	Account\DbTable\Accounts;

class AccountForm
{
	/**
	 * @var \Account\AccountSaver
	 */
	private $saver;
	
	/**
	 * @var \Account\AccountLoader
	 */
	private $loader;
	
	/**
	 * @var \Account\DbTable\Accounts
	 */
	private $accounts;
	
	/**
	 * @var boolean
	 */
	public $isValid = false;
	
	/**
	 * @var Account
	 */
	public $account;
	
	/**
	 * @var array
	 */
	public $errors;
	
	/**
	 * Constructor
	 * 
	 * @param \Account\AccountLoader $loader
	 * @param \Account\AccountSaver $saver
	 * @param \Account\DbTable\Accounts $accounts
	 */
	public function __construct(AccountLoader $loader, AccountSaver $saver, Accounts $accounts)
	{
		$this->loader = $loader;
		$this->saver = $saver;
		$this->accounts = $accounts;
	}
	
	/**
	 * Execute the form.  Returns TRUE if the form is valid and FALSE otherwise
	 * 
	 * @param Account $account
	 * @param array $data
	 * @return boolean 
	 */
	public function execute(Account $account, array $data) : bool
	{
		if (!$account->id) {
			throw new \Exception("Cannot save an account without an ID");
		}
		
		//$this->account = $account;
		
		if ($this->isValid($data)) {
			$isPublic = isset($data["isPublic"]) ? (boolean) $data["isPublic"] : false;
			$toUpdate = [
				"name" => $data["name"],
				"slug" => $data["slug"],
				"isPublic" => $isPublic,
			];
			
			if (isset($data["theme"])) {
				$toUpdate["theme"] = $data["theme"];
			}
			
			if (isset($data["data"])) {
				$toUpdate["data"] = $data["data"];
			}
			
			$this->saver->save($account, $toUpdate);
			//$this->account = $this->loader->load($account->id);
			
			return true;
		}
		
		return false;
	}
	
	/**
	 * Validate the form values
	 * 
	 * @param array $data
	 * @return bool
	 */
	private function isValid(array $data) : bool
	{
		$errors = [];
		
		$name = isset($data["name"]) ? trim($data["name"]) : "";
		if (empty($name)) {
			$errors["name"] = "Please provide a display name for your account";
		}
		
		$isPublic = isset($data["isPublic"]) ? (boolean) $data["isPublic"] : false;
		$slug = isset($data["slug"]) ? trim($data["slug"]) : "";
		if ($isPublic) {
			if (empty($slug)) {
				$errors["slug"] = "Please provide a URL for your public profile";
			} else if ($this->accounts->slugExists($slug, $this->account)) {
				$errors["slug"] = "The profile URL provided is already registered";
			}
		}
		
		if (empty($errors)) {
			$this->isValid = true;
		} else {
			$this->isValid = false;
			$this->errors = $errors;
		}
		
		return $this->isValid;
	}
}