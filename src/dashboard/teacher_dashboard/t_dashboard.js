
import React, { Component } from 'react';
import T_top_menu from "./t_top_menu";
import UserPersonal from "./t_UserPersonal";
import T_main from './t_main';
import T_calendar from './t_calendar';

class T_Dashboard extends Component {
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
                    <T_top_menu
                        setclicked={this.setclicked}
                    />
                    {clicked == 1 &&
                        <T_main />
                    }
                    {clicked == 2 &&
                        <T_calendar />
                    }
                    {clicked == 3 &&
                        <UserPersonal />
                    }
                </div>
            </>
        );
    }
}

export default T_Dashboard;
