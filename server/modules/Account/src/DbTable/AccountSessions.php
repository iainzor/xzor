<?php
namespace Account\DbTable;

use Account\DbModel\AccountSession,
	Account\DbModel\Account,
	Database\Driver\MySQL\AbstractTable;

class AccountSessions extends AbstractTable
{
	const NAME = "account_sessions";
	
	public function getName(): string { return self::NAME; }
	
	/**
	 * Attempt to load a user's existing session information.  If no session ID
	 * can be found, a blank session (guest) will be returned
	 * 
	 * @param string $sessionName
	 * @param int $sessionLifetime
	 * @return AccountSession
	 */
	public function load(string $sessionId, int $sessionLifetime) : AccountSession
	{
		if (!empty($sessionId)) {
			$statement = $this->db->prepare("
				SELECT	*
				FROM	`". $this->getName() ."`
				WHERE	`id` = :id AND
						`created` > :expires
				LIMIT	1
			");
			$statement->execute([
				":id" => $sessionId,
				":expires" => time() - $sessionLifetime
			]);
			$session = $statement->fetchObject(AccountSession::class);
		}
		
		return isset($session) ? $session : new AccountSession();
	}
	
	/**
	 * Create a new session for an account instance
	 * 
	 * @param Account $account
	 * @return AccountSession
	 */
	public function create(Account $account) : AccountSession 
	{
		$id = $this->generateSessionId();
		$this->insert([
			"id" => $id,
			"accountId" => $account->id,
			"created" => time()
		]);
		return $this->load($id, 3600);
	}
	
	/**
	 * Generate a unique session ID
	 * 
	 * @return string
	 */
	private function generateSessionId() : string
	{
		do {
			$id = md5(sha1(uniqid("ACCOUNT_SESSION_ID")));
			$statement = $this->db->prepare("
				SELECT	COUNT(*)
				FROM	`". $this->getName() ."`
				WHERE	`id` = :id
			");
			$statement->execute([
				":id" => $id
			]);
			$count = (int) $statement->fetchColumn();
			
			if ($count === 0) {
				break;
			}
		} while (true);
		
		return $id;
	}
}
