import Nav from "../../components/nav/Nav";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../components/ui/icon/Icon";

function Home() {
  const navigate = useNavigate();

  const handleCreateNewMeeting = () => {
    navigate("/lobby");
  };
  return (
    <div className="h-screen w-full overflow-hidden">
      <Nav />
      <div className="flex-1 h-full">
        <div className="relative h-full grid grid-cols-2">
          <section className="border-2 h-full flex items-center justify-center">
            <div>
              <div>
                <h1>
                  Premium video meetings.
                  <br />
                  Now free for everyone.
                </h1>
                <p>
                  We re-engineered the service we built for secure businesses
                  <br />
                  meetings, Google meet, to make it free and available for all.
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handleCreateNewMeeting}
                  variant="outline"
                  className="w-fit px-2"
                >
                  <Icons.Video /> new meeting
                </Button>
                <input
                  type="text"
                  maxLength={20}
                  placeholder={"Enter meeting code"}
                />
              </div>
              <div>
                <h1>
                  <span>Learn more</span> about Google Meet
                </h1>
              </div>
            </div>
          </section>
          <section>hello</section>
        </div>
      </div>
    </div>
  );
}

export default Home;
