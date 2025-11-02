window.ModarAI = {
  async reply(text) {
    text = text.trim();
    if (!text) return "يرجى كتابة رسالة أولاً.";

    const rules = [
      { key: "صيانة", ans: "تم تسجيل بلاغ الصيانة وسيتم المتابعة فوراً." },
      { key: "فاتورة", ans: "الفاتورة تصدر في بداية كل شهر عبر لوحة التحكم." },
      { key: "إشغال", ans: "حالياً نسبة الإشغال تبلغ 92٪ من إجمالي العقارات." },
      { key: "مرحب", ans: "مرحباً! أنا مساعد Modar الذكي، كيف يمكنني خدمتك اليوم؟" },
    ];

    const rule = rules.find(r => text.includes(r.key));
    if (rule) return rule.ans;

    if (window.useOpenAI) {
      try {
        const response = await window.useOpenAI(text);
        if (response) return response;
      } catch (err) {
        console.error(err);
      }
    }
    return "تم استلام رسالتك، وسيتم الرد قريباً.";
  }
};
