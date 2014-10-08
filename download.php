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
        $log_line=join(" | ", array( date(DATE_RFC822), $this->page_name, $this->app_id, "\r\n".$msg) );
        fwrite($this->log, $log_line."\r\n");
    }
    function __destruct()
    {//makes sure to close the file and write lines when the process ends.
        $this->log_msg("End of log\r\n --------------------------------------------------------");
        fclose($this->log);
    }
}



$ig_data = $_POST['ig_data'];

//$log=new Log('log.txt','api.php');
//$log->log_msg("Twitter tag: ".$tag_twitter." | Instagram tag: ".$tag_instagram);

/* creates a compressed zip file */
function create_zip($files = array(),$destination = '',$overwrite = false) {
    //if the zip file already exists and overwrite is false, return false
    if(file_exists($destination) && !$overwrite) { return false; }
    //vars
    $valid_files = array();
    //if files were passed in...
    if(is_array($files)) {
        //cycle through each file
        foreach($files as $file) {
            //make sure the file exists
            if(file_exists($file)) {
                $valid_files[] = $file;
            }
        }
    }
    //if we have good files...
    if(count($valid_files)) {
        //create the archive
        $zip = new ZipArchive();
        if($zip->open($destination,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
            return false;
        }
        //add the files
        foreach($valid_files as $file) {
            $zip->addFile($file,$file);
        }
        //debug
        //echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status;

        //close the zip -- done!
        $zip->close();

        //check to make sure the file exists
        return file_exists($destination);
    }
    else
    {
        return false;
    }
}

$files_to_zip = array(
    "http://origincache-prn.fbcdn.net/10375697_662499890465635_1736501279_n.jpg",
    "http://origincache-prn.fbcdn.net/10358258_1494830404062388_1008579480_n.jpg",
    "http://origincache-prn.fbcdn.net/926204_522207444551237_576787369_n.jpg",
    "http://origincache-prn.fbcdn.net/10362325_764435490254473_1411538646_n.jpg",
    "http://origincache-prn.fbcdn.net/923617_1411194095830951_246823985_n.jpg",
    "http://origincache-frc.fbcdn.net/10326610_512796712179740_127050670_n.jpg"
);

//$files_to_zip = $ig_data;
//if true, good; if false, zip creation failed

$result = create_zip($files_to_zip,'my-archive.zip');
var_dump($result);
echo ("class exists? = ".class_exists('ZipStream'));
die;


?>