import { useState, useEffect } from 'react';
import axios from 'axios';

const useSkillsLoader = ({ exhibit, location }) => {
    const [skills, setSkills] = useState([]);
    console.log("under")
    console.log(location)
    useEffect(() => {
        if (exhibit === "add") {
            return; // Early return if exhibit is "add"
        }

        let dest;
        switch (location) {
            case "Playstyles":
                dest = "playstyles";
                break;
            case "Exhibits":
                dest = "playplaces";
                break;
            default:
                console.error('Invalid location:', location);
                return;
        }

        axios.get(`http://localhost:8082/${dest}/${exhibit._id}`)
            .then((res) => {
                const { dropdown } = res.data;
                setSkills(dropdown);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }, [exhibit, location]);

    return skills;
};

export default useSkillsLoader; // Export useSkillsLoader as default
