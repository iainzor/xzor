<?php
namespace Feed;

class FeedItem
{
	/**
	 * @var string
	 */
	public $title;
	
	/**
	 * @var string
	 */
	public $url;
	
	/**
	 * @var array
	 */
	public $data = [];
	
	/**
	 * Constructor
	 * 
	 * @param string $title
	 * @param string $url
	 * @param array $data
	 */
	public function __construct(string $title, string $url, array $data = [])
	{
		$this->title = $title;
		$this->url = $url;
		$this->data = $data;
	}
}