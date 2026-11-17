const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Gunakan metode POST' });
  }

  try {
    const { pesan } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: pesan,
      config: {
        systemInstruction:
          'Kamu adalah AI Coach bulu tangkis untuk siswa SMK PJOK. Jawab pertanyaan seputar teknik pukulan, biomekanika, strategi, dan aturan bulu tangkis dengan bahasa Indonesia yang jelas, singkat, dan memotivasi.',
      },
    });

    res.status(200).json({ jawaban: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menghubungi AI Coach' });
  }
};
