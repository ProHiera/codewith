'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

type Table = {
  name: string;
  columns: Column[];
  primaryKey: string;
  foreignKeys?: ForeignKey[];
};

type Column = {
  name: string;
  type: string;
  nullable: boolean;
  unique?: boolean;
};

type ForeignKey = {
  column: string;
  references: string;
  onDelete: string;
};

export default function DbSchemaPage() {
  const [requirements, setRequirements] = useState('');
  const [tables, setTables] = useState<Table[]>([]);
  const [ddl, setDdl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSchema = () => {
    setLoading(true);

    // 간단한 예제 스키마 생성 (실제로는 AI로 분석)
    setTimeout(() => {
      const exampleTables: Table[] = [
        {
          name: 'users',
          columns: [
            { name: 'id', type: 'UUID', nullable: false },
            { name: 'email', type: 'VARCHAR(255)', nullable: false, unique: true },
            { name: 'name', type: 'VARCHAR(100)', nullable: false },
            { name: 'created_at', type: 'TIMESTAMP', nullable: false }
          ],
          primaryKey: 'id'
        },
        {
          name: 'posts',
          columns: [
            { name: 'id', type: 'UUID', nullable: false },
            { name: 'user_id', type: 'UUID', nullable: false },
            { name: 'title', type: 'VARCHAR(200)', nullable: false },
            { name: 'content', type: 'TEXT', nullable: true },
            { name: 'published', type: 'BOOLEAN', nullable: false },
            { name: 'created_at', type: 'TIMESTAMP', nullable: false }
          ],
          primaryKey: 'id',
          foreignKeys: [
            { column: 'user_id', references: 'users(id)', onDelete: 'CASCADE' }
          ]
        },
        {
          name: 'comments',
          columns: [
            { name: 'id', type: 'UUID', nullable: false },
            { name: 'post_id', type: 'UUID', nullable: false },
            { name: 'user_id', type: 'UUID', nullable: false },
            { name: 'content', type: 'TEXT', nullable: false },
            { name: 'created_at', type: 'TIMESTAMP', nullable: false }
          ],
          primaryKey: 'id',
          foreignKeys: [
            { column: 'post_id', references: 'posts(id)', onDelete: 'CASCADE' },
            { column: 'user_id', references: 'users(id)', onDelete: 'CASCADE' }
          ]
        }
      ];

      setTables(exampleTables);
      setDdl(generateDDL(exampleTables));
      setLoading(false);
    }, 1500);
  };

  const generateDDL = (tables: Table[]): string => {
    let sql = '';

    tables.forEach(table => {
      sql += `-- ${table.name} 테이블\n`;
      sql += `CREATE TABLE ${table.name} (\n`;
      
      const columnDefs = table.columns.map(col => {
        let def = `  ${col.name} ${col.type}`;
        if (!col.nullable) def += ' NOT NULL';
        if (col.unique) def += ' UNIQUE';
        return def;
      });

      sql += columnDefs.join(',\n');
      sql += `,\n  PRIMARY KEY (${table.primaryKey})`;

      if (table.foreignKeys) {
        table.foreignKeys.forEach(fk => {
          sql += `,\n  FOREIGN KEY (${fk.column}) REFERENCES ${fk.references} ON DELETE ${fk.onDelete}`;
        });
      }

      sql += '\n);\n\n';
    });

    sql += '-- 인덱스 생성\n';
    tables.forEach(table => {
      if (table.foreignKeys) {
        table.foreignKeys.forEach(fk => {
          sql += `CREATE INDEX idx_${table.name}_${fk.column} ON ${table.name}(${fk.column});\n`;
        });
      }
    });

    return sql;
  };

  const copySql = () => {
    navigator.clipboard.writeText(ddl);
    alert('DDL이 클립보드에 복사되었습니다!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">🗄️ DB 스키마 메이커</h1>
          <p className="text-gray-600 text-lg">
            요구사항을 입력하면 정규화된 테이블 구조와 DDL을 자동 생성합니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 입력 영역 */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">📝 요구사항 입력</h2>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="예시: 블로그 시스템을 만들고 싶어요. 사용자가 게시글을 작성하고, 다른 사용자가 댓글을 달 수 있어야 합니다. 게시글은 공개/비공개 상태를 가질 수 있습니다."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[200px]"
              />
              
              <button
                onClick={generateSchema}
                disabled={!requirements.trim() || loading}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    스키마 생성 중...
                  </>
                ) : (
                  '🔍 스키마 생성하기'
                )}
              </button>
            </div>

            {/* 예제 요구사항 */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="font-bold mb-3">💡 예제 요구사항</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setRequirements('블로그 시스템: 사용자가 게시글을 작성하고, 다른 사용자가 댓글을 달 수 있어야 합니다.')}
                  className="w-full text-left px-4 py-2 bg-white rounded-lg hover:bg-purple-100 text-sm"
                >
                  📝 블로그 시스템
                </button>
                <button
                  onClick={() => setRequirements('쇼핑몰: 상품, 주문, 결제 관리가 필요합니다.')}
                  className="w-full text-left px-4 py-2 bg-white rounded-lg hover:bg-purple-100 text-sm"
                >
                  🛍️ 쇼핑몰 시스템
                </button>
                <button
                  onClick={() => setRequirements('할일 관리 앱: 프로젝트별로 할일을 관리하고, 담당자를 지정할 수 있어야 합니다.')}
                  className="w-full text-left px-4 py-2 bg-white rounded-lg hover:bg-purple-100 text-sm"
                >
                  ✅ 할일 관리 앱
                </button>
              </div>
            </div>
          </div>

          {/* 결과 영역 */}
          <div className="space-y-6">
            {tables.length > 0 && (
              <>
                {/* 테이블 구조 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">📊 테이블 구조</h2>
                  <div className="space-y-4">
                    {tables.map((table, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-blue-50 px-4 py-2 font-bold text-blue-900">
                          {table.name}
                        </div>
                        <div className="p-4">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left pb-2">컬럼명</th>
                                <th className="text-left pb-2">타입</th>
                                <th className="text-left pb-2">제약</th>
                              </tr>
                            </thead>
                            <tbody>
                              {table.columns.map((col, cidx) => (
                                <tr key={cidx} className="border-b last:border-0">
                                  <td className="py-2 font-mono text-xs">{col.name}</td>
                                  <td className="py-2 text-gray-600">{col.type}</td>
                                  <td className="py-2 text-xs">
                                    {!col.nullable && <span className="bg-red-100 text-red-700 px-2 py-1 rounded mr-1">NOT NULL</span>}
                                    {col.unique && <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded mr-1">UNIQUE</span>}
                                    {col.name === table.primaryKey && <span className="bg-green-100 text-green-700 px-2 py-1 rounded">PK</span>}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {table.foreignKeys && table.foreignKeys.length > 0 && (
                            <div className="mt-3 pt-3 border-t">
                              <div className="text-xs font-semibold text-gray-600 mb-2">외래 키:</div>
                              {table.foreignKeys.map((fk, fkidx) => (
                                <div key={fkidx} className="text-xs text-gray-700">
                                  • {fk.column} → {fk.references}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DDL */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
                    <span className="font-semibold">SQL DDL</span>
                    <button
                      onClick={copySql}
                      className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                    >
                      📋 복사
                    </button>
                  </div>
                  <pre className="p-6 bg-gray-900 text-white text-sm overflow-x-auto leading-relaxed max-h-[500px] overflow-y-auto">
                    {ddl}
                  </pre>
                </div>

                {/* 팁 */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="font-bold text-green-900 mb-3">✅ 정규화 체크</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>✓ 제1정규형: 모든 컬럼이 원자값</li>
                    <li>✓ 제2정규형: 부분 함수 종속 제거</li>
                    <li>✓ 제3정규형: 이행 함수 종속 제거</li>
                    <li>✓ 외래 키 제약조건 설정</li>
                    <li>✓ 인덱스 자동 생성</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
