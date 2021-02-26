var Bili_video = require("../index.js");

var url_list = [
  'https://www.bilibili.com/video/av2333333/index_3.html',
  'https://www.bilibili.com/video/av2333333/index_2.html',
  'https://www.bilibili.com/video/av7/',
  'https://www.bilibili.com/video/av990754/index_2.html',
  'https://www.bilibili.com/video/av2030663/',
  'https://www.bilibili.com/video/av1673701/',
  'https://www.bilibili.com/video/av187189/index_2.html',
  'https://www.bilibili.com/video/av2182749/',
  'https://www.bilibili.com/video/av1032809/',
  'https://www.bilibili.com/video/av2053/'
];

var flash_list = [
  '//static.hdslb.com/miniloader.swf?aid=2333333&page=3',
  '//static.hdslb.com/miniloader.swf?aid=2333333&page=2',
  '//static.hdslb.com/miniloader.swf?aid=7&page=1',
  '//static.hdslb.com/miniloader.swf?aid=990754&page=2',
  '//static.hdslb.com/miniloader.swf?aid=2030663&page=1',
  '//static.hdslb.com/miniloader.swf?aid=1673701&page=1',
  '//static.hdslb.com/miniloader.swf?aid=187189&page=2',
  '//static.hdslb.com/miniloader.swf?aid=2182749&page=1',
  '//static.hdslb.com/miniloader.swf?aid=1032809&page=1',
  '//static.hdslb.com/miniloader.swf?aid=2053&page=1'
];

var embed_list = [
  '<embed height="452" width="544" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=2333333&page=3" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>',
  '<embed height="452" width="544" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=2333333&page=2" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>',
  '<embed height="452" width="544" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=7&page=1" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>',
  '<embed height="452" width="544" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=990754&page=2" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>',
  '<embed height="452" width="544" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=2030663&page=1" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>',
  '<embed height="452" width="544" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=1673701&page=1" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>',
  '<embed height="452" width="544" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=187189&page=2" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>',
  '<embed height="452" width="544" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=2182749&page=1" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>',
  '<embed height="452" width="544" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=1032809&page=1" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>',
  '<embed height="452" width="544" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=2053&page=1" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>'
];

console.log("Manual Tests");
var bili_video_1 = new Bili_video(1, 1);
console.log(bili_video_1.getIndex());
var bili_video_2 = new Bili_video(2);
console.log(bili_video_2.getIndex());

console.log("Auto Tests");
for(var i in url_list){
  console.log(url_list[i]);
  var bili_video = new Bili_video(url_list[i]);
  console.log(bili_video.avnumber + ' ' + bili_video.page);
  if(bili_video.flashAddr() === flash_list[i]){
    console.log("Correct: " + flash_list[i]);
  }else{
    console.error("Error!!!");
    console.error(bili_video.flashAddr());
    console.error(url_list[i]);
  }
  if(bili_video.embedAddr() === embed_list[i]){
    console.log("Correct: " + embed_list[i]);
  }else {
    console.error("Error!!!");
    console.error(bili_video.embedAddr());
    console.error(embed_list[i]);
  }
}
