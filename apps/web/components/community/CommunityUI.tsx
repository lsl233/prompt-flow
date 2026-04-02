import {
  ArrowRight,
  CheckCircle2,
  Flame,
  Layers3,
  Sparkles,
  Star,
} from "lucide-react";
import { ImportButton } from "@/components/ImportButton";
import { PromptWorkbench } from "@/components/community/PromptWorkbench";
import { Link } from "@/i18n/navigation";
import type {
  CommunityPrompt,
  PromptCategory,
  PromptTag,
} from "@/types/prompt";

type SupportedLocale = "en" | "zh";

export type CommunityDictionary = ReturnType<typeof getCommunityDictionary>;

export function getCommunityDictionary(locale: string) {
  const normalizedLocale: SupportedLocale = locale === "zh" ? "zh" : "en";

  if (normalizedLocale === "zh") {
    return {
      meta: {
        indexTitle: "Prompt 社区 | PromptFlow",
        indexDescription:
          "浏览社区精选 Prompt，按主题、标签和详情页静态查看完整内容。",
        featured: "精选 Prompt",
        latest: "最新收录",
        categories: "主题分区",
        tags: "热门标签",
        related: "相关 Prompt",
      },
      buttons: {
        copy: "复制 Prompt",
        copied: "已复制",
        import: "导入到 PromptFlow",
        importSuccess: "已导入",
        installPrompt: "请先安装 PromptFlow 插件",
        view: "查看详情",
        browseCategory: "进入分类",
        browseTag: "查看标签",
        explore: "继续探索",
      },
      labels: {
        featured: "精选",
        verified: "已验证",
        variable: "变量",
        useCase: "使用场景",
        exampleInput: "示例输入",
        exampleOutput: "示例输出",
        targetModels: "适用模型",
        difficulty: "难度",
        promptType: "类型",
        author: "作者",
        updated: "收录时间",
        prompts: "条 Prompt",
        allPrompts: "全部 Prompt",
        noItems: "暂无内容",
        likes: "喜欢",
      },
      difficulty: {
        beginner: "入门",
        intermediate: "进阶",
        advanced: "高级",
      },
      promptType: {
        template: "模板",
        workflow: "工作流",
        assistant: "助手",
        generator: "生成器",
      },
      categoryNames: {
        writing: "写作",
        coding: "编程",
        image: "图像",
        other: "工作流",
      },
      home: {
        eyebrow: "Prompt Community",
        title: "把 Prompt 社区做成一份可浏览、可复制、可导入的静态目录",
        description:
          "这版页面聚焦 MVP 的浏览体验：先把首页、详情页、分类页和标签页搭清楚，再承接后续 JSON 内容源与 SEO。",
        stats: [
          { label: "精选 Prompt", value: "08" },
          { label: "核心分类", value: "04" },
          { label: "主题标签", value: "06" },
        ],
        faqTitle: "MVP 常见问题",
        ctaTitle: "先把静态浏览体验打磨出来",
        ctaDescription:
          "用户现在就能按分类、标签和详情页浏览 Prompt，复制或导入路径也已经保留。",
      },
      // 社区首页索引页
      indexPage: {
        browseEntry: {
          title: "浏览入口",
          description: "先进入分类索引或标签索引，用户会更清楚社区内容的组织方式。",
          categoryLink: "进入分类索引",
          tagLink: "进入标签索引",
        },
        categorySection: {
          title: "主题分区",
          description: "用主题分区组织浏览路径，先让用户知道这里有什么，再决定点进哪类 Prompt。",
        },
        tagSection: {
          title: "热门标签",
          description: "标签页承担专题聚合和内链入口的角色，适合从用途、平台和场景出发继续深入。",
        },
        featuredSection: {
          title: "精选 Prompt",
          description: "首页第一屏之后优先展示代表性 Prompt，让用户快速理解社区内容质量。",
        },
        latestSection: {
          title: "最新收录",
          description: "保留最新收录区块，后续接入 JSON 内容源后可以自然过渡为真实更新流。",
        },
        faqSection: {
          title: "常见问题",
          description: "这版先解决结构和体验，不急着把动态能力全塞进来。",
        },
      },
      // 分类索引页
      categoryIndexPage: {
        metaTitle: "Prompt 分类 | PromptFlow",
        metaDescription: "查看 Prompt 社区所有分类入口，按主题浏览写作、编程、图像和工作流内容。",
        eyebrow: "Category Index",
        title: "先按主题理解社区，再进入具体 Prompt",
        description: "分类页是社区的信息骨架。先看清每个主题覆盖什么内容，再决定往哪个方向深入，会比在海量 Prompt 里直接搜索更高效。",
        allCategoriesTitle: "全部分类",
        allCategoriesDescription: "每个分类页都应该是独立入口页，而不是只有详情页的附属导航。",
        tagsDescription: "如果用户想从专题而不是主题切入，可以继续进入标签索引。",
        ctaTitle: "继续进入具体分类页",
        statLabels: {
          categories: "分类数",
          prompts: "Prompt 总量",
          tags: "热门标签",
        },
      },
      // 标签索引页
      tagIndexPage: {
        metaTitle: "Prompt 标签 | PromptFlow",
        metaDescription: "浏览 Prompt 社区全部标签入口，按专题、平台和场景继续探索内容。",
        eyebrow: "Tag Index",
        title: "按专题、平台和场景串联 Prompt",
        description: "标签页负责把横向关系串起来。它不是分类的替代品，而是帮助用户从一个语境跳到另一个语境的索引层。",
        allTagsTitle: "全部标签",
        allTagsDescription: "标签入口页让 `/community/tag` 成为真实目录，而不只是一个动态 slug 容器。",
        ctaTitle: "继续按标签深入浏览",
        statLabels: {
          tags: "标签数",
          featured: "精选标签",
          categories: "覆盖分类",
        },
      },
      detail: {
        breadcrumbs: {
          community: "社区",
          category: "分类",
        },
        promptTitle: "提示词内容",
        variablesTitle: "变量设置",
        examplesTitle: "示例参考",
        copyTemplate: "复制模板",
        copyFilled: "复制填充后的 Prompt",
        reset: "重置",
        variableHint: "填写变量并实时预览",
        required: "必填",
        relatedTitle: "继续看这些 Prompt",
        relatedDescription: "相关 Prompt 先按分类和标签相似度做静态推荐，后续再替换成真实的相关推荐策略。",
      },
      // 分类详情页
      categoryPage: {
        eyebrow: "Category Lens",
        featuredTitle: "精选",
        featuredDescription: "分类页负责把同一主题下的 Prompt 放到一个明确的上下文里，用户不需要回到首页再理解内容范围。",
        tagsTitle: "相关标签",
        tagsDescription: "相关标签用于继续收窄或扩展内容视角，承担分类页的内链角色。",
        faqTitle: "这个分类包含什么",
        faqDescription: "分类页也要有解释能力，而不是只堆列表。",
        faqItems: [
          {
            question: "这个分类适合谁看？",
            answer: "如果你主要在做{CATEGORY}相关工作，这一页就是最短路径。",
          },
          {
            question: "为什么还要展示标签？",
            answer: "因为分类负责大方向，标签负责专题和语境，两者一起才能形成可浏览的内链结构。",
          },
          {
            question: "后续可以接什么？",
            answer: "后续可以直接接入 JSON 内容源、静态参数、ItemList JSON-LD 和搜索过滤。",
          },
        ],
        ctaTitle: "继续从这个主题延展",
      },
      // 标签详情页
      tagPage: {
        eyebrow: "Topic Track",
        relatedTitle: "相关 Prompt",
        relatedDescription: "标签页承担专题页角色，用一个具体主题把分散在不同分类中的 Prompt 串起来。",
        relatedCategories: "相关分类",
        relatedCategoriesDescription: "如果用户是从专题切入，分类链接可以帮助他们回到更稳定的浏览结构。",
        relatedTags: "相近标签",
        relatedTagsDescription: "相近标签让标签页之间形成图状关系，这也是后续 SEO 和内链扩展的基础。",
        ctaTitle: "继续按标签串联浏览",
      },
      faq: [
        {
          question: "这些页面现在是静态的吗？",
          answer:
            "是。当前内容直接来自本地数据文件，适合先把结构、组件和路由稳定下来。",
        },
        {
          question: "用户现在能做什么？",
          answer:
            "可以浏览首页、进入分类和标签页、查看详情，并直接复制或导入 Prompt。",
        },
        {
          question: "为什么先做静态版本？",
          answer:
            "先把信息架构和视觉层搭稳，后续接 JSON 内容源、SEO 和内链时成本更低。",
        },
      ],
    };
  }

  return {
    meta: {
      indexTitle: "Prompt Community | PromptFlow",
      indexDescription:
        "Browse static MVP community pages for prompts, categories, tags, and detail views.",
      featured: "Featured prompts",
      latest: "Latest prompts",
      categories: "Category lanes",
      tags: "Hot tags",
      related: "Related prompts",
    },
    buttons: {
      copy: "Copy prompt",
      copied: "Copied",
      import: "Import to PromptFlow",
      importSuccess: "Imported",
      installPrompt: "Install the PromptFlow extension first",
      view: "Open detail",
      browseCategory: "Open category",
      browseTag: "Open tag",
      explore: "Explore more",
    },
    labels: {
      featured: "Featured",
      verified: "Verified",
      variable: "Variable",
      useCase: "Use case",
      exampleInput: "Example input",
      exampleOutput: "Example output",
      targetModels: "Target models",
      difficulty: "Difficulty",
      promptType: "Prompt type",
      author: "Author",
      updated: "Published",
      prompts: "prompts",
      allPrompts: "All prompts",
      noItems: "Nothing here yet",
      likes: "likes",
    },
    difficulty: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    },
    promptType: {
      template: "Template",
      workflow: "Workflow",
      assistant: "Assistant",
      generator: "Generator",
    },
    categoryNames: {
      writing: "Writing",
      coding: "Coding",
      image: "Image",
      other: "Workflow",
    },
    home: {
      eyebrow: "Prompt Community",
      title:
        "A static MVP directory for browsing, copying, and importing prompts",
      description:
        "This version focuses on structure first: a stronger landing page, detail pages, category pages, and tag pages that can later plug into JSON content and SEO.",
      stats: [
        { label: "Featured prompts", value: "08" },
        { label: "Core categories", value: "04" },
        { label: "Topic tags", value: "06" },
      ],
      faqTitle: "MVP FAQ",
      ctaTitle: "Ship the browsing layer first",
      ctaDescription:
        "Users can already browse by category, tag, and detail page, with copy and import paths kept intact.",
    },
    // Community index page
    indexPage: {
      browseEntry: {
        title: "Browse entry points",
        description: "Give users explicit category and tag indexes so the information hierarchy is clear before they drill down.",
        categoryLink: "Open category index",
        tagLink: "Open tag index",
      },
      categorySection: {
        title: "Category lanes",
        description: "Browse the community by theme first: writing, coding, image, and workflow.",
      },
      tagSection: {
        title: "Hot tags",
        description: "Browse by topic, platform, and use case to connect prompts across categories.",
      },
      featuredSection: {
        title: "Featured prompts",
        description: "Highlight representative prompts right after the hero so users quickly understand the community quality.",
      },
      latestSection: {
        title: "Latest prompts",
        description: "A static section for now; can transition to a live update stream once JSON content is integrated.",
      },
      faqSection: {
        title: "FAQ",
        description: "This version focuses on structure and UX first — dynamic features can come later.",
      },
    },
    // Category index page
    categoryIndexPage: {
      metaTitle: "Prompt Categories | PromptFlow",
      metaDescription: "Browse all prompt community categories and explore writing, coding, image, and workflow collections.",
      eyebrow: "Category Index",
      title: "Start with themes before diving into individual prompts",
      description: "Categories are the structural layer of the community. Start with the broad theme, then drill into the prompts that matter.",
      allCategoriesTitle: "All categories",
      allCategoriesDescription: "Each category should work as a real entry page, not just a supporting navigation node.",
      tagsDescription: "If users prefer topic-based browsing instead of category-based browsing, the tag index is the next layer.",
      ctaTitle: "Continue into a category page",
      statLabels: {
        categories: "Categories",
        prompts: "Prompts",
        tags: "Hot tags",
      },
    },
    // Tag index page
    tagIndexPage: {
      metaTitle: "Prompt Tags | PromptFlow",
      metaDescription: "Browse all prompt community tags and explore prompts by topic, platform, and scenario.",
      eyebrow: "Tag Index",
      title: "Connect prompts through topics, platforms, and scenarios",
      description: "Tags connect prompts across categories. They are not a replacement for categories, but the cross-topic layer that keeps browsing fluid.",
      allTagsTitle: "All tags",
      allTagsDescription: "This index makes `/community/tag` a real directory page instead of just a dynamic slug container.",
      ctaTitle: "Keep exploring through tags",
      statLabels: {
        tags: "Tags",
        featured: "Featured",
        categories: "Categories",
      },
    },
    detail: {
      breadcrumbs: {
        community: "Community",
        category: "Category",
      },
      promptTitle: "Prompt body",
      variablesTitle: "Variables",
      examplesTitle: "Examples",
      copyTemplate: "Copy template",
      copyFilled: "Copy filled prompt",
      reset: "Reset",
      variableHint: "Set values and preview live",
      required: "Required",
      relatedTitle: "Keep browsing",
      relatedDescription: "Related prompts are statically recommended by category and tag similarity — will be replaced with real recommendations later.",
    },
    // Category detail page
    categoryPage: {
      eyebrow: "Category Lens",
      featuredTitle: "Featured",
      featuredDescription: "Categories put prompts in a clear context so users don't need to return to the home page to understand the content scope.",
      tagsTitle: "Related tags",
      tagsDescription: "Related tags narrow or expand the content perspective, serving as the internal linking layer for category pages.",
      faqTitle: "What lives in this lane",
      faqDescription: "Category pages also need explanatory power, not just listings.",
      faqItems: [
        {
          question: "Who should browse this lane?",
          answer: "If your workflow centers on {CATEGORY}, this is the fastest entry point.",
        },
        {
          question: "Why show tags here?",
          answer: "Categories set the lane, while tags expose the context and subtopics needed for internal linking.",
        },
        {
          question: "What can plug in later?",
          answer: "Later this page can plug into JSON content, static params, ItemList JSON-LD, and search filters.",
        },
      ],
      ctaTitle: "Keep exploring this theme",
    },
    // Tag detail page
    tagPage: {
      eyebrow: "Topic Track",
      relatedTitle: "Related prompts",
      relatedDescription: "Tag pages act as topic pages, connecting prompts scattered across different categories under a specific theme.",
      relatedCategories: "Related categories",
      relatedCategoriesDescription: "If users enter from a topic, category links help them return to a more stable browsing structure.",
      relatedTags: "Related tags",
      relatedTagsDescription: "Related tags form a graph between tag pages — this is the foundation for future SEO and internal linking.",
      ctaTitle: "Follow the tag graph",
    },
    faq: [
      {
        question: "Are these pages static right now?",
        answer:
          "Yes. They use local data so the information architecture and components can stabilize first.",
      },
      {
        question: "What can users do already?",
        answer:
          "Browse the index, open category and tag pages, inspect full prompt details, then copy or import a prompt.",
      },
      {
        question: "Why ship static pages first?",
        answer:
          "It de-risks the content model and visual system before JSON ingestion, SEO, and deeper internal linking.",
      },
    ],
  };
}

