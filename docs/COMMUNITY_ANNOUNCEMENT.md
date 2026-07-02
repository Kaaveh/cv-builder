# Community Announcement — CV Builder MVP

> Ready-to-post announcements for the Tech Immigrants community.
> Pick the version that fits the channel. Personalize the closing line.

---

## Short — Persian (Telegram)

```text
🚀 اولین MVP ابزار CV Builder آماده‌ی تست شد.

چی هست؟
ابزاری برای ارزیابی رزومه. رزومه‌ات رو paste می‌کنی (به‌علاوه‌ی آگهی شغلی اختیاری)،
ابزار در ۶ بُعد امتیاز می‌ده و مشکلات مهم رو با راه‌حل نشون می‌ده.

چی نیست؟
سازنده‌ی رزومه نیست. رزومه رو نمی‌نویسه و بازنویسی نمی‌کنه. فقط ارزیابی می‌کنه.

حریم خصوصی:
همه‌چیز توی مرورگر خودت اجرا می‌شه. چیزی به سرور فرستاده نمی‌شه.

نصب و اجرا:
docs/LOCAL_DEMO.md رو بخون. کل فرایند کمتر از ۵ دقیقه‌ست.

نظر و فیدبک:
اگه تست کردی، توی issues گیت‌هاب بگو چی دیدی.
⚠️ رزومه‌ی واقعی‌ات رو paste نکن — اول بی‌نامش کن (راهنما: docs/FEEDBACK_GUIDE.md).

تشکر از همه‌ی کسانی که توی این نسخه مشارکت کردن.
```

---

## Longer — Persian (Telegram / LinkedIn)

```text
🎉 اولین نسخه‌ی MVP پروژه‌ی CV Builder آماده‌ی تست توسط جامعه‌ی Tech Immigrants شد.

📌 این ابزار چی هست؟
CV Builder یک ارزیاب رایگان و open-source برای رزومه‌ست.
- رزومه‌ات رو paste می‌کنی (متن ساده یا Markdown)، اختیاری هم آگهی شغلی رو اضافه می‌کنی.
- ابزار شش بُعد رو بررسی می‌کنه:
  Shipped Evidence، Quantified Impact، Tooling Visibility، ATS Compatibility،
  Keyword Match، Public Proof.
- یک امتیاز کلی از ۰ تا ۵ می‌ده، به‌علاوه‌ی لیستی از مشکلات با اولویت بالا و
  راه‌حل پیشنهادی برای هرکدوم.
- archetype (نقش) شما رو هم تشخیص می‌ده (Backend Engineer، Frontend Engineer،
  AI Product Manager و ...).

🔐 حریم خصوصی
همه‌چیز توی مرورگر خودت یا روی کامپیوترت اجرا می‌شه. هیچ داده‌ای به سرور
فرستاده نمی‌شه. هیچ telemetry یا analytics نداریم. هیچ cookie نمی‌گذاریم.
نتایج فقط توی localStorage مرورگر ذخیره می‌شن.

⚠️ این ابزار چی نیست؟
- سازنده‌ی رزومه نیست — رزومه‌ی موجودت رو ارزیابی می‌کنه، نمی‌سازه.
- بازنویسی یا tailor نمی‌کنه.
- PDF رو پشتیبانی نمی‌کنه (فقط .txt و .md).
- هنوز hosted version نداره. فقط لوکال.

🚀 چطور تست کنم؟
کل فرایند کمتر از ۵ دقیقه‌ست:
1. مخزن رو clone کن: github.com/TechImmigrants/cv-builder
2. pnpm install
3. pnpm dev → http://localhost:3000
راهنمای کامل: docs/LOCAL_DEMO.md

همچنین می‌تونی CLI رو امتحان کنی:
node packages/cli/dist/cli.js evaluate path/to/cv.md
(بعد از pnpm --filter @cv-builder/cli build)

📝 فیدبک
از همه‌ی تست‌کننده‌ها می‌خوایم که بعد از امتحان کردن، توی issues گیت‌هاب
بنویسن. این پنج سوال بیشترین کمک رو می‌کنه:
1. آیا فیدبک‌ها مفید بودن؟
2. آیا امتیاز قابل‌فهم بود؟
3. چه چیزی از نتیجه کم بود؟
4. آیا برای رزومه‌ی خودت به این ابزار اعتماد می‌کنی؟
5. چه نقش / archetype دیگه‌ای باید اضافه کنیم؟

⚠️ نکته‌ی مهم: لطفاً رزومه‌ی واقعی‌ات رو توی issues گیت‌هاب paste نکن.
Issues عمومی هستن. اول بی‌نامش کن:
- اسم خودت → "Candidate A"
- اسم شرکت‌ها → "Company X"
- شماره تماس، ایمیل، آدرس → حذف
راهنمای کامل: docs/FEEDBACK_GUIDE.md

🙏 تشکر
این نسخه حاصل کار جمعی از اعضای جامعه‌ی Tech Immigrants و contributorهای
open-source هست. تشکر ویژه از همه‌ی کسانی که PR، rule، archetype، skill، یا
doc اضافه کردن. مشارکت شما دلیل اینکه این پروژه به اینجا رسیده.

منتظر فیدبک‌هاتون هستیم. 🙌
```

---

## Short — English (Telegram / Discord)

```text
🚀 First MVP of CV Builder is ready for community testing.

What it is: an open-source CV evaluator. Paste a CV (and optionally a JD),
get a 0–5 score across six dimensions, plus a prioritised list of issues
with concrete fixes.

What it isn't: it does not generate, tailor, or rewrite a CV. It scores
what you have.

Privacy: everything runs in your browser or on your machine. No server,
no telemetry, no analytics, no cookies.

How to test:
1. Clone github.com/TechImmigrants/cv-builder
2. pnpm install
3. pnpm dev → http://localhost:3000
Full guide: docs/LOCAL_DEMO.md

Feedback welcome. Please anonymize your CV before sharing examples in
GitHub issues (see docs/FEEDBACK_GUIDE.md).

Thanks to every contributor who made this possible. 🙌
```

---

## How to personalize

Replace the closing line with one of:

- "Sahar از Tech Immigrants" — for a maintainer-signed post
- Your handle + "Tech Immigrants community manager" — for a community-manager post
- Nothing — for an automated bot announcement

If posting on LinkedIn, add a short paragraph about why this matters to
immigrant tech professionals (English-language CVs are an uneven playing
field; a privacy-first local tool lowers the bar to getting useful feedback
on a CV).

## Posting checklist

Before posting:

- [ ] Confirm `pnpm install && pnpm dev` works on a fresh clone
- [ ] Confirm `pnpm test && pnpm lint && pnpm build` all pass
- [ ] Confirm the home page copy is honest (matches docs/MVP_DEMO_PLAN.md)
- [ ] Confirm the `/feedback` page exists and renders correctly
- [ ] Confirm the privacy note is visible on the home page
- [ ] Pick the announcement length that fits the channel
- [ ] Replace the closing line with your sign-off

After posting:

- [ ] Pin the announcement in the channel
- [ ] Link to docs/LOCAL_DEMO.md and docs/FEEDBACK_GUIDE.md
- [ ] Watch the issues feed for the first 24 hours