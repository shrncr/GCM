import { useState, useEffect } from 'react';
import axios from 'axios';

const useSkillsLoader = ({ exhibit, location }) => {
    const [skills, setSkills] = useState([]);
    const apiUrl = process.env.VERCEL_URL;
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
                dest = "playPlaces";
                break;
            default:
                console.error('Invalid location:', location)
                return;
        }
        console.log("hruosgno")
        axios.get(`${apiUrl}/${dest}/${exhibit._id}`)
            .then((res) => {
                console.log(res)
                const { dropdown } = res.data;
                console.log(dropdown)
                setSkills(dropdown);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }, [exhibit, location]);

    return skills;
};

export default useSkillsLoader; // Export useSkillsLoader as default
