<?php
namespace Feed;

class FeedItem
{
	/**
	 * @var int
	 */
	public $timestamp;
	
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
	 * @param int $timestamp
	 * @param string $title
	 * @param string $url
	 * @param array $data
	 */
	public function __construct(int $timestamp, string $title, string $url, array $data = [])
	{
		$this->timestamp = $timestamp;
		$this->title = $title;
		$this->url = $url;
		$this->data = $data;
	}
}