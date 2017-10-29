<?php
namespace Feed;

class FeedItem
{
	/**
	 * @var string
	 */
	public $provider;
	
	/**
	 * @var int
	 */
	public $timestamp;
	
	/**
	 * @var string
	 */
	public $key;
	
	/**
	 * @var string
	 */
	public $title;
	
	/**
	 * @var string
	 */
	public $url;
	
	/**
	 * @var string
	 */
	public $image;
	
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
	 * @param string $image
	 * @param array $data
	 */
	public function __construct(int $timestamp, string $title, string $url, string $image = null, array $data = [])
	{
		$this->timestamp = $timestamp;
		$this->title = $title;
		$this->url = $url;
		$this->image = $image;
		$this->data = $data;
		$this->key = substr(md5($title.$url), 8, 16);
	}
}