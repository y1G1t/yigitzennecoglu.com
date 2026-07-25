// =============================================
// İÇERİK VERİSİ — Yeni yazı eklemek için bu dosyayı düzenleyin
// =============================================

const SITE = {
  name: "Yiğit Zennecioğlu",
  title: "Yiğit Zennecioğlu — Kişisel Site",
  email: "yigitzennecioglu310@gmail.com"
};

const BLOGS = [
  {
    id: "ilk-yazi",
    title: "İlk Blog Yazım",
    date: "2026-04-03",
    tags: ["kişisel"],
    summary: "Bu alana kısa bir giriş ve burada neler paylaşmayı planladığım üzerine.",
    body: `
      <p>İnternetteki köşeme hoş geldiniz. Uzun zamandır yazmaya başlamak istiyordum ve sonunda buradayız.</p>
      <p>Bu site; düşüncelerimi, öğrendiklerimi, çektiğim fotoğrafları ve paylaşmaya değer bulduğum her şeyi koyduğum bir yer.</p>
      <p>Haftada bir yazmaya çalışacağım. Bazı yazılar uzun, bazıları kısa olacak. Kural yok, sadece yazmak var.</p>
    `
  },
  {
    id: "yurumek-uzerine",
    title: "Yürümek Üzerine",
    date: "2026-03-28",
    tags: ["düşünce"],
    summary: "Hedefsiz yürümenin neden en hafife alınan şeylerden biri olduğu üzerine.",
    body: `
      <p>Hedefsiz yürümenin zihni açan bir yanı var; başka hiçbir şey bunu bu kadar iyi yapamıyor.</p>
      <blockquote>Gerçekten büyük tüm düşünceler yürürken doğar. — Nietzsche</blockquote>
      <p>Akşamları daha uzun yürüyüşler yapmaya başladım. Telefon yok, podcast yok. Sadece hareket ve akla gelmeye karar veren düşünceler.</p>
      <p>Tavsiye ederim.</p>
    `
  }
];

const THOUGHTS = [
  {
    id: "dusunce-1",
    date: "2026-04-02",
    text: "En iyi fikirler, onları bulmaya çalışmadığın anlarda gelir."
  },
  {
    id: "dusunce-2",
    date: "2026-03-30",
    text: "Son zamanlarda daha çok basılı kitap okuyorum. Ekranların taklit edemediği bir dokusu var bu deneyimin."
  },
  {
    id: "dusunce-3",
    date: "2026-03-25",
    text: "Sadelik karmaşıklığın yokluğu değil — onun öteki yüzü."
  }
];

const GALLERY = [
  { id: "foto-1", src: "images/placeholder-1.svg", caption: "Sabah ışığı", date: "2026-04-01" },
  { id: "foto-2", src: "images/placeholder-2.svg", caption: "Sokak köşesi", date: "2026-03-27" },
  { id: "foto-3", src: "images/placeholder-3.svg", caption: "Sakin bir öğleden sonra", date: "2026-03-20" }
];

const BIO = {
  name: SITE.name,
  photo: "images/profile.svg",
  intro: "Yazan, düşünen, küçük şeyleri gözlemleyen biri.",
  sections: [
    {
      heading: "Hakkımda",
      text: "Yazmayı, fotoğraf çekmeyi ve dünyayı her seferinde bir düşünceyle anlamlandırmayı seven biriyim. Bu site; ilginç, anlamlı ya da sadece hatırlamaya değer bulduklarımı paylaştığım kişisel alanım."
    },
    {
      heading: "Ne Yapıyorum",
      text: "Gündüzleri kendi alanımda çalışıyorum. Onun dışında okuyor, yürüyor, fotoğraf çekiyor ve dikkatimi çeken her şey hakkında yazıyorum."
    },
    {
      heading: "İletişim",
      text: `Bana ${SITE.email} adresinden ulaşabilir ya da sosyal medyada bulabilirsiniz.`
    }
  ]
};
