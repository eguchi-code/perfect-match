export const config = { runtime: 'edge' };

const types = {
  LWCP: { name: '王道スイートハート', emoji: '👑', catchphrase: '言葉で包み込み、まっすぐリードしてくれる人' },
  LWCG: { name: '情熱のストーリーテラー', emoji: '🔥', catchphrase: '甘い言葉と大胆さで日常を冒険に変える人' },
  LWSP: { name: '知的なインテリジェンス', emoji: '🎩', catchphrase: '品のある言葉と適度な距離感で大人の恋を紡ぐ人' },
  LWSG: { name: '自由なカリスマ', emoji: '✨', catchphrase: '束縛しない、されない。でもいざという時に頼れる人' },
  LACP: { name: '黙って守るガーディアン', emoji: '🛡️', catchphrase: '言葉より行動。そっとあなたを守ってくれる人' },
  LACG: { name: '嵐のようなカリスマ', emoji: '🌊', catchphrase: '行動力で心を奪う、ドラマチックな存在' },
  LASP: { name: '静かなる大黒柱', emoji: '🏔️', catchphrase: '多くを語らず、行動で支えてくれる大人の存在' },
  LASG: { name: '孤高のアドベンチャラー', emoji: '🗺️', catchphrase: '自分の世界を持ちながら、行動力で魅せる人' },
  FWCP: { name: '甘え上手な癒し系', emoji: '🌸', catchphrase: '素直な言葉と笑顔で、あなたを毎日癒してくれる人' },
  FWCG: { name: '天真爛漫なミューズ', emoji: '🦋', catchphrase: 'キラキラした感性で、あなたの世界を鮮やかにする人' },
  FWSP: { name: '凛とした知性派', emoji: '📚', catchphrase: '自分の世界観を持ち、知的な会話を楽しめる人' },
  FWSG: { name: '自由奔放なアーティスト', emoji: '🎨', catchphrase: '独自のセンスと言葉で、あなたに新しい世界を見せる人' },
  FACP: { name: '献身的なあったか系', emoji: '🧸', catchphrase: '言葉は少なくても、行動であなたを包み込む人' },
  FACG: { name: '小悪魔系の天然', emoji: '😈', catchphrase: '計算なしの行動力で、あなたの心を掴んで離さない人' },
  FASP: { name: 'クールビューティー', emoji: '❄️', catchphrase: 'クールに見えて、ここぞの行動で心を射抜く人' },
  FASG: { name: 'ミステリアスな冒険家', emoji: '🌙', catchphrase: '簡単には読めない、でもだからこそ惹かれる人' },
};

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('type') || 'LWCP';
  const data = types[code];

  if (!data) {
    return new Response('Not found', { status: 404 });
  }

  const origin = new URL(req.url).origin;
  const ogImageUrl = `${origin}/api/og?type=${code}`;
  const redirectUrl = `${origin}/#result/${code}`;

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>${data.name} - 本当に相性がいいパートナータイプ診断</title>
  <meta property="og:title" content="私の理想の相手は「${data.name}」${data.emoji}" />
  <meta property="og:description" content="${data.catchphrase}" />
  <meta property="og:image" content="${ogImageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${origin}/s/${code}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="私の理想の相手は「${data.name}」${data.emoji}" />
  <meta name="twitter:description" content="${data.catchphrase}" />
  <meta name="twitter:image" content="${ogImageUrl}" />
  <meta http-equiv="refresh" content="0;url=${redirectUrl}">
</head>
<body>
  <p>リダイレクト中...</p>
  <script>window.location.href="${redirectUrl}";</script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
