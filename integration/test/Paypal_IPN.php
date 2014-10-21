<?php

class Paypal_IPN{

	/* @var string $_url the paypal url to go to through cURL
	private _url;
	
	/**
	* @param string $mode 'Live' or 'sandbox'
	*/
	public function __construct($mode = 'live'){
	
		if($mode == 'live'){
			$this->_url = 'https://www.paypal.com/il/cgi-bin/webscr';
		}
		else{
			$this->_url = 'https://www.sandbox.paypal.com/il/cgi-bin/webscr';
		}

	}
	
	public function run(){
		
		$postFields = '';
		
		foreach($_POST as $key => $value){
			$postFields .= '{ "' . $key . '":'. '"' . urlencode($value) . '"}, ';
		}
		
		
		$ch = curl_init();
		
		curl_setopt_array($ch, array(
			CURLOPT_URL => $this->_url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_SSL_VERIFYPEER => false,
			CURLOPT_POST => true,
			CURLOPT_POSTFIELDS => $postFields
		));
		
		$result = curl_exec($ch);
		curl_close($ch);
		
		$fh = fopen('result.json', 'w');
		fwrite($fh, $postFields);
		fclose($fh);

	
	}

}






?>