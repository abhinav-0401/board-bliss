import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from './hooks/TypedStore';
import { User } from './store/UserSlice';
import { useEffect } from 'react';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';

const { Header, Content, Sider } = Layout;

function App(): JSX.Element {

  const navigate = useNavigate();
  const user: User = useAppSelector(state => state.user);

  console.log("rendered");

  useEffect(() => {
    if (!user.username || !user.password) {
      navigate("/signup");
    } else {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Layout style={{ height: "100vh", background: "#ffffff" }}>
        <Header style={{ height: "8vh", background: "#ffffff" }}></Header>
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
