<?php


if(empty($_POST)) die;




// Log --->

class Log
{
    public function __construct($log_name,$page_name)
    {
        if(!file_exists('logs/'.$log_name)){ $log_name='default_log.txt'; }
        $this->log_name=$log_name;

        $this->app_id=uniqid();//give each process a unique ID for differentiation
        $this->page_name=$page_name;

        $this->log_file='logs/'.$this->log_name;
        $this->log=fopen($this->log_file,'a');
    }
    public function log_msg($msg)
    {//the action	
		$timestamp = date(("l, d-M-y H:i:s"), strtotime('+3 hours'));
        $log_line=join(" | ", array($timestamp." (".date("H:i:s")." GMT)", $msg) );
        fwrite($this->log, $log_line."\r\n");
    }
    function __destruct()
    {//makes sure to close the file and write lines when the process ends.
        fclose($this->log);
    }
}




$tag_twitter = $_POST['tag_twitter'];
$tag_instagram = $_POST['tag_instagram'];

$log=new Log('log.txt','api.php');
$log->log_msg("Twitter tag: ".$tag_twitter." | Instagram tag: ".$tag_instagram);

// Required -->

require_once 'instagram.class.php';
require_once 'twitteroauth.php';


// Instagram -->

    // Get class for Instagram
    // More examples here: https://github.com/cosenary/Instagram-PHP-API

    // Initialize class with client_id
    // Register at http://instagram.com/developer/ and replace client_id with your own
    $instagram = new Instagram('dbb717f6d77449579dc3f2766a18870c');

    // Set keyword for #hashtag
    $tag = $tag_instagram;

    // Get latest photos according to #hashtag keyword
    $media = $instagram->getTagMedia($tag);

    /*
    // Set number of photos to show
    $limit = 20;

    // Set height and width for photos
    $size = '640';

    // Show results
    // Using for loop will cause error if there are less photos than the limit
    foreach(array_slice($media->data, 0, $limit) as $data)
    {
        // Show photo
        echo '<p><img src="'.$data->images->thumbnail->url.'" height="'.$size.'" width="'.$size.'" alt="SOME TEXT HERE"></p>';
    }
*/

// Twitter-->

define('CONSUMER_KEY', 'czE0kUc8mwImPuzwqVkkh3aoa');
define('CONSUMER_SECRET', '2LohxOlNWFZijkd8yhIz48hz7MA6IS4EZVcivsQ9rhRGGEoM9B');
define('ACCESS_TOKEN', '892316126-x6tKhfmr0C7t5XzxwFc25sJP2I4GuJcUnLUts85X');
define('ACCESS_TOKEN_SECRET', 'xoOtLnTyxBGYDKWDjxKdV1mf8Iuck1u9VEKFvJ1rfqAYu');
$toa = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
$query = array(
    "q" => "#" . $tag_twitter,
    "result_type" => "recent"
    //"result_type" => "popular"
);

$results = $toa->get('search/tweets', $query);
$res_array = array('instagram' => $media->data, 'twitter' => $results->statuses);
$res = json_encode($res_array);

header('Content-Type: application/json');
echo $res;


die;


?>