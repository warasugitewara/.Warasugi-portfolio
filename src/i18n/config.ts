import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ja: {
    translation: {
      // Hero Section
      hero_subtitle: '何でも屋 / 都市クリエイター',
      hero_description: 'コード書いたり、街作ったり、時々迷ったり。北海道からデジタルフロンティアを開拓中。',
      btn_projects: 'プロジェクト',
      btn_connect: '接続',
      
      // Navigation
      nav_about: '自己紹介',
      nav_projects: 'プロジェクト',
      nav_skills: 'スキル',
      nav_social: 'ソーシャル',
      
      // About Section
      section_about: '自己紹介',
      about_title: '自称マルチクリエイター',
      about_desc1: 'コード、建築、デジタルアート。様々な創作活動に取り組む開発者です。Discord ボット、Minecraft プラグイン、フルスタック Web 開発、そして Minecraft での都市計画。',
      about_desc2: 'ユーザー体験を向上させるプロダクト作成に熱中しています。パフォーマンス、デザイン、イノベーションを追求し、クリーンで効率的なコードと美しいインターフェースを実現します。',
      
      // Projects Section
      section_projects: 'プロジェクト',
      proj_arabic_desc: 'Minecraft Paper 1.21.6 のサーバーチャットをアラビア語に翻訳するプラグイン',
      proj_discord_desc: 'Minecraft Quilt 1.21.10 のクライアントサイド Mod。ゲーム内チャットを Discord に中継します',
      proj_fitness_desc: 'フィットネストレーキングとトレーニング管理機能を備えた、メモリ効率的な Discord ボット',
      proj_shell_desc: 'Lua ベースのシェル楽曲制御ツール。コマンドラインから音楽を操る',
      proj_cities_desc: 'Cities Skylines 向けブラウザシミュレータ。2D で都市を設計・管理できる開発支援ツール',
      proj_muse_desc: '[Fork] MuseHeart Music Bot - Python で実装した Discord 用音楽ボット。Last.fm 連携や複数機能搭載（翻訳・カスタマイズ版）',
      view_github: 'GitHub で見る →',
      
      // Skills Section
      skills_title: '何してるの？',
      skill_languages: '言語',
      skill_web: 'Web',
      skill_gamedev: 'ゲーム開発',
      skill_urban: '都市設計',
      skill_tools: 'ツール・その他',
      
      // Social Section
      section_social: 'ソーシャル',
      social_desc: 'つながる',
    }
  },
  en: {
    translation: {
      hero_subtitle: 'Versatile Creator / Urban Designer',
      hero_description: 'Writing code, building cities, sometimes getting lost. Exploring digital frontiers from Hokkaido.',
      btn_projects: 'Projects',
      btn_connect: 'Connect',
      
      nav_about: 'About',
      nav_projects: 'Projects',
      nav_skills: 'Skills',
      nav_social: 'Social',
      
      section_about: 'About',
      about_title: 'Self-proclaimed Multi-Creator',
      about_desc1: 'Code, architecture, digital art. I engage in diverse creative pursuits. Discord bots, Minecraft plugins, full-stack web development, and urban planning in Minecraft.',
      about_desc2: 'I am passionate about creating products that enhance user experience. Pursuing performance, design, and innovation—delivering clean, efficient code and beautiful interfaces.',
      
      section_projects: 'Projects',
      proj_arabic_desc: 'Minecraft Paper 1.21.6 server chat translator to Arabic plugin',
      proj_discord_desc: 'Minecraft Quilt 1.21.10 client-side mod relaying in-game chat to Discord',
      proj_fitness_desc: 'Memory-efficient Discord bot with fitness tracking and training management',
      proj_shell_desc: 'Lua-based shell music control tool. Command your music from the terminal',
      proj_cities_desc: 'Browser-based simulator for Cities Skylines. Design and manage 2D cities with this development support tool',
      proj_muse_desc: '[Fork] MuseHeart Music Bot - Discord music bot powered by Python. Features Last.fm integration and multiple playback options (translated & customized version)',
      view_github: 'View on GitHub →',
      
      skills_title: 'What do I do?',
      skill_languages: 'Languages',
      skill_web: 'Web',
      skill_gamedev: 'Game Dev',
      skill_urban: 'Urban Design',
      skill_tools: 'Tools & More',
      
      section_social: 'Social',
      social_desc: 'Connect with me',
    }
  },
  ar: {
    translation: {
      hero_subtitle: 'منشئ متعدد المواهب / مصمم حضري',
      hero_description: 'كتابة الأكواد، بناء المدن، أحياناً أتيه. استكشاف الحدود الرقمية من هوكايدو.',
      btn_projects: 'المشاريع',
      btn_connect: 'تواصل',
      
      nav_about: 'عني',
      nav_projects: 'المشاريع',
      nav_skills: 'المهارات',
      nav_social: 'التواصل الاجتماعي',
      
      section_about: 'عني',
      about_title: 'منشئ متعدد الاهتمامات',
      about_desc1: 'الأكواد، العمارة، الفن الرقمي. أنا منخرط في مختلف الأنشطة الإبداعية. بوتات Discord، ملحقات Minecraft، تطوير ويب كامل، والتخطيط الحضري في Minecraft.',
      about_desc2: 'أنا شغوف بإنشاء منتجات تعزز تجربة المستخدم. السعي للحصول على الأداء والتصميم والابتكار - تقديم أكواد نظيفة وفعالة وواجهات جميلة.',
      
      section_projects: 'المشاريع',
      proj_arabic_desc: 'ملحق ترجمة دردشة خادم Minecraft Paper 1.21.6 إلى اللغة العربية',
      proj_discord_desc: 'ملحق جانب العميل Minecraft Quilt 1.21.10 يعيد بث دردشة اللعبة إلى Discord',
      proj_fitness_desc: 'بوت Discord فعال في الذاكرة مع تتبع اللياقة البدنية وإدارة التدريب',
      proj_shell_desc: 'أداة تحكم موسيقى الأصداف القائمة على Lua. تحكم بموسيقاك من سطر الأوامر',
      proj_cities_desc: 'محاكي متصفح لـ Cities Skylines. صمم وأدر المدن ثنائية الأبعاد باستخدام أداة دعم التطوير هذه',
      proj_muse_desc: '[Fork] MuseHeart Music Bot - بوت موسيقى Discord مدعوم بـ Python. يتميز بتكامل Last.fm وخيارات تشغيل متعددة (نسخة مترجمة ومخصصة)',
      view_github: 'عرض على GitHub →',
      
      skills_title: 'ماذا أفعل؟',
      skill_languages: 'اللغات',
      skill_web: 'الويب',
      skill_gamedev: 'تطوير الألعاب',
      skill_urban: 'التصميم الحضري',
      skill_tools: 'الأدوات والمزيد',
      
      section_social: 'التواصل',
      social_desc: 'تواصل معي',
    }
  }
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'ja',
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;
