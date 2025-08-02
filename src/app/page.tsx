import Wrapper from "./components/common/Wrapper";
import AuthGuard from "./components/layouts/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <Wrapper>
        <div className="">
          Hello World!
        </div>
      </Wrapper>
    </AuthGuard>
  );
}
