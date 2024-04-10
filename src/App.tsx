import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import useAuthCheck from './hooks/useAuthCheck';

const { Header, Content, Sider } = Layout;

function App(): JSX.Element {

  console.log("rendered");
  useAuthCheck();

  return (
    <>
      <Layout style={{ height: "100%", background: "#ffffff" }}>
        <Header style={{ height: "8%", background: "#ffffff" }}></Header>
        <Layout>
          <Sider width="15%" style={{ background: "#ffffff" }}>
            <Sidebar />
          </Sider>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default App;
