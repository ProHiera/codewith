-- Sample CSS Missions
INSERT INTO public.missions (title, type, spec_json) VALUES
('Flexbox 중앙 정렬', 'css', '{
  "description": "div를 flexbox로 중앙 정렬하세요",
  "requirements": [
    "display: flex 사용",
    "justify-content와 align-items 사용",
    "높이 100vh 설정"
  ],
  "html": "<div class=\"container\"><div class=\"box\">중앙!</div></div>",
  "expected": {
    "selectors": [".container"],
    "properties": {
      ".container": {
        "display": "flex",
        "justify-content": "center",
        "align-items": "center",
        "height": "100vh"
      }
    }
  }
}'),

('Grid 레이아웃', 'css', '{
  "description": "3x3 그리드 레이아웃을 만드세요",
  "requirements": [
    "display: grid 사용",
    "3개의 컬럼, 각 1fr",
    "gap 20px"
  ],
  "html": "<div class=\"grid\"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>",
  "expected": {
    "selectors": [".grid"],
    "properties": {
      ".grid": {
        "display": "grid",
        "grid-template-columns": "repeat(3, 1fr)",
        "gap": "20px"
      }
    }
  }
}'),

('반응형 디자인', 'css', '{
  "description": "모바일에서는 1열, 태블릿 이상에서는 2열로 표시",
  "requirements": [
    "기본 grid-template-columns: 1fr",
    "@media (min-width: 768px)에서 grid-template-columns: repeat(2, 1fr)"
  ],
  "html": "<div class=\"responsive-grid\"><div>A</div><div>B</div><div>C</div></div>",
  "expected": {
    "selectors": [".responsive-grid"],
    "properties": {
      ".responsive-grid": {
        "display": "grid",
        "grid-template-columns": "1fr"
      }
    },
    "mediaQueries": {
      "(min-width: 768px)": {
        ".responsive-grid": {
          "grid-template-columns": "repeat(2, 1fr)"
        }
      }
    }
  }
}');

-- Sample JavaScript Missions
INSERT INTO public.missions (title, type, spec_json) VALUES
('배열 필터링', 'javascript', '{
  "description": "숫자 배열에서 짝수만 필터링하세요",
  "template": "function filterEven(arr) {\n  // 여기에 코드 작성\n}",
  "tests": [
    {"input": [[1,2,3,4,5]], "expected": [2,4]},
    {"input": [[10,15,20,25]], "expected": [10,20]},
    {"input": [[1,3,5]], "expected": []}
  ]
}'),

('비동기 데이터 처리', 'javascript', '{
  "description": "Promise를 사용하여 데이터를 가져오고 파싱하세요",
  "template": "async function fetchData(url) {\n  // 여기에 코드 작성\n}",
  "requirements": [
    "try-catch 사용",
    "loading 상태 관리",
    "에러 핸들링"
  ]
}');
