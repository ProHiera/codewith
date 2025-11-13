"use client";

import { useState } from "react";

export type StudyItem = {
  id: string;
  title: string;
  kind: "variable" | "function" | "other";
  source: "memorize" | "custom"; // memorize = MDN-style 암기용, custom = 사용자가 만든 항목
  levels: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  tags?: string[];
};

const SAMPLE_ITEMS: StudyItem[] = [
  {
    id: "var-let-const",
    title: "var / let / const",
    kind: "variable",
    source: "memorize",
    levels: {
      beginner: "var은 재선언과 재할당 가능, let은 재선언 불가(재할당 가능), const는 재선언/재할당 불가.",
      intermediate:
        "var은 함수 스코프, hoisting으로 인해 선언 이전에 접근 가능. let/const는 블록 스코프이며 TDZ(Temporal Dead Zone)가 적용됩니다.",
      advanced:
        "const는 재할당이 금지된 식별자입니다(객체 내부 변경과는 별개). var의 호이스팅은 선언을 끌어올리지만 초기값은 undefined입니다.",
    },
    tags: ["scope", "declaration"],
  },
  {
    id: "arrow-fn",
    title: "화살표 함수 (arrow function)",
    kind: "function",
    source: "memorize",
    levels: {
      beginner: "() => {} 형태의 함수. function 키워드보다 간단하게 작성 가능.",
      intermediate:
        "this 바인딩이 없고, arguments 객체를 제공하지 않습니다. 일반 함수와는 달리 생성자(new)로 사용 불가합니다.",
      advanced:
        "렉시컬 this를 사용하므로 기존 함수의 this와 다르게 동작. 또한 자동으로 반환되는 표현식 축약 형태에 주의(중괄호 vs 표현식).",
    },
    tags: ["this", "syntax"],
  },
  {
    id: "null-vs-undefined",
    title: "null vs undefined",
    kind: "variable",
    source: "memorize",
    levels: {
      beginner: "null은 의도적으로 비어 있음을 의미, undefined는 값이 없음(초기화되지 않음)을 뜻합니다.",
      intermediate: "undefined는 선언은 되었으나 값이 할당되지 않은 상태입니다. null은 개발자가 의도적으로 '값 없음'을 할당한 경우입니다.",
      advanced: "== 연산자에서는 null == undefined가 true지만, ===로 비교하면 false입니다. 타입 검사 시 정확한 비교 연산자를 사용하세요.",
    },
    tags: ["types", "values"],
  },
  {
    id: "func-decl-vs-expr",
    title: "함수 선언문 vs 함수 표현식",
    kind: "function",
    source: "memorize",
    levels: {
      beginner: "function foo() {}는 선언문, const bar = function() {}은 표현식(변수에 할당).",
      intermediate: "선언문은 호이스팅되어 파일 상단에서 호출 가능하지만, 표현식은 선언 이후에만 호출 가능합니다.",
      advanced: "함수 선언문은 런타임 이전에 선언이 평가되어 참조 가능. 표현식(특히 화살표 함수)은 TDZ와 함께 동작하므로 시점에 유의하세요.",
    },
    tags: ["hoisting", "syntax"],
  },
  {
    id: "params-defaults-rest",
    title: "매개변수, 기본값 및 rest 파라미터",
    kind: "function",
    source: "memorize",
    levels: {
      beginner: "함수에 기본값을 줄 수 있어요: function f(a = 1) {}. 나머지 인자는 ...rest로 받을 수 있어요.",
      intermediate: "기본값 표현식은 호출 시점에 평가됩니다. rest 파라미터는 실제 인자 배열을 제공합니다.",
      advanced: "매개변수 기본값은 이전 매개변수에 의존할 수 있으며, arguments 객체와 rest 파라미터의 동작 차이에 주의하세요.",
    },
    tags: ["parameters", "syntax"],
  },
  {
    id: "scope-hoisting",
    title: "스코프와 호이스팅 요약",
    kind: "variable",
    source: "memorize",
    levels: {
      beginner: "전역, 함수, 블록 스코프가 있어요. let/const는 블록 스코프입니다.",
      intermediate: "var는 함수 스코프이며 선언은 호이스팅됩니다. let/const는 TDZ 때문에 선언 이전 접근 시 에러입니다.",
      advanced: "호이스팅은 선언 자체만 끌어올리고 초기화는 끌어올리지 않습니다(예: var는 undefined 초기화). 클로저와 결합 시 메모리 참조에 유의하세요.",
    },
    tags: ["scope", "hoisting"],
  },
];

