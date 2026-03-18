export type Language = 'ru' | 'uz'

interface TimelineItem {
  time: string
  title: string
}

interface WeddingContent {
  meta: { title: string; description: string }
  controls: { musicOn: string; musicOff: string }
  preloader: { label: string; sublabel: string }
  hero: {
    groomName: string
    brideName: string
    weddingDay: string
    date: string
    scrollHint: string
  }
  invitation: {
    eyebrow: string
    title: string
    paragraphs: string[]
  }
  calendar: {
    eyebrow: string
    title: string
    monthName: string
    weekdays: [string, string, string, string, string, string, string]
  }
  venue: {
    eyebrow: string
    name: string
    address: string
    openMap: string
    note: string
  }
  timeline: {
    eyebrow: string
    title: string
    items: TimelineItem[]
  }
  dresscode: {
    eyebrow: string
    code: string
    wishes: string
  }
  countdown: {
    groomName: string
    brideName: string
    untilLabel: string
    completedLabel: string
    units: { days: string; hours: string; minutes: string; seconds: string }
  }
}

export const weddingDateIso = '2026-04-03T18:00:00+05:00'
export const mapEmbedUrl =
  'https://maps.app.goo.gl/iKpZJpydjRaYxvYY7'
export const mapDirectionsUrl =
  'https://maps.app.goo.gl/iKpZJpydjRaYxvYY7'

export const translations: Record<Language, WeddingContent> = {
  ru: {
    meta: {
      title: 'Озоджон и Аминабону — Свадьба 3 апреля 2026',
      description: 'Приглашение на свадьбу Озоджона и Аминабону, 3 апреля 2026, Ресторан Багишамал.',
    },
    controls: { musicOn: 'Музыка вкл.', musicOff: 'Музыка' },
    preloader: { label: 'Озоджон & Аминабону', sublabel: '3 апреля 2026' },
    hero: {
      groomName: 'Озоджон',
      brideName: 'Аминабону',
      weddingDay: 'Wedding Day',
      date: '03.04.2026 · пятница · 18:00',
      scrollHint: 'Листать',
    },
    invitation: {
      eyebrow: 'Дорогой гость',
      title: 'Вы особенны для нас',
      paragraphs: [
        'С трепетом в сердце мы приглашаем вас разделить с нами один из самых светлых дней нашей жизни — день, когда два сердца становятся одним.',
        'Именно ваше присутствие, тепло ваших улыбок и искренние слова наполнят этот весенний вечер особенным смыслом. Вы — тот человек, без которого наш праздник был бы неполным.',
        'Приходите, и вместе мы создадим воспоминания, которые останутся в сердцах на долгие годы.',
      ],
    },
    calendar: {
      eyebrow: 'Запомните дату',
      title: 'Апрель 2026',
      monthName: 'Апрель',
      weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    },
    venue: {
      eyebrow: 'Место проведения',
      name: 'Ресторан Багишамал',
      address: 'Ташкент',
      openMap: 'Карта',
      note: 'Просим прибыть за 20 минут до начала',
    },
    timeline: {
      eyebrow: 'Программа вечера',
      title: 'Расписание',
      items: [
        { time: '18:00', title: 'Сбор гостей' },
        { time: '18:30', title: 'Начало торжества' },
        { time: '21:15', title: 'Свадебный вальс' },
        { time: '22:30', title: 'Свадебный торт' },
        { time: '23:00', title: 'Завершение' },
      ],
    },
    dresscode: {
      eyebrow: 'Дресс-код и пожелания',
      code: 'Пастельная элегантность',
      wishes:
        'Рекомендуем оттенки пудры, шампани, шалфея и мягкие нейтральные тона. Приходите в нарядной одежде, которая подчеркнёт весеннее настроение вечера. Мы будем рады видеть вас улыбчивыми и полными любви.',
    },
    countdown: {
      groomName: 'Озоджон',
      brideName: 'Аминабону',
      untilLabel: 'До встречи через',
      completedLabel: 'Этот день настал!',
      units: { days: 'дней', hours: 'часов', minutes: 'минут', seconds: 'секунд' },
    },
  },

  uz: {
    meta: {
      title: "Ozodjon va Aminabonu — To'y 3-aprel 2026",
      description: "Ozodjon va Aminabonuning to'y taklifnomasi, 2026-yil 3-aprel, Restaran Bogishamol.",
    },
    controls: { musicOn: 'Musiqa yoq.', musicOff: 'Musiqa' },
    preloader: { label: 'Ozodjon & Aminabonu', sublabel: '2026-yil 3-aprel' },
    hero: {
      groomName: 'Ozodjon',
      brideName: 'Aminabonu',
      weddingDay: 'Wedding Day',
      date: '03.04.2026 · juma · 18:00',
      scrollHint: 'Pastga',
    },
    invitation: {
      eyebrow: 'Aziz mehmon',
      title: 'Siz biz uchun alohidasiz',
      paragraphs: [
        "Qalbimizdagi titroq bilan sizni hayotimizning eng yorqin kunlaridan birida — ikki yurakning birga qo'shilgan kunida — bizlar bilan birga bo'lishga taklif qilamiz.",
        "Aynan sizning ishtirokingiz, tabassum va samimiy so'zlaringiz bu bahoriy oqshomni alohida ma'noli qiladi. Siz bayramimizni to'liq qiladigan insonsiz.",
        "Kelinglar, birga abadiy xotiralar yaratamiz.",
      ],
    },
    calendar: {
      eyebrow: 'Sanani yodda saqlang',
      title: 'Aprel 2026',
      monthName: 'Aprel',
      weekdays: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'],
    },
    venue: {
      eyebrow: 'Joyi',
      name: 'Restaran Bogishamol',
      address: 'Toshkent',
      openMap: 'Xarita',
      note: '20 daqiqa oldin tashrif buyuring',
    },
    timeline: {
      eyebrow: 'Kecha dasturi',
      title: 'Reja',
      items: [
        { time: '18:00', title: 'Mehmonlar qabuli' },
        { time: '18:30', title: 'Tantana boshlanishi' },
        { time: '21:15', title: "To'y valssi" },
        { time: '22:30', title: "To'y torti" },
        { time: '23:00', title: 'Tugatish' },
      ],
    },
    dresscode: {
      eyebrow: 'Dress-code va tilaklar',
      code: 'Pastel elegance',
      wishes:
        "Pushti, shampan, sage va yumshoq neytral ranglar tavsiya etiladi. Bahor kayfiyatini aks ettiruvchi nozik kiyim kiyib kelishaniz so'raladi. Sizni tabassum va mehr bilan kutib olamiz.",
    },
    countdown: {
      groomName: 'Ozodjon',
      brideName: 'Aminabonu',
      untilLabel: "Ko'rishguncha",
      completedLabel: 'Bu kun keldi!',
      units: { days: 'kun', hours: 'soat', minutes: 'daqiqa', seconds: 'soniya' },
    },
  },
}
