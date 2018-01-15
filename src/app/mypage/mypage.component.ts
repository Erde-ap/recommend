import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

  avatar = "./assets/user1/user1_profile.jpg"
  user = {
    id  :"Johnson0212",
    name:"ドウェイン・ジョンソン",
    mail:"johnson19720502@gmail.com",
    introduction:"カリフォルニア州ヘイワード出身、ホームタウンはフロリダ州マイアミ。祖父、父共に名プロレスラーであり、三世プロレスラーとして知られる。身長196cm、体重118kg。2003年頃から俳優としての活動を開始。俳優への本格転向後は、基本的には体格は落ちているが、役作りに必要ならばプロレスラー仕込みのビルドアップも見せる。なお2011年の復帰以降もWWE公式サイトでは体重260ポンド（約118kg）とされている。"
  }
  archives = [
    {
      title:"ワイルド・スピード ICE BREAK",
      img:"./assets/user1/archive_1.jpg",
      favorite: false,
      favoInt:100,
      description:"『ワイルド・スピード ICE BREAK』（ワイルド・スピード アイス・ブレイク、原題：The Fate of the Furious / Fast & Furious 8）は、2017年公開のアメリカ合衆国のアクション映画。『ワイルド・スピードシリーズ』の第8作目。強固な絆で結ばれていた“ファミリー”が、ドミニクの裏切りでバラバラになっていくさまを描く[2][5]。この作品はシリーズ最終章となる三部作の一作目となる。第9弾は2020年4月10日（D.ジョンソンとJ.ステイサムのスピンオフ映画が制作される事により、公開が延期。スピンオフ映画は2019年全米公開。）完結編となる第10弾2021年4月2日に全米公開される予定。"
    },{
      title:"ワイルド・スピード SKY MISSION",
      img:"./assets/user1/archive_2.jpg",
      favorite: true,
      favoInt: 235,
      description:"『ワイルド・スピード SKY MISSION』（ワイルド・スピード スカイ・ミッション、原題：『Furious 7』、別題：『Furious Seven』、『Fast 7』、『Fast & Furious 7』）は、2015年のアメリカ合衆国のカーアクション映画。『ワイルド・スピード』シリーズの7作目である。シリーズの時間軸は、1作目→2作目→4作目（『ワイルド・スピード MAX』）→5作目（『ワイルド・スピード MEGA MAX』）→6作目（『ワイルド・スピード EURO MISSION』）→3作目（『ワイルドスピードX3 TOKYO DRIFT』）→7作目（本作）→8作目（『ワイルド・スピード ICE BREAK』）の順となっている。本作のクランクアップ前に主演のポール・ウォーカーが交通事故により他界したため、一部のシーンは彼の弟2人（カレブ・ウォーカーとコディ・ウォーカー）が代役を務めている[3]。また本編の最後に「FOR PAUL（ポールに捧ぐ）」のメッセージが捧げられている。"
    }
  ]
  toggleMenu(archive): void {
    archive.favorite = !archive.favorite;
    archive.favorite ? archive.favoInt++ : archive.favoInt--;
}
  constructor() { }

  ngOnInit() {
  }

}
