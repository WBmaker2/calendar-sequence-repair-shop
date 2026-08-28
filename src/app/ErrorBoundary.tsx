import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import ActionButton from "../components/ActionButton";

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly onRestart: () => void;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
}

/**
 * 학생에게는 기술 정보 없이 어린이용 안내만 보여 준다.
 * 오류 기록은 콘솔 외 어디에도 저장·전송하지 않는다.
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: unknown, _info: ErrorInfo): void {
    // 화면·저장소·네트워크로 오류 세부 정보를 노출하지 않는다.
  }

  private handleRestart = () => {
    this.setState({ hasError: false });
    this.props.onRestart();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <section className="error-fallback" role="alert">
          <h2>활동을 다시 불러오지 못했어요.</h2>
          <p>달력 복원 활동을 처음부터 다시 시작할 수 있어요.</p>
          <ActionButton variant="primary" onClick={this.handleRestart}>
            처음부터 다시 하기
          </ActionButton>
        </section>
      );
    }
    return this.props.children;
  }
}
