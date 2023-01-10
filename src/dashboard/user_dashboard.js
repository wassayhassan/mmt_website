
import React, { Component } from 'react';
import DashboardMainTop from "./main_top_menu";
import UserPersonal from "./UserPersonal";
import StudyLogs from "./Attandence";

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: 1
        };
        this.setclicked = this.setclicked.bind(this);
    }

    setclicked(num) {
        this.setState({ clicked: num });
    }

    render() {
        let { clicked } = this.state;
        return (
            <>
                <div className="max-ml-[110px] ml-[2%] max-mr-[97px] mr-[2%] mb-[97px] bg-white">
                    <DashboardMainTop
                        setclicked={this.setclicked}
                    />
                    {clicked == 1 &&
                        <UserPersonal />
                    }
                    {clicked == 2 &&
                        <StudyLogs />
                    }
                </div>
            </>
        );
    }
}

export default UserDashboard;
