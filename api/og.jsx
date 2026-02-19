import { ImageResponse } from '@vercel/og';

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
    return new Response('Invalid type', { status: 400 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fff1f2 0%, #fce7f3 50%, #fff7ed 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative dots */}
        <div style={{ position: 'absolute', top: 40, left: 60, fontSize: 32, opacity: 0.15, display: 'flex' }}>💕</div>
        <div style={{ position: 'absolute', top: 80, right: 100, fontSize: 24, opacity: 0.12, display: 'flex' }}>💗</div>
        <div style={{ position: 'absolute', bottom: 100, left: 120, fontSize: 28, opacity: 0.1, display: 'flex' }}>✨</div>
        <div style={{ position: 'absolute', bottom: 60, right: 80, fontSize: 26, opacity: 0.12, display: 'flex' }}>💘</div>

        {/* Main card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 32,
            padding: '48px 64px',
            boxShadow: '0 8px 32px rgba(244, 63, 94, 0.12)',
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 16, display: 'flex' }}>{data.emoji}</div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
              background: 'linear-gradient(90deg, #e11d48, #ec4899)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 12,
              display: 'flex',
            }}
          >
            {data.name}
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#6b7280',
              maxWidth: 600,
              textAlign: 'center',
              lineHeight: 1.5,
              display: 'flex',
            }}
          >
            {data.catchphrase}
          </div>
        </div>

        {/* Branding */}
        <div
          style={{
            marginTop: 32,
            fontSize: 18,
            color: '#f43f5e',
            letterSpacing: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          💕 本当に相性がいいパートナータイプ診断
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
