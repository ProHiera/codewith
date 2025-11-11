interface CSSGradeResult {
  score: number;
  feedback: string;
  diff?: string;
  passed: boolean;
}

export class CSSGrader {
  static grade(code: string, expected: any): CSSGradeResult {
    let score = 0;
    const feedback: string[] = [];
    let totalChecks = 0;
    let passedChecks = 0;

    try {
      // Parse CSS (simplified - in production use postcss or cssom)
      const cssRules = this.parseCSS(code);

      // Check required selectors
      if (expected.selectors) {
        totalChecks += expected.selectors.length;
        expected.selectors.forEach((selector: string) => {
          if (cssRules[selector]) {
            passedChecks++;
            feedback.push(`✓ ${selector} 선택자 발견`);
          } else {
            feedback.push(`✗ ${selector} 선택자가 필요합니다`);
          }
        });
      }

      // Check required properties
      if (expected.properties) {
        Object.entries(expected.properties).forEach(([selector, props]: [string, any]) => {
          Object.entries(props).forEach(([property, value]) => {
            totalChecks++;
            const actualValue = cssRules[selector]?.[property];
            const expectedValue = String(value);
            
            if (actualValue) {
              if (this.compareValues(actualValue, expectedValue)) {
                passedChecks++;
                feedback.push(`✓ ${selector} { ${property}: ${expectedValue} }`);
              } else {
                feedback.push(`✗ ${selector}의 ${property}가 ${expectedValue}여야 하지만 ${actualValue}입니다`);
              }
            } else {
              feedback.push(`✗ ${selector}에 ${property}가 필요합니다`);
            }
          });
        });
      }

      // Check media queries
      if (expected.mediaQueries) {
        Object.entries(expected.mediaQueries).forEach(([query, rules]: [string, any]) => {
          totalChecks++;
          const hasMediaQuery = code.includes(`@media ${query}`);
          if (hasMediaQuery) {
            passedChecks++;
            feedback.push(`✓ 미디어 쿼리 ${query} 발견`);
          } else {
            feedback.push(`✗ 미디어 쿼리 ${query}가 필요합니다`);
          }
        });
      }

      // Calculate score
      score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0;

      return {
        score,
        feedback: feedback.join('\n'),
        passed: score >= 80,
      };
    } catch (error) {
      return {
        score: 0,
        feedback: '코드 파싱 중 오류가 발생했습니다. CSS 문법을 확인해주세요.',
        passed: false,
      };
    }
  }

  private static parseCSS(code: string): Record<string, Record<string, string>> {
    const rules: Record<string, Record<string, string>> = {};
    
    // Remove comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Match CSS rules (simplified)
    const ruleRegex = /([^{]+)\{([^}]+)\}/g;
    let match;
    
    while ((match = ruleRegex.exec(code)) !== null) {
      const selector = match[1].trim();
      const declarations = match[2];
      
      rules[selector] = {};
      
      // Parse declarations
      const declRegex = /([^:;]+):([^;]+)/g;
      let declMatch;
      
      while ((declMatch = declRegex.exec(declarations)) !== null) {
        const property = declMatch[1].trim();
        const value = declMatch[2].trim();
        rules[selector][property] = value;
      }
    }
    
    return rules;
  }

  private static compareValues(actual: string, expected: string): boolean {
    // Normalize values for comparison
    const normalize = (val: string) => val.toLowerCase().replace(/\s+/g, ' ').trim();
    return normalize(actual) === normalize(expected);
  }
}
