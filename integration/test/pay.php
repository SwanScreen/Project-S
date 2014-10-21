<?php
/* Paypal IPN */

/**
	How it works
	1. A user buy somthing from your "BUY NOW" button.
	2. The "BUY NOW" button is configured with a URL for Paypal to go to when complete
	3. The CALLBACK is on iur site (This page), it queries Paypal to see the result of the transaction mode.
	4. If it is good , we update the database.
*/

require 'Paypal_IPN.php';
$paypal = new Paypal_IPN('sandbox');
$paypal->run();
?>