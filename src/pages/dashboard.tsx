import Navbar from "../components/Navbar/Navbar";
interface Dashboard_props {
  name: string;
}

const Dashboard = ({ name }: Dashboard_props) => {
  console.log(`Welcome ${name}`);
  return (
    <main className="w-full min-h-screen bg-surface-50">
      <Navbar />
    </main>
  );
};

export default Dashboard;
