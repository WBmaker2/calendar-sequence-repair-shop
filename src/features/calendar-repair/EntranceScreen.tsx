import ActionButton from "../../components/ActionButton";
import paperCalendar from "../../assets/generated/friendly-paper-calendar.svg";

interface EntranceScreenProps {
  readonly onStart: () => void;
}

export default function EntranceScreen({ onStart }: EntranceScreenProps) {
  return (
    <section className="entrance" aria-labelledby="entrance-heading">
      <div className="entrance-hero">
        <img
          src={paperCalendar}
          alt=""
          aria-hidden="true"
          className="entrance-illustration"
          width="320"
          height="200"
        />
        <div className="entrance-hero-copy">
          <p className="entrance-kicker">오늘의 탐구 미션</p>
          <h2 id="entrance-heading">빠진 날짜를 찾아 달력을 복원해요!</h2>
          <p className="entrance-goal">
            2026년 9월 연습 달력에서 빠진 날짜와 요일을 찾고, 어제·오늘·내일과 일주일 뒤,
            달이 바뀌는 날까지 이어서 복원해요.
          </p>
          <p className="entrance-time">
            예상 시간: <strong>10~15분</strong>
          </p>
          <ActionButton variant="primary" onClick={onStart}>
            달력 복원 시작하기
          </ActionButton>
          <p className="entrance-note">새로고침하면 지금까지의 응답이 사라져요.</p>
        </div>
      </div>

      <div className="entrance-details">
        <div className="entrance-detail-block">
          <h3 id="mission-heading">오늘의 미션 6개</h3>
          <ol className="mission-list" aria-labelledby="mission-heading">
            <li>빠진 날짜와 요일 찾기 (9월 1일~5일)</li>
            <li>같은 월요일 찾기 (9월 7일과 14일)</li>
            <li>어제·오늘·내일 연결 (9월 14일 월요일)</li>
            <li>일주일 뒤 찾기 (9월 8일 화요일)</li>
            <li>행사 날짜 순서 배열 (도서관·화단·체육)</li>
            <li>다음 달로 이어 주기 (9월 30일 다음)</li>
          </ol>
        </div>

        <div className="entrance-detail-block">
          <h3 id="safety-heading">안전하게 즐기는 방법</h3>
          <ul className="safety-list" aria-labelledby="safety-heading">
            <li>이름이나 개인 정보를 묻지 않아요.</li>
            <li>응답은 이 화면 안에만 있고 저장하거나 보내지 않아요.</li>
            <li>2026년 9월 실제 달력의 날짜와 요일을 사용해요.</li>
            <li>점수나 순위 대신 근거와 수정 결과를 보여 줘요.</li>
          </ul>
        </div>

        <p className="entrance-history-tip">
          화면 위쪽의 <strong>업데이트 내역</strong> 버튼에서 앱의 바뀐 점을 볼 수 있어요.
        </p>
      </div>
    </section>
  );
}
