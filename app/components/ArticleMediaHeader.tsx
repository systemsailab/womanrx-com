type MediaStyle = "access" | "safety" | "labs" | "thyroid" | "glp" | "hrt" | "peptides";

function mediaStyle(topic: string, title: string): MediaStyle {
  const key = `${topic} ${title}`.toLowerCase();
  if (/access|coverage|cost|insurance|medicare|medicaid|copay|coupon|patient-assistance|manufacturer|va-coverage/.test(key)) return "access";
  if (/safety|side-effect|warning|risk|pregnancy|renal|hepatic|contraindication|adverse/.test(key)) return "safety";
  if (/lab|hba1c|ldl|hdl|cmp|cbc|apob|egfr|tsh|free-t4|free-t3/.test(key)) return "labs";
  if (/thyroid|levothyroxine|liothyronine|armour/.test(key)) return "thyroid";
  if (/glp|semaglutide|tirzepatide|ozempic|wegovy|mounjaro|zepbound|rybelsus|saxenda/.test(key)) return "glp";
  if (/hrt|trt|testosterone|androgel|estradiol|progesterone|menopause|enclomiphene/.test(key)) return "hrt";
  if (/peptide|bpc|cjc|ipamorelin|sermorelin|tesamorelin|tb-500|ghk|aod-9604|mots-c/.test(key)) return "peptides";
  return "labs";
}

function ArticleScene({ style }: { style: MediaStyle }) {
  if (style === "access") {
    return (
      <>
        <rect className="media-card" x="118" y="126" width="390" height="242" rx="28" />
        <path className="media-card-line" d="M158 206h198M158 256h292M158 306h214" />
        <rect className="media-chip" x="392" y="162" width="66" height="48" rx="12" />
        <rect className="media-bottle" x="648" y="146" width="148" height="244" rx="34" />
        <rect className="media-bottle-cap" x="672" y="106" width="100" height="58" rx="18" />
        <path className="media-pump" d="M860 120h106c30 0 54 24 54 54v0" />
        <rect className="media-pump-bottle" x="842" y="174" width="132" height="216" rx="30" />
        <circle className="media-coin" cx="938" cy="414" r="36" />
        <circle className="media-coin media-coin-soft" cx="876" cy="428" r="28" />
      </>
    );
  }
  if (style === "glp") {
    return (
      <>
        <rect className="media-pen" x="178" y="236" width="470" height="74" rx="37" transform="rotate(-16 413 273)" />
        <rect className="media-pen-end" x="604" y="199" width="92" height="74" rx="30" transform="rotate(-16 650 236)" />
        <path className="media-needle" d="M178 342l-72 44" />
        <circle className="media-scale" cx="870" cy="286" r="132" />
        <path className="media-scale-mark" d="M806 268c30-42 98-42 128 0M870 286l48-48" />
        <path className="media-wave" d="M722 410c44-36 84-36 128 0s84 36 128 0 84-36 128 0" />
      </>
    );
  }
  if (style === "hrt") {
    return (
      <>
        <rect className="media-patch" x="168" y="136" width="248" height="248" rx="52" />
        <path className="media-patch-lines" d="M218 208h148M218 260h112M218 312h152" />
        <path className="media-molecule" d="M610 178l116 70-2 138-120 68-118-70 2-138z" />
        <circle className="media-node" cx="610" cy="178" r="22" />
        <circle className="media-node" cx="726" cy="248" r="22" />
        <circle className="media-node" cx="724" cy="386" r="22" />
        <circle className="media-node" cx="604" cy="454" r="22" />
        <circle className="media-node" cx="486" cy="384" r="22" />
        <circle className="media-node" cx="488" cy="246" r="22" />
        <rect className="media-calendar" x="840" y="142" width="190" height="242" rx="28" />
        <path className="media-calendar-grid" d="M878 218h114M878 266h114M878 314h76M898 180v174M956 180v174" />
      </>
    );
  }
  if (style === "peptides") {
    return (
      <>
        <rect className="media-vial" x="182" y="122" width="140" height="292" rx="34" />
        <rect className="media-vial-cap" x="206" y="86" width="92" height="58" rx="18" />
        <rect className="media-syringe" x="466" y="246" width="390" height="54" rx="27" transform="rotate(-25 661 273)" />
        <path className="media-needle" d="M824 186l106-50" />
        <path className="media-chain" d="M430 410c62-86 132 86 194 0s132 86 194 0 132 86 194 0" />
        <circle className="media-node" cx="430" cy="410" r="18" />
        <circle className="media-node" cx="624" cy="410" r="18" />
        <circle className="media-node" cx="818" cy="410" r="18" />
        <circle className="media-node" cx="1012" cy="410" r="18" />
      </>
    );
  }
  if (style === "thyroid") {
    return (
      <>
        <path className="media-organ" d="M548 188c-74-86-204-26-204 96 0 88 68 150 134 126 44-16 54-58 70-94 16 36 26 78 70 94 66 24 134-38 134-126 0-122-130-182-204-96z" />
        <path className="media-organ-line" d="M548 188v192M458 240c54 28 126 28 180 0" />
        <rect className="media-vial" x="820" y="126" width="142" height="270" rx="34" />
        <rect className="media-vial-cap" x="846" y="90" width="90" height="58" rx="18" />
        <path className="media-card-line" d="M152 190h184M152 248h236M152 306h164" />
      </>
    );
  }
  if (style === "safety") {
    return (
      <>
        <path className="media-shield" d="M564 104l254 82v162c0 122-96 204-254 252-158-48-254-130-254-252V186z" />
        <path className="media-check" d="M452 344l78 78 158-178" />
        <rect className="media-vial" x="136" y="152" width="122" height="246" rx="30" />
        <rect className="media-vial-cap" x="158" y="118" width="78" height="52" rx="16" />
        <path className="media-card-line" d="M860 210h190M860 270h138M860 330h170" />
      </>
    );
  }
  return (
    <>
      <rect className="media-tube" x="214" y="100" width="106" height="310" rx="28" />
      <rect className="media-tube" x="390" y="144" width="106" height="266" rx="28" />
      <rect className="media-tube" x="566" y="82" width="106" height="328" rx="28" />
      <path className="media-chart" d="M760 380V152h260M812 324l54-78 64 42 72-112" />
      <circle className="media-node" cx="866" cy="246" r="18" />
      <circle className="media-node" cx="930" cy="288" r="18" />
      <circle className="media-node" cx="1002" cy="176" r="18" />
    </>
  );
}

export function ArticleMediaHeader({
  topic,
  image,
  title,
}: {
  topic: string;
  slug: string;
  title: string;
  image?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
}) {
  if (image?.url) {
    return (
      <figure className="article-media article-media-photo">
        <img
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </figure>
    );
  }

  const style = mediaStyle(topic, title);
  return (
    <figure
      className={`article-media article-media-${style}`}
      aria-label="WomanRx.com clinical article visual"
    >
      <svg aria-hidden="true" viewBox="0 0 1200 520" role="img">
        <defs>
          <linearGradient id={`media-bg-${style}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" />
            <stop offset="100%" />
          </linearGradient>
        </defs>
        <rect className="media-bg" x="0" y="0" width="1200" height="520" rx="28" />
        <path className="media-grid" d="M80 92h1040M80 172h1040M80 252h1040M80 332h1040M80 412h1040M170 60v400M290 60v400M410 60v400M530 60v400M650 60v400M770 60v400M890 60v400M1010 60v400" />
        <ArticleScene style={style} />
      </svg>
    </figure>
  );
}