export function CommunityHero({
  eyebrow,
  title,
  description,
  stats,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border-subtle)]">
      <div className="absolute inset-0 grid-pattern opacity-35" />
      <div className="absolute left-[-10%] top-12 h-80 w-80 rounded-full bg-cyan-300/10 blur-[120px]" />
      <div className="absolute right-[-5%] top-0 h-[28rem] w-[28rem] rounded-full bg-emerald-300/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-secondary)]/80 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-accent-primary)]">
              <Sparkles className="h-4 w-4" />
              <span>{eyebrow}</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
              {description}
            </p>
            {children ? (
              <div className="mt-8 flex flex-wrap gap-3">{children}</div>
            ) : null}
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-[1.75rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]/80 p-5 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)]">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-[var(--color-text-tertiary)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
        <Layers3 className="h-3.5 w-3.5" />
        <span>{title}</span>
      </div>
      {description ? (
        <p className="text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function CategoryGrid({
  categories,
  promptsByCategory,
  dictionary,
}: {
  categories: PromptCategory[];
  promptsByCategory: Record<string, CommunityPrompt[]>;
  dictionary: CommunityDictionary;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/community/category/${category.slug}`}
          className="group relative overflow-hidden rounded-[2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] p-6 transition-transform duration-300 hover:-translate-y-1"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-70`}
          />
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-tertiary)]">
                  {dictionary.categoryNames[category.slug]}
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
                  {category.title}
                </h3>
              </div>
              <ArrowRight className="h-5 w-5 text-[var(--color-text-tertiary)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-text-primary)]" />
            </div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-text-secondary)]">
              {category.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {category.featuredTagSlugs.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-[var(--color-text-primary)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm">
              <span className="text-[var(--color-text-tertiary)]">
                {promptsByCategory[category.slug]?.length ?? 0}{" "}
                {dictionary.labels.prompts}
              </span>
              <span className="text-[var(--color-text-primary)]">
                {dictionary.buttons.browseCategory}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function HotTagsRow({ tags }: { tags: PromptTag[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={`/community/tag/${tag.slug}`}
          className="group rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] px-4 py-3 text-sm text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-accent-primary)]/40 hover:text-[var(--color-text-primary)]"
        >
          <span className="font-medium text-[var(--color-text-primary)]">
            #{tag.slug}
          </span>
          <span className="mx-2 text-[var(--color-text-tertiary)]">/</span>
          <span>{tag.description}</span>
        </Link>
      ))}
    </div>
  );
}

export function PromptCard({
  prompt,
  dictionary,
}: {
  prompt: CommunityPrompt;
  dictionary: CommunityDictionary;
}) {
  return (
    <article className="group flex h-full flex-col rounded-[2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] p-6 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
          <Flame className="h-3.5 w-3.5 text-[var(--color-accent-primary)]" />
          <span>{dictionary.categoryNames[prompt.category]}</span>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-[var(--color-text-primary)]">
            {prompt.likes}
          </div>
          <div className="text-xs text-[var(--color-text-tertiary)]">{dictionary.labels.likes}</div>
        </div>
      </div>

      <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
        {prompt.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
        {prompt.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {prompt.tags.map((tag) => (
          <Link
            key={tag}
            href={`/community/tag/${tag}`}
            className="rounded-full border border-[var(--color-border-subtle)] px-3 py-1 text-xs text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            #{tag}
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[var(--color-text-tertiary)]">
        <span>{prompt.author}</span>
        {prompt.verified ? (
          <>
            <span className="h-1 w-1 rounded-full bg-[var(--color-border-strong)]" />
            <span>{dictionary.labels.verified}</span>
          </>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-[var(--color-border-subtle)] pt-5">
        <Link
          href={`/community/${prompt.slug}`}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-subtle)] px-4 py-3 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent-primary)]/40"
        >
          <Star className="h-4 w-4 text-[var(--color-accent-primary)]" />
          <span>{dictionary.buttons.view}</span>
        </Link>
        <ImportButton
          promptId={prompt.id}
          t={{
            import: dictionary.buttons.import,
            importSuccess: dictionary.buttons.importSuccess,
            installPrompt: dictionary.buttons.installPrompt,
          }}
        />
      </div>
    </article>
  );
}

export function PromptGrid({
  prompts,
  dictionary,
}: {
  prompts: CommunityPrompt[];
  dictionary: CommunityDictionary;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {prompts.map((prompt) => (
        <PromptCard key={prompt.slug} prompt={prompt} dictionary={dictionary} />
      ))}
    </div>
  );
}

export function CommunityFAQ({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.question}
          className="rounded-[1.75rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] p-6"
        >
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {item.question}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}

export function CommunityCTA({
  title,
  description,
  dictionary,
}: {
  title: string;
  description: string;
  dictionary: CommunityDictionary;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border-strong)] bg-[var(--color-bg-secondary)] px-6 py-8 sm:px-8 lg:px-10">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[var(--color-accent-primary)]/10 blur-[90px]" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-accent-primary)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{dictionary.buttons.explore}</span>
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)]">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/community"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--color-accent-primary)] px-5 py-3 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
          >
            {dictionary.labels.allPrompts}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PromptDetailLayout({
  prompt,
  category,
  dictionary,
  locale,
}: {
  prompt: CommunityPrompt;
  category: PromptCategory;
  dictionary: CommunityDictionary;
  locale: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border-subtle)]">
      {/*<div className="absolute inset-0 grid-pattern opacity-30" />*/}
      <div className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-[160px]" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="relative flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
          <Link href="/community">
            {dictionary.detail.breadcrumbs.community}
          </Link>
          <span>/</span>
          <Link href={`/community/category/${category.slug}`}>
            {dictionary.categoryNames[category.slug]}
          </Link>
        </div>

        <div className="mt-6 max-w-6xl">
          <div className="flex flex-wrap items-center gap-2">
            {prompt.featured ? (
              <span className="rounded-full border border-[var(--color-accent-primary)]/20 bg-[var(--color-accent-primary)]/10 px-3 py-1 text-xs text-[var(--color-accent-primary)]">
                {dictionary.labels.featured}
              </span>
            ) : null}
            {prompt.verified ? (
              <span className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
                {dictionary.labels.verified}
              </span>
            ) : null}
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)] sm:text-5xl">
            {prompt.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
            {prompt.summary}
          </p>
          {/*
          <div className="mt-8 flex flex-wrap gap-3">
            <CopyButton
              value={prompt.content}
              label={dictionary.buttons.copy}
              successLabel={dictionary.buttons.copied}
              className="border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:border-[var(--color-accent-primary)]/40"
            />
            <ImportButton
              promptId={prompt.id}
              t={{
                import: dictionary.buttons.import,
                importSuccess: dictionary.buttons.importSuccess,
                installPrompt: dictionary.buttons.installPrompt,
              }}
            />
          </div>*/}

          <div className="mt-8 flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <Link
                key={tag}
                href={`/community/tag/${tag}`}
                className="rounded-full border border-[var(--color-border-subtle)] px-3 py-1 text-xs text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <PromptWorkbench
              prompt={prompt}
              locale={locale}
              labels={{
                promptTitle: dictionary.detail.promptTitle,
                variablesTitle: dictionary.detail.variablesTitle,
                copyTemplate: dictionary.detail.copyTemplate,
                copyFilled: dictionary.detail.copyFilled,
                copied: dictionary.buttons.copied,
                reset: dictionary.detail.reset,
                variableHint: dictionary.detail.variableHint,
                required: dictionary.detail.required,
              }}
            />
          </div>

          <div className="mt-8 rounded-[2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]/70 p-6">
            <dl className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <MetaItem
                label={dictionary.labels.author}
                value={prompt.author}
                subtle
              />
              <MetaItem
                label={dictionary.labels.updated}
                value={prompt.createdAt}
                subtle
              />
              <MetaItem
                label={dictionary.labels.difficulty}
                value={dictionary.difficulty[prompt.difficulty]}
                subtle
              />
              <MetaItem
                label={dictionary.labels.promptType}
                value={dictionary.promptType[prompt.promptType]}
                subtle
              />
              <MetaItem
                label={dictionary.labels.targetModels}
                value={prompt.targetModels.join(" / ")}
                subtle
              />
              <MetaItem
                label={dictionary.labels.useCase}
                value={prompt.useCase}
                subtle
              />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetaItem({
  label,
  value,
  subtle = false,
}: {
  label: string;
  value: string;
  subtle?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
        {label}
      </dt>
      <dd
        className={`mt-2 text-sm leading-7 ${
          subtle
            ? "text-[var(--color-text-secondary)]"
            : "text-[var(--color-text-primary)]"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-secondary)] px-6 py-14 text-center text-sm text-[var(--color-text-tertiary)]">
      {label}
    </div>
  );
}

export function PromptLinks({
  prompts,
  dictionary,
  title,
}: {
  prompts: CommunityPrompt[];
  dictionary: CommunityDictionary;
  title: string;
}) {
  if (prompts.length === 0) {
    return <EmptyState label={dictionary.labels.noItems} />;
  }

  return (
    <div>
      <SectionHeading title={title} description="" />
      <PromptGrid prompts={prompts} dictionary={dictionary} />
    </div>
  );
}

export function InlineCategoryLinks({
  categories,
  dictionary,
}: {
  categories: PromptCategory[];
  dictionary: CommunityDictionary;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/community/category/${category.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-accent-primary)]/40 hover:text-[var(--color-text-primary)]"
        >
          <CheckCircle2 className="h-4 w-4 text-[var(--color-accent-primary)]" />
          <span>{dictionary.categoryNames[category.slug]}</span>
        </Link>
      ))}
    </div>
  );
}

export function InlineTagLinks({ tags }: { tags: PromptTag[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={`/community/tag/${tag.slug}`}
          className="inline-flex items-center rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-accent-primary)]/40 hover:text-[var(--color-text-primary)]"
        >
          #{tag.slug}
        </Link>
      ))}
    </div>
  );
}
