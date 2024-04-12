import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import useAuthCheck from './hooks/useAuthCheck';
import KanbanHeader from './components/KanbanHeader';
import "./App.css";

const { Header, Content } = Layout;

function App(): JSX.Element {
  useAuthCheck();

  return (
    <>
      <Layout style={{ height: "100vh", background: "#ffffff" }}>
        <Header style={{ height: "8vh", background: "#ffffff", padding: 0 }}>
          <KanbanHeader />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </>
  )
}

export default App;
