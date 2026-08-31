# 달력 순서 복원소 학습자 언어 감사

- 감사일: 2026-08-31 (KST)
- 대상 학년: 초등 1–2학년 주 대상, 초3–4 가드레일
- 감사 경로: 입구 → 요일 띠 → 미션 1 오답/재시도/정답 → 미션 2
- 후보 수집: `work/elementary-webapp-ux-language-inventory.md` (`664`개 후보, triage only)
- 기준: `child-language-rubric.md`, `learner-text-audit-workflow.md`
- 주의: 정적 후보에는 테스트·코드 문자열이 섞이므로 아래 장부는 실제 학습자 화면에 렌더링된 문구만 판정 대상으로 삼았다.

## 상태별 실제 문구 수집

| 상태 | 제목 | 지시문·선택 | 회복·결과 | 검증 상태 |
|---|---|---|---|---|
| entry | 빠진 날짜를 찾아 달력을 복원해요! | 달력 복원 시작하기 | 새로고침 안내, 6개 미션 안내 | confirmed: In-app Browser |
| weekday | 요일 띠 확인 | 일요일부터 토요일까지 차례대로 눌러 확인해요 | 일요일부터 차례대로 눌러 주세요. / 요일 띠 확인했어요 | confirmed: In-app Browser |
| predict | 빈 칸 예측하기 | 빈 칸의 날짜·요일을 고르기 | 예상 완료하기 | confirmed: In-app Browser |
| incorrect | 근거를 다시 확인해 볼까요? | 2026년 9월 1일 화요일의 다음 날을 다시 세어 보세요. | 다시 고치기 | confirmed: In-app Browser |
| retry-input | 빈 칸 예측하기 | 1일–5일, 수요일–금요일 | 예상 완료하기 | confirmed: source + browser state |
| correct | 좋아요! 달력 근거를 찾았어요. | 날짜가 하루에 하나씩 커지는 규칙 | 다음으로 | confirmed: In-app Browser |
| completion | 오늘 복원한 달력 기록 | 최초 판단·사용한 근거·수정 결과 | 결과 인쇄 / 처음부터 다시 하기 / 다른 달력은 직접 확인 | confirmed: In-app Browser final path |

## 감사 장부

| issue-id | screen/state | surface | source/evidence | target grade | before | difficulty signals | after | intent/facts | comprehension probe | verification | status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| EDU-LANG-001 | `/report` completion | completion / limit | `LearningReport.tsx:103-104`, 결과 화면 | 1–2 | 이 앱은 2026년 9월 연습 달력을 다루는 교육 모형이며 실제 세계 전체를 보장하지 않아요. | abstract-or-formal, missing-recovery | 이 기록은 2026년 9월 연습 달력으로 만든 교육 모형이에요. 다른 달력의 날짜는 직접 확인해 보세요. | yes; 교육 모형·고정 범위·확인 행동 보존 | 용어 설명·전이 행동: 연습용 기록임과 다른 달력을 직접 확인할 일을 말하고 실행 | confirmed: final completion path shows the sentence | fixed |
| EDU-LANG-002 | `/lesson/select` unanswered | instruction | `SelectStage.tsx:54`, 미션 2 화면 | 1–2 | 보이는 칸 중에서 월요일 두 개를 찾아 눌러요. 2개 중 0개를 골랐어요. | multiple-actions, long-or-dense | 이번 회차에서는 행동이 가능하고 의미가 왜곡되지 않아 보류한다. 후속 개선 후보로 남긴다. | yes | 지시 재진술: 월요일 두 칸을 고르고 선택 수를 확인하는지 관찰 | confirmed: source + browser snapshot; no code change | open / follow-up |
| EDU-LANG-003 | `/lesson/after-seven` | instruction | `WeekStage.tsx:59` | 1–2 | 기준 칸(9월 8일 화요일)보다 일주일 뒤인 칸을 찾아 눌러요. | multiple-actions | 동일 문구 유지; 기준 날짜와 7일 뒤라는 핵심 조건이 명확해 현재 변환하지 않는다. | yes | 지시 재진술·결과 예측: 9월 15일 화요일을 찾는지 확인 | not run in baseline route | open / follow-up |
| EDU-LANG-004 | `/lesson/feedback/incorrect` | feedback / recovery | `FeedbackPanel.tsx:54-62`, 오답 화면 | 1–2 | 근거를 다시 확인해 볼까요? / 다시 고치기 | abstract-or-formal 후보이나 뒤의 날짜 예시가 풀어 줌 | 현재 유지; “달력에서 다시 세어 보세요”와 재시도 버튼이 함께 있어 회복 행동이 구체적이다. | yes | 회복 행동: 근거를 다시 보고 다시 고치기를 실행하는지 확인 | confirmed: In-app Browser | fixed-by-existing-design |

## 적용 원칙

- `근거`는 학습 목표에 필요한 교과 개념이므로 삭제하지 않고, 실제 날짜 예시와 함께 사용한다.
- 버튼은 결과가 아니라 학생 행동을 가리킨다. `예상 완료하기`, `다시 고치기`, `다음으로`는 현재 상태와 일치한다.
- `최초 판단`, `사용한 근거`, `수정 결과`는 결과 기록 계약이므로 교사와 학습자가 함께 읽는 기록 라벨로 유지한다.
- 한 후보의 긴 문구만으로 학년 적합성을 인증하지 않고, 실제 상태의 재진술·결과 예측·회복 행동으로 다시 확인한다.
- VoiceOver·음성 안내는 이 감사 범위에 포함하지 않는다.