export default function StudyCheatsheet({ initialLevel = "beginner" }: { initialLevel?: "beginner" | "intermediate" | "advanced" }) {
  const [items, setItems] = useState<StudyItem[]>(SAMPLE_ITEMS);
  const [selectedLevel, setSelectedLevel] = useState<string>(initialLevel);
  const [previewLevel, setPreviewLevel] = useState<string>(initialLevel);
  const [showOnlyMemorize, setShowOnlyMemorize] = useState<boolean>(true);

  // form for custom item
  const [newTitle, setNewTitle] = useState("");
  const [newKind, setNewKind] = useState<StudyItem["kind"]>("other");
  const [newText, setNewText] = useState("");

  const addCustomItem = () => {
    if (!newTitle.trim() || !newText.trim()) return;
    const newItem: StudyItem = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      kind: newKind,
      source: "custom",
      levels: {
        beginner: newText,
        intermediate: newText,
        advanced: newText,
      },
      tags: [],
    };
    setItems((s) => [newItem, ...s]);
    setNewTitle("");
    setNewText("");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">JS 암기 노트 · 레벨별 해설</h3>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">기본 레벨</label>
          <select
            value={selectedLevel}
            onChange={(e) => {
              setSelectedLevel(e.target.value);
              setPreviewLevel(e.target.value);
            }}
            className="px-2 py-1 border rounded"
          >
            <option value="beginner">초급</option>
            <option value="intermediate">중급</option>
            <option value="advanced">고급</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={showOnlyMemorize} onChange={(e) => setShowOnlyMemorize(e.target.checked)} />
          <span className="text-sm">암기용 항목만 보기 (MDN 스타일)</span>
        </label>

        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-gray-600">미리보기 레벨</label>
          <select value={previewLevel} onChange={(e) => setPreviewLevel(e.target.value)} className="px-2 py-1 border rounded">
            <option value="beginner">초급</option>
            <option value="intermediate">중급</option>
            <option value="advanced">고급</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {items
          .filter((it) => (showOnlyMemorize ? it.source === "memorize" : true))
          .map((it) => (
            <div key={it.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{it.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">{it.kind}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${it.source === "memorize" ? "bg-yellow-100 text-yellow-800" : "bg-blue-50 text-blue-800"}`}>
                      {it.source === "memorize" ? "암기용" : "사용자"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">설명 ({previewLevel})</div>
                </div>
                <div className="text-sm text-gray-500">{it.tags?.join(", ")}</div>
              </div>

              <div className="mt-3 text-gray-800">
                {previewLevel === "beginner" && <p>{it.levels.beginner}</p>}
                {previewLevel === "intermediate" && <p>{it.levels.intermediate}</p>}
                {previewLevel === "advanced" && <p>{it.levels.advanced}</p>}
              </div>
            </div>
          ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <h4 className="font-semibold mb-2">사용자 항목 추가 (현재 레벨에 맞춰 설명 입력)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="제목 (예: null vs undefined)" className="px-3 py-2 border rounded-md" />
          <select value={newKind} onChange={(e) => setNewKind(e.target.value as StudyItem["kind"])} className="px-3 py-2 border rounded-md">
            <option value="variable">변수</option>
            <option value="function">함수</option>
            <option value="other">기타</option>
          </select>
          <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className="px-3 py-2 border rounded-md">
            <option value="beginner">설명 레벨: 초급</option>
            <option value="intermediate">설명 레벨: 중급</option>
            <option value="advanced">설명 레벨: 고급</option>
          </select>
        </div>

        <textarea value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="해설을 입력하세요 (현재 선택 레벨에 저장됩니다)" className="w-full px-3 py-2 border rounded-md mb-3" />

        <div className="flex gap-2">
          <button onClick={addCustomItem} className="px-4 py-2 bg-blue-600 text-white rounded-md">항목 추가</button>
          <button onClick={() => { setNewTitle(""); setNewText(""); }} className="px-4 py-2 border rounded-md">초기화</button>
        </div>

  <p className="mt-3 text-xs text-gray-500">설명: &apos;암기용&apos;은 MDN처럼 외워야 할 핵심 포인트를 간단하게 적고, &apos;사용자&apos; 항목은 본인이 만든 메모를 저장합니다.</p>
      </div>
    </div>
  );
}
