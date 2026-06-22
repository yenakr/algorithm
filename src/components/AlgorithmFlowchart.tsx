'use client';

import { Check, HelpCircle } from 'lucide-react';

interface AlgorithmFlowchartProps {
  algorithmId: 'transfer' | 'toileting';
  activePath: string[];
  highlightOnlyActive?: boolean;
}

export default function AlgorithmFlowchart({ algorithmId, activePath, highlightOnlyActive = false }: AlgorithmFlowchartProps) {
  
  const isNodeActive = (nodeId: string) => {
    return activePath.includes(nodeId) || (activePath.length === 0 && nodeId === 'q1');
  };

  const isBranchActive = (fromNodeId: string, toNodeId: string) => {
    const fromIndex = activePath.indexOf(fromNodeId);
    if (fromIndex === -1) return false;
    return activePath[fromIndex + 1] === toNodeId;
  };

  // Helper to render node opacity class based on active status
  const getOpacityClass = (nodeId: string) => {
    if (!highlightOnlyActive) return 'opacity-100 transition-all duration-300';
    return isNodeActive(nodeId) 
      ? 'opacity-100 scale-[1.03] shadow-md z-10' 
      : 'opacity-10 grayscale pointer-events-none scale-95 transition-all duration-300';
  };

  // Helper to render node style classes
  const getNodeClass = (nodeId: string, isResult: boolean = false) => {
    const active = isNodeActive(nodeId);
    if (isResult) {
      return `p-3 rounded-lg border text-center transition-all duration-300 font-bold text-xs sm:text-sm ${
        active
          ? 'bg-primary text-white border-primary shadow-md'
          : 'bg-slate-50 text-slate-400 border-slate-200'
      }`;
    }
    return `p-3 rounded-lg border text-left transition-all duration-300 ${
      active
        ? 'bg-primary-light text-primary border-primary shadow-sm ring-1 ring-primary/30 font-bold'
        : 'bg-white text-slate-500 border-slate-200'
    }`;
  };

  // Helper to render branch label style classes
  const getBranchLabelClass = (active: boolean) => {
    return `text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded transition-all duration-300 ${
      active ? 'bg-primary text-white scale-105' : 'bg-slate-100 text-slate-400'
    }`;
  };

  // Helper to render line style classes
  const getLineClass = (active: boolean, targetNodeId?: string) => {
    const baseColor = active ? 'bg-primary' : 'bg-slate-200';
    let opacity = 'opacity-100';
    if (highlightOnlyActive && targetNodeId) {
      opacity = isNodeActive(targetNodeId) ? 'opacity-100' : 'opacity-10';
    }
    return `h-8 w-0.5 transition-all duration-300 ${baseColor} ${opacity}`;
  };

  if (algorithmId === 'transfer') {
    return (
      <div className="w-full bg-slate-50 rounded-2xl border border-slate-200/60 p-4 sm:p-6 overflow-x-auto relative">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-primary" />
            이승돌봄 의사결정 알고리즘 순서도
          </h4>
          <span className="lg:hidden text-[10px] font-bold text-slate-400 bg-slate-200/50 px-2 py-0.5 rounded animate-pulse">
            ← 드래그하여 스크롤 →
          </span>
        </div>

        <div className="min-w-[700px] flex flex-col items-center py-4 space-y-4">

          {/* ROOT QUESTION */}
          <div className={`w-80 flex flex-col items-center ${getOpacityClass('q1')}`}>
            <div className={getNodeClass('q1')}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">기능평가</span>
              <p className="font-bold text-xs sm:text-sm">자리이동에 어려움이 있나요?</p>
              <span className="text-[10px] text-slate-400 block mt-1">침대/휠체어 이동 시 어려움 여부</span>
            </div>
          </div>

          {/* BRANCH FROM Q1 */}
          <div className="w-full flex justify-center gap-16 relative">
            {/* Q1 -> T-A */}
            <div className={`flex flex-col items-center w-40 ${getOpacityClass('T-A')}`}>
              <div className={getLineClass(isBranchActive('q1', '0') || isNodeActive('T-A'), 'T-A')} />
              <div className={getBranchLabelClass(isNodeActive('T-A'))}>0점 (문제 없음)</div>
              <div className="h-4 w-0.5 bg-slate-200" style={{ backgroundColor: isNodeActive('T-A') ? '#0E4A84' : '' }} />
              <div className={getNodeClass('T-A', true)}>
                필요도 낮음
              </div>
            </div>

            {/* Q1 -> T-B */}
            <div className={`flex flex-col items-center w-40 ${getOpacityClass('T-B')}`}>
              <div className={getLineClass(isBranchActive('q1', '1') || isNodeActive('T-B'), 'T-B')} />
              <div className={getBranchLabelClass(isNodeActive('T-B'))}>1점 (가벼운 어려움)</div>
              <div className="h-4 w-0.5 bg-slate-200" style={{ backgroundColor: isNodeActive('T-B') ? '#0E4A84' : '' }} />
              <div className={getNodeClass('T-B', true)}>
                이승보조장비 고려
              </div>
            </div>

            {/* Q1 -> Q2 */}
            <div className="flex flex-col items-center w-80">
              <div className={`w-full flex flex-col items-center ${getOpacityClass('q2')}`}>
                <div className={getLineClass(isNodeActive('q2'), 'q2')} />
                <div className={getBranchLabelClass(isNodeActive('q2'))}>2~4점 (중등도 이상)</div>
                <div className="h-4 w-0.5 bg-slate-200" style={{ backgroundColor: isNodeActive('q2') ? '#0E4A84' : '' }} />
                
                {/* Q2 NODE */}
                <div className={getNodeClass('q2')}>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">하지 근력</span>
                  <p className="font-bold text-xs sm:text-sm">다리 힘으로 체중을 지탱할 수 없는가?</p>
                  <span className="text-[10px] text-slate-400 block mt-1">체중 지탱 여부에 따른 기기 계열 구분</span>
                </div>
              </div>

              {/* BRANCH FROM Q2 */}
              <div className="w-full flex justify-between gap-8 mt-4 relative">
                {/* Q2 -> Q3 (체중 지지 불가능 - 예) */}
                <div className={`flex flex-col items-center w-48 ${getOpacityClass('q3')}`}>
                  <div className={getLineClass(isNodeActive('q3') || isNodeActive('q3_1') || isNodeActive('q3_2'), 'q3')} />
                  <div className={getBranchLabelClass(isNodeActive('q3') || isNodeActive('q3_1') || isNodeActive('q3_2'))}>
                    체중 지탱 불가 → 전신슬링리프트
                  </div>
                  <div className="h-4 w-0.5 bg-slate-200" style={{ backgroundColor: (isNodeActive('q3') || isNodeActive('q3_1') || isNodeActive('q3_2')) ? '#0E4A84' : '' }} />
                  
                  {/* Q3 NODE */}
                  <div className={getNodeClass('q3')}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">사용 환경</span>
                    <p className="font-bold text-xs sm:text-sm">사용 환경은 어떤가요?</p>
                    <span className="text-[10px] text-slate-400 block mt-1">천장/벽 공사 가능여부 및 공간 평가</span>
                  </div>

                  <div className="flex justify-center gap-2 mt-4 w-64 text-[10px] text-slate-500 font-semibold bg-white p-2 rounded border border-slate-200 shadow-sm">
                    <span className={activePath.includes('T-E') ? 'text-primary font-bold' : ''}>천장형</span>
                    <span>|</span>
                    <span className={activePath.includes('T-F') ? 'text-primary font-bold' : ''}>벽 고정형</span>
                    <span>|</span>
                    <span className={activePath.includes('T-G') ? 'text-primary font-bold' : ''}>이동식</span>
                    <span>|</span>
                    <span className={activePath.includes('T-H') ? 'text-primary font-bold' : ''}>겐트리</span>
                  </div>
                </div>

                {/* Q2 -> Q4 (체중 지지 가능 - 아니오) */}
                <div className="flex flex-col items-center w-48">
                  <div className={`w-full flex flex-col items-center ${getOpacityClass('q4')}`}>
                    <div className={getLineClass(isNodeActive('q4'), 'q4')} />
                    <div className={getBranchLabelClass(isNodeActive('q4'))}>
                      체중 지탱 가능 → 기립보조리프트
                    </div>
                    <div className="h-4 w-0.5 bg-slate-200" style={{ backgroundColor: isNodeActive('q4') ? '#0E4A84' : '' }} />

                    {/* Q4 NODE */}
                    <div className={getNodeClass('q4')}>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">상체 조절</span>
                      <p className="font-bold text-xs sm:text-sm">스스로 상체를 일으킬 수 있나요?</p>
                      <span className="text-[10px] text-slate-400 block mt-1">등받이 벨트 파지 및 기립 협조 능력</span>
                    </div>
                  </div>

                  {/* BRANCH FROM Q4 */}
                  <div className="w-full flex justify-between gap-4 mt-4 relative">
                    {/* Q4 -> T-C */}
                    <div className={`flex flex-col items-center w-22 ${getOpacityClass('T-C')}`}>
                      <div className={getLineClass(activePath.includes('T-C'), 'T-C')} />
                      <div className={getBranchLabelClass(activePath.includes('T-C'))}>가능</div>
                      <div className="h-4 w-0.5 bg-slate-200" style={{ backgroundColor: activePath.includes('T-C') ? '#0E4A84' : '' }} />
                      <div className={getNodeClass('T-C', true)}>전동형 기립보조</div>
                    </div>

                    {/* Q4 -> T-D */}
                    <div className={`flex flex-col items-center w-22 ${getOpacityClass('T-D')}`}>
                      <div className={getLineClass(activePath.includes('T-D'), 'T-D')} />
                      <div className={getBranchLabelClass(activePath.includes('T-D'))}>불가</div>
                      <div className="h-4 w-0.5 bg-slate-200" style={{ backgroundColor: activePath.includes('T-D') ? '#0E4A84' : '' }} />
                      <div className={getNodeClass('T-D', true)}>비전동형 기립보조</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Toileting Care Flowchart
  return (
    <div className="w-full bg-slate-50 rounded-2xl border border-slate-200/60 p-4 sm:p-6 overflow-x-auto relative">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-primary" />
          배설돌봄 의사결정 알고리즘 순서도
        </h4>
        <span className="lg:hidden text-[10px] font-bold text-slate-400 bg-slate-200/50 px-2 py-0.5 rounded animate-pulse">
          ← 드래그하여 스크롤 →
        </span>
      </div>

      <div className="min-w-[850px] flex flex-col items-center py-4 space-y-4">

        {/* ROOT QUESTION */}
        <div className={`w-80 flex flex-col items-center ${getOpacityClass('q1')}`}>
          <div className={getNodeClass('q1')}>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">배설 인지</span>
            <p className="font-bold text-xs sm:text-sm">배뇨감 및 배변감을 인지하고 조절하는 데 어려움이 있나요?</p>
            <span className="text-[10px] text-slate-400 block mt-1">스스로 요의/변의를 지각하여 대소변 조절</span>
          </div>
        </div>

        {/* BRANCH FROM Q1 */}
        <div className="w-full flex justify-between gap-16 mt-4">
          
          {/* PATH A: 인지 낮음 (0~1점) */}
          <div className="flex-1 flex flex-col items-center border-r border-dashed border-slate-200 pr-8">
            <div className={`w-full flex flex-col items-center ${getOpacityClass('q2_a')}`}>
              <div className={getLineClass(isNodeActive('q2_a') || isNodeActive('q3_a1') || isNodeActive('q3_a2'), 'q2_a')} />
              <div className={getBranchLabelClass(isNodeActive('q2_a') || isNodeActive('q3_a1') || isNodeActive('q3_a2'))}>
                인지 양호 (0~1점)
              </div>
              <div className="h-4 w-0.5 bg-slate-200" style={{ backgroundColor: (isNodeActive('q2_a') || isNodeActive('q3_a1') || isNodeActive('q3_a2')) ? '#0E4A84' : '' }} />

              {/* Q2-A */}
              <div className={getNodeClass('q2_a')}>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">화장실 이동 (경로 A)</span>
                <p className="font-bold text-xs sm:text-sm">화장실까지 스스로 이동할 수 있나요?</p>
              </div>
            </div>

            {/* BRANCH FROM Q2-A */}
            <div className="w-full flex justify-between gap-4 mt-4">
              
              {/* Q2-A -> Q3-A1 (이동 낮음) */}
              <div className="flex flex-col items-center w-40">
                <div className={`w-full flex flex-col items-center ${getOpacityClass('q3_a1')}`}>
                  <div className={getLineClass(isNodeActive('q3_a1'), 'q3_a1')} />
                  <div className={getBranchLabelClass(isNodeActive('q3_a1'))}>이동 양호 (0~1점)</div>
                  <div className="h-4 w-0.5 bg-slate-200" style={{ backgroundColor: isNodeActive('q3_a1') ? '#0E4A84' : '' }} />

                  <div className={getNodeClass('q3_a1')}>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">청결 마무리 (A1)</span>
                    <p className="font-bold text-[11px] sm:text-xs">스스로 뒤처리를 할 수 있나요?</p>
                  </div>
                </div>

                <div className="w-full flex justify-between gap-1 mt-4">
                  <div className={`flex flex-col items-center w-18 ${getOpacityClass('B-A')}`}>
                    <div className={getLineClass(activePath.includes('B-A'), 'B-A')} />
                    <div className={getBranchLabelClass(activePath.includes('B-A'))}>양호</div>
                    <div className="h-2 w-0.5 bg-slate-200" style={{ backgroundColor: activePath.includes('B-A') ? '#0E4A84' : '' }} />
                    <div className={getNodeClass('B-A', true)}>도움 불필요</div>
                  </div>
                  <div className={`flex flex-col items-center w-18 ${getOpacityClass('B-B')}`}>
                    <div className={getLineClass(activePath.includes('B-B'), 'B-B')} />
                    <div className={getBranchLabelClass(activePath.includes('B-B'))}>장해</div>
                    <div className="h-2 w-0.5 bg-slate-200" style={{ backgroundColor: activePath.includes('B-B') ? '#0E4A84' : '' }} />
                    <div className={getNodeClass('B-B', true)}>비데 고려</div>
                  </div>
                </div>
              </div>

              {/* Q2-A -> Q3-A2 (이동 높음) */}
              <div className="flex flex-col items-center w-40">
                <div className={`w-full flex flex-col items-center ${getOpacityClass('q3_a2')}`}>
                  <div className={getLineClass(isNodeActive('q3_a2'), 'q3_a2')} />
                  <div className={getBranchLabelClass(isNodeActive('q3_a2'))}>이동 장해 (2~4점)</div>
                  <div className="h-4 w-0.5 bg-slate-200" style={{ backgroundColor: isNodeActive('q3_a2') ? '#0E4A84' : '' }} />

                  <div className={getNodeClass('q3_a2')}>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">청결 마무리 (A2)</span>
                    <p className="font-bold text-[11px] sm:text-xs">스스로 뒤처리를 할 수 있나요?</p>
                  </div>
                </div>

                <div className="w-full flex justify-between gap-1 mt-4">
                  <div className={`flex flex-col items-center w-18 ${getOpacityClass('B-C')}`}>
                    <div className={getLineClass(activePath.includes('B-C'), 'B-C')} />
                    <div className={getBranchLabelClass(activePath.includes('B-C'))}>양호</div>
                    <div className="h-2 w-0.5 bg-slate-200" style={{ backgroundColor: activePath.includes('B-C') ? '#0E4A84' : '' }} />
                    <div className={getNodeClass('B-C', true)}>이동보조/변기리프트</div>
                  </div>
                  <div className={`flex flex-col items-center w-18 ${getOpacityClass('B-D')}`}>
                    <div className={getLineClass(activePath.includes('B-D'), 'B-D')} />
                    <div className={getBranchLabelClass(activePath.includes('B-D'))}>장해</div>
                    <div className="h-2 w-0.5 bg-slate-200" style={{ backgroundColor: activePath.includes('B-D') ? '#0E4A84' : '' }} />
                    <div className={getNodeClass('B-D', true)}>이동변기 이용</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* PATH B: 인지 높음 (2~4점) */}
          <div className="flex-1 flex flex-col items-center pl-8">
            <div className={`w-full flex flex-col items-center ${getOpacityClass('q2_b')}`}>
              <div className={getLineClass(isNodeActive('q2_b') || isNodeActive('q3_b1') || isNodeActive('q3_b2'), 'q2_b')} />
              <div className={getBranchLabelClass(isNodeActive('q2_b') || isNodeActive('q3_b1') || isNodeActive('q3_b2'))}>
                인지 장해 (2~4점)
              </div>
              <div className="h-4 w-0.5 bg-slate-200" style={{ backgroundColor: (isNodeActive('q2_b') || isNodeActive('q3_b1') || isNodeActive('q3_b2')) ? '#0E4A84' : '' }} />

              {/* Q2-B */}
              <div className={getNodeClass('q2_b')}>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">화장실 이동 (경로 B)</span>
                <p className="font-bold text-xs sm:text-sm">화장실까지 스스로 이동할 수 있나요?</p>
              </div>
            </div>

            {/* BRANCH FROM Q2-B */}
            <div className="w-full flex justify-between gap-4 mt-4">
              
              {/* Q2-B -> Q3-B1 (이동 낮음) */}
              <div className="flex flex-col items-center w-40">
                <div className={`w-full flex flex-col items-center ${getOpacityClass('q3_b1')}`}>
                  <div className={getLineClass(isNodeActive('q3_b1'), 'q3_b1')} />
                  <div className={getBranchLabelClass(isNodeActive('q3_b1'))}>이동 양호 (0~1점)</div>
                  <div className="h-4 w-0.5 bg-slate-200" style={{ backgroundColor: isNodeActive('q3_b1') ? '#0E4A84' : '' }} />

                  <div className={getNodeClass('q3_b1')}>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">청결 마무리 (B1)</span>
                    <p className="font-bold text-[11px] sm:text-xs">스스로 뒤처리를 할 수 있나요?</p>
                  </div>
                </div>

                <div className="w-full flex justify-between gap-1 mt-4">
                  <div className={`flex flex-col items-center w-18 ${getOpacityClass('B-E')}`}>
                    <div className={getLineClass(activePath.includes('B-E'), 'B-E')} />
                    <div className={getBranchLabelClass(activePath.includes('B-E'))}>양호</div>
                    <div className="h-2 w-0.5 bg-slate-200" style={{ backgroundColor: activePath.includes('B-E') ? '#0E4A84' : '' }} />
                    <div className={getNodeClass('B-E', true)}>시간맞춤 배설예측</div>
                  </div>
                  <div className={`flex flex-col items-center w-18 ${getOpacityClass('B-F')}`}>
                    <div className={getLineClass(activePath.includes('B-F'), 'B-F')} />
                    <div className={getBranchLabelClass(activePath.includes('B-F'))}>장해</div>
                    <div className="h-2 w-0.5 bg-slate-200" style={{ backgroundColor: activePath.includes('B-F') ? '#0E4A84' : '' }} />
                    <div className={getNodeClass('B-F', true)}>배설프로그램+비데</div>
                  </div>
                </div>
              </div>

              {/* Q2-B -> Q3-B2 (이동 높음) */}
              <div className="flex flex-col items-center w-40">
                <div className={`w-full flex flex-col items-center ${getOpacityClass('q3_b2')}`}>
                  <div className={getLineClass(isNodeActive('q3_b2'), 'q3_b2')} />
                  <div className={getBranchLabelClass(isNodeActive('q3_b2'))}>이동 장해 (2~4점)</div>
                  <div className="h-4 w-0.5 bg-slate-200" style={{ backgroundColor: isNodeActive('q3_b2') ? '#0E4A84' : '' }} />

                  <div className={getNodeClass('q3_b2')}>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">청결 마무리 (B2)</span>
                    <p className="font-bold text-[11px] sm:text-xs">스스로 뒤처리를 할 수 있나요?</p>
                  </div>
                </div>

                <div className="w-full flex justify-between gap-1 mt-4">
                  <div className={`flex flex-col items-center w-18 ${getOpacityClass('B-G')}`}>
                    <div className={getLineClass(activePath.includes('B-G'), 'B-G')} />
                    <div className={getBranchLabelClass(activePath.includes('B-G'))}>양호</div>
                    <div className="h-2 w-0.5 bg-slate-200" style={{ backgroundColor: activePath.includes('B-G') ? '#0E4A84' : '' }} />
                    <div className={getNodeClass('B-G', true)}>자동배설로봇(간헐)</div>
                  </div>
                  <div className={`flex flex-col items-center w-18 ${getOpacityClass('B-H')}`}>
                    <div className={getLineClass(activePath.includes('B-H'), 'B-H')} />
                    <div className={getBranchLabelClass(activePath.includes('B-H'))}>장해</div>
                    <div className="h-2 w-0.5 bg-slate-200" style={{ backgroundColor: activePath.includes('B-H') ? '#0E4A84' : '' }} />
                    <div className={getNodeClass('B-H', true)}>스마트기저귀(지속)</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
